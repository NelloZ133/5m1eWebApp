from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator, List
import threading
import json
import os
import string
import random
from uuid import UUID
from app.schemas.request import RequestCreateSubmit, RequestCreateSubmitWithId
from app.crud.request import RequestCRUD
from app.manager.users import UserManager
from app.email import send_mail
from app.crud import static, request
from app.functions import api_key_auth
from dotenv import dotenv_values

# from concurrent.futures.processes import ProcessPoolExecutor

config = dotenv_values(".env")
FRONTEND_BASE_URL = config["FRONTEND_BASE_URL"]

staticCRUD = static.staticdataCRUD()
user_manager = UserManager()
with open("config_problem.json") as f:
    config_problem = json.load(f)
with open("config_change.json") as f:
    config_change = json.load(f)


def _get_config(report_type: str) -> dict:
    if report_type == "5M1E_problem":
        return config_problem
    elif report_type == "5M1E_change":
        return config_change
    else:
        return None


def _i_am_higher(pos1: str, pos2: str) -> bool:
    rank_map = {"OP": 1, "LL": 2, "TL": 3, "MGR": 4, "FM": 5, "FD": 6}
    rank1 = rank_map.get(pos1, None)
    rank2 = rank_map.get(pos2, None)

    if rank1 is None or rank2 is None:
        return False
    else:
        return rank1 >= rank2


def _can_i_select_supporter(pos: str) -> bool:
    if pos == "MGR" or pos == "FM" or pos == "FD":
        return True
    else:
        return False


async def _check_flow(
    crud, config: dict, request_data: RequestCreateSubmitWithId, db: AsyncSession
) -> None:
    request_id = request_data.request_id
    request = await crud.get_request(id=request_id, db=db)
    print(f"Check flow: {request}")
    current_state_id = request[request_data.request_id]["current_state_id"]
    next_state_id = request_data.current_state_id
    transition = config["transition"]
    print(transition)
    ok = False
    for t in transition.values():
        if t["current_state_id"] == str(current_state_id) and t["next_state_id"] == str(
            next_state_id
        ):
            ok = True
    if not ok:
        raise HTTPException(
            status_code=406,
            detail="This action is not allow. Please try to refresh to get latest data.",
        )


async def _check_right(request_data: RequestCreateSubmit, db: AsyncSession) -> None:
    action_user_uuid = request_data.action_user_uuid
    user_uuid = request_data.user_uuid
    action_id = request_data.action_id
    data_value = request_data.data_value
    if (
        user_uuid is None
        or action_id is None
        or action_user_uuid is None
        or data_value is None
    ):
        raise HTTPException(status_code=422, detail="Request data is not completed")
    action_user = await user_manager.get_by_user_uuid(action_user_uuid, db=db)
    requester = await user_manager.get_by_user_uuid(user_uuid, db=db)
    print(
        f"CHECK Right: action_id = {action_id}, action_user = {action_user}, requester = {requester}"
    )
    # submit, anyone can whose in position group direct
    if (action_id == 1 or action_id == 11) and action_user[
        "position_group"
    ] != "Direct":
        raise HTTPException(status_code=403, detail="Submit action is forbidden")
    elif (action_id == 2 or action_id == 12) and not (
        (user_uuid == action_user_uuid)
        or (_i_am_higher(action_user["position_name"], requester["position_name"]))
    ):
        raise HTTPException(status_code=403, detail="Cancel action is forbidden")
    elif (action_id == 3 or action_id == 13) and (
        (user_uuid == action_user_uuid)
        or not (_i_am_higher(action_user["position_name"], requester["position_name"]))
    ):
        raise HTTPException(status_code=403, detail="Approve action is forbidden")
    elif (action_id == 4 or action_id == 14) and (
        (user_uuid == action_user_uuid)
        or not (_i_am_higher(action_user["position_name"], requester["position_name"]))
    ):
        raise HTTPException(status_code=403, detail="Reject action is forbidden")
    elif (action_id == 6 or action_id == 16) and (
        (user_uuid == action_user_uuid)
        or not _can_i_select_supporter(action_user["position_name"])
    ):
        raise HTTPException(status_code=403, detail="Supporter selection is forbidden")
    elif (action_id == 7 or action_id == 17) and (
        (user_uuid == action_user_uuid)
        or not _can_i_select_supporter(action_user["position_name"])
    ):
        raise HTTPException(status_code=403, detail="Supporter selection is forbidden")


async def _send_mail(
    crud, request_data: RequestCreateSubmit, request_id, db: AsyncSession
) -> None:
    all_requests = await crud.get_all_requests(db=db)
    request_response = []
    for req in all_requests:
        if req["request_id"] == request_id:
            request_response.append(req)
    action_id = request_data.action_id
    action_user_uuid = request_data.action_user_uuid
    user_uuid = request_data.user_uuid
    email_list_data = request_data.email_list
    if (
        user_uuid is None
        or action_id is None
        or email_list_data is None
        or action_user_uuid is None
    ):
        raise HTTPException(status_code=422, detail="Request data is not completed")
    requester = await user_manager.get_by_user_uuid(user_uuid, db=db)

    request_no = (
        request_response[-1]["request_problem_no"]
        if request_response[-1]["request_problem_no"] is not None
        else request_response[-1]["request_change_no"]
    )
    requester_name = requester["firstname"] + " " + requester["lastname"]
    created_at = request_response[-1]["req_created_at"]
    request_data_value = request_response[-1]["request_data_value"]
    category = request_data_value["category"]
    attachments = request_data_value["attachmentList"]

    if action_id == 1 or action_id == 11:
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        if action_id == 1:
            subject = "You got a request to confirm about 5M1E problem"
            with open(
                "email_templates/email_template_request_to_check.txt", encoding="utf-8"
            ) as f:
                for line in f:
                    html += line.strip()
        else:
            subject = "You got a request to confirm about 5M1E change"
            with open(
                "email_templates/email_template_request_to_check_change.txt",
                encoding="utf-8",
            ) as f:
                for line in f:
                    html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        overview_url = f"{FRONTEND_BASE_URL}/5m1e/report"
        html = html.replace("https://www.google.com", overview_url)
        email_list = email_list_data
        for email in email_list:
            recv = await user_manager.get_by_email(email, db=db)
            checker_name = recv["firstname"] + " " + recv["lastname"]
            send_html = html.replace("{checker_name}", checker_name)
            try:
                t = threading.Thread(
                    target=send_mail, args=(email, subject, send_html, attachments)
                )
                t.start()
                # send_mail(email, "You got a request to confirm about 5M1E problem", send_html, attachments)
            except Exception as e:
                print(f"Error when sending email: {e}")
    elif (action_id == 2 or action_id == 12) and (user_uuid == action_user_uuid):
        print(f"Request response: {request_response}")
        action_created_at = request_response[-1]["action_created_at"]
        reason = "-"
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        with open(
            "email_templates/email_template_self_cancel.txt", encoding="utf-8"
        ) as f:
            for line in f:
                html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{action_created_at}", action_created_at)
        html = html.replace("{reason}", reason)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        email_list_str = request_response[-2].get("email_list", "[]")
        email_list = json.loads(email_list_str)
        for email in email_list:
            recv = await user_manager.get_by_email(email, db=db)
            checker_name = recv["firstname"] + " " + recv["lastname"]
            send_html = html.replace("{checker_name}", checker_name)
            try:
                t = threading.Thread(
                    target=send_mail,
                    args=(
                        email,
                        "The 5M1E confirmation request has been cancelled",
                        send_html,
                        attachments,
                    ),
                )
                t.start()
                # send_mail(email, "You got a request to confirm about 5M1E problem", send_html, attachments)
            except Exception as e:
                print(f"Error when sending email: {e}")
    elif (action_id == 2 or action_id == 12) and (user_uuid != action_user_uuid):
        action_created_at = request_response[-1]["action_created_at"]
        reason = request_response[-1]["note"]
        action_user_uuid = request_response[-1]["action_user_uuid"]
        action_user = await user_manager.get_by_user_uuid(action_user_uuid, db=db)
        checker_name = action_user["firstname"] + " " + action_user["lastname"]
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        with open(
            "email_templates/email_template_cancel_request.txt", encoding="utf-8"
        ) as f:
            for line in f:
                html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{action_created_at}", action_created_at)
        html = html.replace("{reason}", reason)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        email_list = [requester["email"]]
        for email in email_list:
            send_html = html.replace("{checker_name}", checker_name)
            try:
                t = threading.Thread(
                    target=send_mail,
                    args=(
                        email,
                        "Your 5M1E confirmation request has been cancelled",
                        send_html,
                        attachments,
                    ),
                )
                t.start()
                # send_mail(email, "Your 5M1E confirmation request has been cancelled", send_html, attachments)
            except Exception as e:
                print(f"Error when sending email: {e}")
    elif action_id == 4 or action_id == 14:
        action_created_at = request_response[-1]["action_created_at"]
        reason = request_response[-1]["note"]
        action_user_uuid = request_response[-1]["action_user_uuid"]
        action_user = await user_manager.get_by_user_uuid(action_user_uuid, db=db)
        checker_name = action_user["firstname"] + " " + action_user["lastname"]
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        if action_id == 4:
            subject = "Your 5M1E request has been rejected"
            with open(
                "email_templates/email_template_reject_to_requester.txt",
                encoding="utf-8",
            ) as f:
                for line in f:
                    html += line.strip()
        else:
            subject = "Your 5M1E request has been rejected"
            with open(
                "email_templates/email_template_reject_change_to_requester.txt",
                encoding="utf-8",
            ) as f:
                for line in f:
                    html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{action_created_at}", action_created_at)
        html = html.replace("{reason}", reason)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        email_list = [requester["email"]]
        for email in email_list:
            send_html = html.replace("{checker_name}", checker_name)
            try:
                t = threading.Thread(
                    target=send_mail, args=(email, subject, send_html, attachments)
                )
                t.start()
                # send_mail(email, "Your 5M1E request has been rejected", send_html, attachments)
            except Exception as e:
                print(f"Error when sending email: {e}")
    elif action_id == 3 or action_id == 13:
        lineId = int(request_data_value["lineId"])
        # productId = int(request_data_value["productId"])
        processId = int(request_data_value["processId"])
        partId = request_data_value["partId"]
        req_note = request_data_value.get("note", "-")
        machine_no = request_data_value.get("machine", "-")
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        lines = await staticCRUD.get_lines(db=db)
        line = lines.get(lineId, {"data": [{"line_name": "-"}]})
        line_name = line["line_name"]
        # products = await staticCRUD.get_products(db=db)
        # product = products.get(productId, {"data": [{"full_name": "-"}]})
        product_name = request_data_value["productId"]
        processes = await staticCRUD.get_processes(db=db)
        process = processes.get(processId, {"data": [{"process_name": "-"}]})
        process_name = process["process_name"]
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        if action_id == 3:
            subject = f"There is a problem in {line_name}"
            with open(
                "email_templates/email_template_inform_problem.txt", encoding="utf-8"
            ) as f:
                for line in f:
                    html += line.strip()
        else:
            subject = f"There is a change in {line_name}"
            with open(
                "email_templates/email_template_inform_change.txt", encoding="utf-8"
            ) as f:
                for line in f:
                    html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{line_name}", line_name)
        html = html.replace("{product_name}", product_name)
        html = html.replace("{process_name}", process_name)
        html = html.replace("{part_no}", partId)
        html = html.replace("{requester_note}", req_note)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        html = html.replace("{machine_no}", machine_no)
        concern_user = await user_manager.get_by_line_id(line_id=lineId, db=db)
        email_list = [u["email"] for u in concern_user]
        try:
            send_html = html
            t = threading.Thread(
                target=send_mail, args=(email_list, subject, send_html, attachments)
            )
            t.start()
            # send_mail(email, f"There is a problem in {line_name}", send_html, attachments)
        except Exception as e:
            print(f"Error when sending email: {e}")
    elif action_id == 6 or action_id == 16:
        lineId = int(request_data_value["lineId"])
        productId = int(request_data_value["productId"])
        processId = int(request_data_value["processId"])
        partId = request_data_value["partId"]
        req_note = request_data_value.get("note", "-")
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        machine_no = request_data_value.get("machine", "-")
        lines = await staticCRUD.get_lines(db=db)
        line = lines.get(lineId, {"data": [{"line_name": "-"}]})
        line_name = line["line_name"]
        products = await staticCRUD.get_products(db=db)
        product = products.get(productId, {"data": [{"full_name": "-"}]})
        product_name = product["full_name"]
        processes = await staticCRUD.get_processes(db=db)
        process = processes.get(processId, {"data": [{"process_name": "-"}]})
        process_name = process["process_name"]
        action_created_at = request_response[-1]["action_created_at"]
        reason = request_response[-1]["note"]
        action_user_uuid = request_response[-1]["action_user_uuid"]
        action_user = await user_manager.get_by_user_uuid(action_user_uuid, db=db)
        manager_name = action_user["firstname"] + " " + action_user["lastname"]
        itemId = int(request_data_value["itemId"])
        detailId = int(request_data_value["detailId"])
        items = await staticCRUD.get_all_list_items(db=db)
        item = items.get(itemId, {"data": [{"list_item_name": "-"}]})
        topic = item["data"][0]["list_item_name"]
        if detailId > 0:
            details = await staticCRUD.get_item_details_by_id(db=db)
            detail = details.get(detailId, {"data": [{"item_detail": "-"}]})
            item_detail = detail["data"][0]["item_detail"]
        else:
            detail = request_data_value["detailOther"].strip()
            item_detail = detail or "-"
        html = ""
        if action_id == 6:
            subject = "There is a support request about 5M1E problem"
            with open(
                "email_templates/email_template_request_supporter.txt", encoding="utf-8"
            ) as f:
                for line in f:
                    html += line.strip()
        else:
            subject = "There is a confirmation request about 5M1E change"
            with open(
                "email_templates/email_template_request_confirmation.txt",
                encoding="utf-8",
            ) as f:
                for line in f:
                    html += line.strip()
        html = html.replace("{request_no}", request_no)
        html = html.replace("{requester_name}", requester_name)
        html = html.replace("{created_at}", created_at)
        html = html.replace("{5m1e_category}", category)
        html = html.replace("{line_name}", line_name)
        html = html.replace("{product_name}", product_name)
        html = html.replace("{process_name}", process_name)
        html = html.replace("{part_no}", partId)
        html = html.replace("{requester_note}", req_note)
        html = html.replace("{manager_name}", manager_name)
        html = html.replace("{action_created_at}", action_created_at)
        html = html.replace("{reason}", reason)
        html = html.replace("{topic}", topic)
        html = html.replace("{detail}", item_detail)
        html = html.replace("{machine_no}", machine_no)
        email_list = email_list_data
        for email in email_list:
            recv = await user_manager.get_by_email(email, db=db)
            supporter_name = recv["firstname"] + " " + recv["lastname"]
            send_html = html.replace("{supporter_name}", supporter_name)
            try:
                t = threading.Thread(
                    target=send_mail, args=(email, subject, send_html, attachments)
                )
                t.start()
                # send_mail(email, "There is a support request about 5M1E problem", send_html, attachments)
            except Exception as e:
                print(f"Error when sending email: {e}")


def request_routers(db: AsyncGenerator) -> APIRouter:
    router = APIRouter()
    crud = RequestCRUD()

    @router.post("/upload", dependencies=[Depends(api_key_auth)])
    def upload(files: List[UploadFile] = File(...)):
        path_map = {}
        for file in files:
            try:
                contents = file.file.read()
                rd = "".join(
                    random.SystemRandom().choice(string.ascii_uppercase + string.digits)
                    for _ in range(8)
                )
                filename = f"{rd}_{file.filename}"
                file_path = os.path.join("uploaded_files", filename)
                with open(file_path, "wb") as f:
                    f.write(contents)
            except Exception:
                return {"message": "There was an error uploading the file(s)"}
            finally:
                path_map[file.filename] = {
                    "local_path": file_path,
                    "url": f"/static/{filename}",
                }
                file.file.close()

        return {"path_map": path_map}

    @router.post("/delete_file", dependencies=[Depends(api_key_auth)])
    def download(file_path: str):
        file_path = os.path.join("uploaded_files", file_path)
        if not os.isfile(file_path):
            return Response(status_code=404)
        else:
            os.remove(file_path)
            return Response(status_code=200)

    @router.post("/submit", dependencies=[Depends(api_key_auth)])
    async def submit_request(
        request_data: RequestCreateSubmit, db: AsyncSession = Depends(db)
    ):
        config = _get_config(request_data.request_process_name)
        if config is None:
            raise HTTPException(
                status_code=422, detail="Request process name is unsupported"
            )
        await _check_right(request_data, db)
        request_response = await crud.post_submit_request(request_data, db)
        await _send_mail(
            crud, request_data, list(request_response["request"].keys())[0], db
        )
        return request_response

    @router.post("/update", dependencies=[Depends(api_key_auth)])
    async def update_request(
        request_data: RequestCreateSubmitWithId, db: AsyncSession = Depends(db)
    ):
        config = _get_config(request_data.request_process_name)
        if config is None:
            raise HTTPException(
                status_code=422, detail="Request process name is unsupported"
            )
        await _check_flow(crud, config, request_data, db)
        await _check_right(request_data, db)
        request_response = await crud.post_update_request(
            request_data.request_id, request_data, db
        )
        await _send_mail(
            crud, request_data, list(request_response["request"].keys())[0], db
        )
        return request_response

    @router.post("/save", dependencies=[Depends(api_key_auth)])
    async def save_request(
        request_data: RequestCreateSubmitWithId, db: AsyncSession = Depends(db)
    ):
        request_response = await crud.post_save_request(
            request_data.request_id, request_data, db
        )
        return request_response

    @router.get("/get/allrequests", dependencies=[Depends(api_key_auth)])
    async def get_all_requests(db: AsyncSession = Depends(db)):
        requests = await crud.get_all_requests(db)
        return requests

    @router.get("/get/countrequest", dependencies=[Depends(api_key_auth)])
    async def get_count_all_request(db: AsyncSession = Depends(db)):
        rs = await crud.get_count_all_requests(db)
        return rs[0]["c"]

    @router.get("/searchPart")
    async def get_searched_parts(part_no: str, db: AsyncSession = Depends(db)):
        p_upper = part_no.upper()
        searched_part = await crud.get_searched_parts(
            part_no=part_no, p_upper=p_upper, db=db
        )
        return searched_part

    @router.get("/searchMachine")
    async def get_searched_machines(machine_no: str, db: AsyncSession = Depends(db)):
        m_upper = machine_no.upper()
        searched_machines = await crud.get_searched_machines(
            machine_no=machine_no, m_upper=m_upper, db=db
        )
        return searched_machines

    @router.get("/searchProduct")
    async def get_searched_products(product_name: str, db: AsyncSession = Depends(db)):
        p_upper = product_name.upper()
        searched_products = await crud.get_searched_products(
            product_name=product_name, p_upper=p_upper, db=db
        )
        return searched_products

    @router.get("/searchUser")
    async def get_searched_user(name: str, db: AsyncSession = Depends(db)):
        n_upper = name.upper()
        searched_user = await crud.get_searched_user(name=name, n_upper=n_upper, db=db)
        return searched_user

    @router.get("/filterProduct")
    async def get_filtered_product(product_name: str, db: AsyncSession = Depends(db)):
        p_upper = product_name.upper()
        filtered_product = await crud.get_filtered_product(
            product_name=product_name, p_upper=p_upper, db=db
        )
        return filtered_product

    @router.get("/filterPart")
    async def get_filtered_part(part_no: str, db: AsyncSession = Depends(db)):
        p_upper = part_no.upper()
        filtered_part = await crud.get_filtered_part(
            part_no=part_no, p_upper=p_upper, db=db
        )
        return filtered_part

    @router.get("/filterLine")
    async def get_filterd_line(line_name: str, db: AsyncSession = Depends(db)):
        l_upper = line_name.upper()
        filtered_line = await crud.get_filtered_line(
            line_name=line_name, l_upper=l_upper, db=db
        )
        return filtered_line

    @router.get("/filterProcess")
    async def get_filtered_process(process_name: str, db: AsyncSession = Depends(db)):
        p_upper = process_name.upper()
        filtered_process = await crud.get_filtered_process(
            process_name=process_name, p_upper=p_upper, db=db
        )
        return filtered_process

    @router.get("/filterMachine")
    async def get_fitlered_machine(machine_no: str, db: AsyncSession = Depends(db)):
        m_upper = machine_no.upper()
        filtered_machine = await crud.get_filtered_machine(
            machine_no=machine_no, m_upper=m_upper, db=db
        )
        return filtered_machine

    return router
