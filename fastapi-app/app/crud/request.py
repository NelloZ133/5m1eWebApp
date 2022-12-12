from sqlalchemy.ext.asyncio import AsyncSession
import uuid
import json
from uuid import UUID
from app.schemas.request import RequestCreateSubmit
from app.functions import toArrayWithKey
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

    async def get_searched_parts(
        self, part_no: str, p_upper: str, p_lower: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT part_no FROM parts 
            WHERE (part_no LIKE '%{part_no}%') 
            OR (part_no LIKE '%{p_upper}%') 
            OR (part_no LIKE '%{p_lower}%') 
            LIMIT 20"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_machines(
        self, machine_no: str, m_upper: str, m_lower: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT machine_no FROM machines 
            WHERE (machine_no LIKE '%{machine_no}%') 
            OR (machine_no LIKE '%{m_upper}%') 
            OR (machine_no LIKE '%{m_lower}%') 
            LIMIT 20"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_products(
        self, product_name: str, p_upper: str, p_lower: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT full_name FROM products 
            WHERE (full_name LIKE '%{product_name}%') 
            OR (full_name LIKE '%{p_upper}%') 
            OR (full_name LIKE '%{p_lower}%') 
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs

    async def get_searched_user(
        self, name: str, n_upper: str, n_lower: str, db: AsyncSession
    ):
        stmt = f"""SELECT DISTINCT CONCAT(firstname, ' ', lastname) as full_name FROM users
            WHERE (firstname LIKE '%{name}%') 
            OR (firstname LIKE '%{n_upper}%') 
            OR (firstname LIKE '%{n_lower}%') 
            OR (lastname LIKE '%{name}%')
            OR (lastname LIKE '%{n_upper}%')
            OR (lastname LIKE '%{n_lower}%')
            LIMIT 10"""
        rs = toArrayWithKey(await db.execute(stmt))
        return rs
