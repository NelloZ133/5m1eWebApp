from sqlalchemy.ext.asyncio import AsyncSession
import uuid
import json
from uuid import UUID
from app.schemas.request import RequestCreateSubmit
from app.functions import toArrayWithKey, toDictByColumnId
from app.crud.statements import request as st


class RequestCRUD:
    def __init__(self):
        pass

    async def post_submit_request(
        self, submit_data: RequestCreateSubmit, db: AsyncSession
    ) -> dict:
        request_id = uuid.uuid4()
        stmt = st.post_submit_request_stmt(request_id, submit_data)
        rs = toArrayWithKey(await db.execute(stmt))
        await db.commit()
        request_no = rs[0]["request_no"]
        request = await self.get_request(request_id, db)
        if submit_data.request_process_name == "5M1E_change":
            stmt1 = st.create_problem_change(
                request_id, submit_data.data_value.get("problem_request_id", None)
            )
            await db.execute(stmt1)
            await db.commit()
        return {"request": request}

    async def post_update_request(
        self, request_id: UUID, submit_data: RequestCreateSubmit, db: AsyncSession
    ) -> dict:
        stmt = st.post_update_request_stmt(request_id, submit_data)
        rs = toArrayWithKey(await db.execute(stmt))
        await db.commit()
        request_no = rs[0]["request_no"]
        request = await self.get_request(request_id, db)
        if submit_data.request_process_name == "5M1E_change":
            stmt1 = st.update_problem_change(
                request_id, submit_data.data_value.get("problem_request_id", None)
            )
            await db.execute(stmt1)
            await db.commit()
        return {"request": request}

    async def post_save_request(
        self, request_id: UUID, submit_data: RequestCreateSubmit, db: AsyncSession
    ) -> dict:
        stmt = st.post_save_request_stmt(request_id, submit_data)
        rs = toArrayWithKey(await db.execute(stmt))
        await db.commit()
        request = await self.get_request(request_id, db)
        return {"request": request}

    async def get_all_requests(self, db: AsyncSession) -> dict:
        stmt = st.get_all_requests_stmt()
        rs = toArrayWithKey(await db.execute(stmt))

        return rs

    async def get_all_requests_by_type(self, db: AsyncSession) -> dict:
        stmt = st.get_all_requests_by_type_stmt()
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_request(self, id: str, db: AsyncSession) -> dict:
        stmt = st.get_request_stmt(id)
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "request_id")
        return rs

    async def get_count_all_requests(self, db: AsyncSession) -> int:
        stmt = "SELECT COUNT(*) c FROM requests"
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_summary_requests(
        self, product_id: int, start_date: str, end_date: str, db: AsyncSession
    ) -> dict:

        stmt = st.get_summary_requests_stmt(product_id, start_date, end_date)
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_change_kpi(
        self, product_id: int, start_date: str, end_date: str, db: AsyncSession
    ) -> dict:

        stmt = st.get_change_kpi_stmt(product_id, start_date, end_date)
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_change_category(
        self, product_id: int, start_date: str, end_date: str, db: AsyncSession
    ) -> dict:

        stmt = st.get_change_category_stmt(product_id, start_date, end_date)
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_change_request_by_date_product(
        self, product_id: int, start_date: str, end_date: str, db: AsyncSession
    ) -> dict:

        stmt = st.get_change_request_by_date_product_stmt(
            product_id, start_date, end_date
        )
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_parts(self, part_no: str, p_upper: str, db: AsyncSession):
        stmt = f"""SELECT DISTINCT part_no FROM parts 
            WHERE (part_no LIKE '%{part_no}%')
            OR (UPPER(part_no) LIKE '%{p_upper}%')
            LIMIT 20"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_machines(
        self, machine_no: str, m_upper: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT machine_no FROM machines 
            WHERE (machine_no LIKE '%{machine_no}%')
            OR (UPPER(machine_no) LIKE '%{m_upper}%')
            LIMIT 20"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_products(
        self, product_name: str, p_upper: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT full_name FROM products 
            WHERE (full_name LIKE '%{product_name}%')
            OR (UPPER(full_name) LIKE '%{p_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_user(self, name: str, n_upper: str, db: AsyncSession):
        stmt = f"""SELECT DISTINCT CONCAT(firstname, ' ', lastname) as full_name FROM users
            WHERE (firstname LIKE '%{name}%')
            OR (UPPER(firstname) LIKE '%{n_upper}%')
            OR (lastname LIKE '%{name}%')
            OR (UPPER(lastname) LIKE '%{n_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_filtered_product(
        self, product_name: str, p_upper: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT request_data_value ->> 'product' AS product_name
            FROM request_datas
            WHERE (request_data_value ->> 'product' LIKE '%{product_name}%')
            OR (UPPER(request_data_value ->> 'product') LIKE '%{p_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_filtered_part(self, part_no: str, p_upper: str, db: AsyncSession):
        stmt = f"""SELECT DISTINCT request_data_value ->> 'partNo' AS part_no
            FROM request_datas
            WHERE (request_data_value ->> 'partNo' LIKE '%{part_no}%')
            OR (UPPER(request_data_value ->> 'partNo') LIKE '%{p_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_filtered_line(self, line_name: str, l_upper: str, db: AsyncSession):
        stmt = f"""SELECT DISTINCT l.line_name FROM lines l
            JOIN request_datas r ON l.line_id = (r.request_data_value ->> 'lineId')::INT
            WHERE (l.line_name LIKE '%{line_name}%')
            OR (UPPER(l.line_name) LIKE '%{l_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_filtered_process(
        self, process_name: str, p_upper: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT p.process_name FROM processes p
            JOIN request_datas r ON p.process_id = (r.request_data_value ->> 'processId')::INT
            WHERE (p.process_name LIKE '%{process_name}%')
            OR (UPPER(p.process_name) LIKE '%{p_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_filtered_machine(
        self, machine_no: str, m_upper: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT request_data_value ->> 'machine' AS machine_no
            FROM request_datas
            WHERE (request_data_value ->> 'machine' LIKE '%{machine_no}%')
            OR (UPPER(request_data_value ->> 'machine') LIKE '%{m_upper}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs