from sqlalchemy.ext.asyncio import AsyncSession


from app.functions import toArrayWithKey, toDictByColumnId, toDictArrayByColumnId


class staticdataCRUD:
    def __init__(self):
        pass

    async def get_users(self, db: AsyncSession):
        stmt = "SELECT * FROM users"
        rs = toArrayWithKey(await db.execute(stmt), ["user_pass"])
        rs = toDictByColumnId(rs, "user_uuid")
        return rs

    async def get_join_users_roles_positions(self, db: AsyncSession):
        stmt = """
        SELECT * FROM users
        JOIN roles USING (user_uuid)
        JOIN positions USING (position_id)
        """
        rs = toArrayWithKey(await db.execute(stmt), ["user_pass"])
        rs = toDictByColumnId(rs, "user_uuid")
        return rs

    async def get_join_users_positions(self, db: AsyncSession):
        stmt = """
        SELECT * FROM users
        JOIN positions USING (position_id)
        """
        rs = toArrayWithKey(await db.execute(stmt), ["user_pass"])
        rs = toDictByColumnId(rs, "user_uuid")
        return rs

    async def get_positions(self, db: AsyncSession):
        stmt = "SELECT * FROM positions"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "position_id")
        return rs

    async def get_departments(self, db: AsyncSession):
        stmt = "SELECT * FROM departments"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "department_id")
        return rs

    async def get_sections(self, db: AsyncSession):
        stmt = "SELECT * FROM sections"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "section_id")
        return rs

    async def get_lines(self, db: AsyncSession):
        stmt = "SELECT * FROM lines"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "line_id")
        return rs

    # async def get_machines(self, db: AsyncSession):
    #     stmt = "SELECT * FROM machines"
    #     rs = toArrayWithKey(await db.execute(stmt))
    #     rs = toDictByColumnId(rs, "machine_no")
    #     return rs

    async def get_processes(self, db: AsyncSession):
        stmt = "SELECT * FROM processes"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "process_id")
        return rs

    async def get_process_types(self, db: AsyncSession):
        stmt = "SELECT * FROM process_types"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "process_type_id")
        return rs

    async def get_join_processes_types(self, db: AsyncSession):
        stmt = """SELECT * FROM processes
        LEFT JOIN process_types
        USING (process_type_id)
        """
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "process_id")
        return rs

    async def get_processes_symbols(self, db: AsyncSession):
        stmt = "SELECT * FROM processes_symbols"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "process_id")
        return rs

    async def get_sc_symbols(self, db: AsyncSession):
        stmt = "SELECT * FROM sc_symbols"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "sc_symbol_id")
        return rs

    async def get_customers(self, db: AsyncSession):
        stmt = "SELECT * FROM customers"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "customer_id")
        return rs

    async def get_customer_plants(self, db: AsyncSession):
        stmt = "SELECT * FROM customer_plants"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "customer_id")
        return rs

    async def get_join_customers_plants(self, db: AsyncSession):
        stmt = """SELECT * FROM customers
        LEFT JOIN customer_plants
        USING (customer_id)
        """
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(
            rs, "customer_id", ["customer_name", "customer_short_name"]
        )
        return rs

    async def get_products(self, db: AsyncSession):
        stmt = "SELECT * FROM products"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "product_id")
        return rs

    async def get_models(self, db: AsyncSession):
        stmt = "SELECT * FROM models"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "model_id")
        return rs

    async def get_models_customers(self, db: AsyncSession):
        stmt = "SELECT * FROM models_customers"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "model_id")
        return rs

    async def get_parts(self, db: AsyncSession):
        stmt = """SELECT DISTINCT ON (part_no) * 
        FROM parts
        ORDER BY  part_no
        """
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "part_no")
        # print(rs)
        return rs

    async def get_join_parts_products(self, db: AsyncSession):
        stmt = """SELECT * FROM parts
        LEFT JOIN products
        USING (product_id)
        """
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "part_no")
        return rs

    async def get_request_processes(self, db: AsyncSession):
        stmt = "SELECT * FROM request_processes"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "request_process_id")
        return rs

    # async def get_states(self, process_id: list[int], db: AsyncSession):
    #     list = ",".join([str(i) for i in process_id])
    #     stmt = f"SELECT * FROM states WHERE request_process_id IN ({list})"
    #     rs = toArrayWithKey(await db.execute(stmt))
    #     rs = toDictByColumnId(rs, "state_id")
    #     return rs

    async def get_list_items(self, request_process_id: list[int], db: AsyncSession):
        list = ",".join([str(i) for i in request_process_id])
        stmt = f"SELECT * FROM list_items WHERE request_process_id IN ({list})"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "category")
        return rs

    async def get_all_list_items(self, db: AsyncSession):
        stmt = f"SELECT * FROM list_items"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "list_item_id")
        return rs

    async def get_item_details(self, db: AsyncSession):
        stmt = "SELECT * FROM item_details"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "list_item_id")
        return rs

    async def get_item_details_by_id(self, db: AsyncSession):
        stmt = "SELECT * FROM item_details"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictArrayByColumnId(rs, "item_detail_id")
        return rs

    async def get_processes_machines(self, db: AsyncSession):
        stmt = "SELECT * FROM processes_machines"
        rs = toArrayWithKey(await db.execute(stmt))
        rs = toDictByColumnId(rs, "id")
        return rs
