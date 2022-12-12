from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, or_


from app import exceptions
from app.functions import toArray, toArrayWithKey
from app.schemas.users import UserRegister, UserCreate


class UsersCRUD:
    def __init__(self):
        pass

    async def get_all_users(self, safe: bool = True, db: AsyncSession = None):
        except_column = []
        if safe:
            except_column.append("user_pass")
        stmt = """SELECT * FROM users LEFT JOIN positions using (position_id)"""
        rs = toArrayWithKey(await db.execute(stmt), except_column)
        return rs

    async def get_user_by_user_id(
        self, user_id: str, safe: bool = True, db: AsyncSession = None
    ) -> list:
        except_column = []
        if safe:
            except_column.append("user_pass")

        stmt = f"""
        SELECT *
        FROM users
        LEFT JOIN positions using (position_id)
        WHERE users.user_id = '{user_id}'
        """
        rs = toArrayWithKey(input=await db.execute(stmt), except_column=except_column)
        if len(rs) == 0:
            raise exceptions.UserNotFound()
        elif not rs[0]["is_active"]:
            raise exceptions.UserInactive()
        return rs

    async def get_user_by_user_uuid(
        self, user_uuid: str, safe: bool = True, db: AsyncSession = None
    ) -> list:
        except_column = []
        if safe:
            except_column.append("user_pass")

        stmt = f"""
        SELECT *
        FROM users
        LEFT JOIN positions using (position_id)
        WHERE users.user_uuid = '{user_uuid}'
        """
        rs = toArrayWithKey(input=await db.execute(stmt), except_column=except_column)
        if len(rs) == 0:
            raise exceptions.UserNotFound()
        elif not rs[0]["is_active"]:
            raise exceptions.UserInactive()
        return rs

    async def get_user_by_line_id(
        self, line_id: int, safe: bool = True, db: AsyncSession = None
    ) -> list:
        except_column = []
        if safe:
            except_column.append("user_pass")

        stmt = f"""
        SELECT *
        FROM users
        LEFT JOIN positions using (position_id)
        WHERE '{line_id}' = ANY(concern_line)
        """
        rs = toArrayWithKey(input=await db.execute(stmt), except_column=except_column)
        if len(rs) == 0:
            raise exceptions.UserNotFound()
        elif not rs[0]["is_active"]:
            raise exceptions.UserInactive()
        return rs

    async def get_user_by_email(
        self, email: str, safe: bool = True, db: AsyncSession = None) -> list:
        except_column = []
        if safe:
            except_column.append("user_pass")

        stmt = f"""
            SELECT * FROM users
            LEFT JOIN positions using (position_id)
            WHERE email = '{email}'
            LIMIT 1
        """
        rs = toArrayWithKey(await db.execute(stmt), except_column)
        if len(rs) == 0:
            raise exceptions.EmailNotFound()
        return rs

    async def validate_create_user(self, user: UserCreate, db: AsyncSession) -> None:
        stmt = f"""
            SELECT user_id, email FROM users
            WHERE user_id = '{user.user_id}' OR email = '{user.email}'
        """
        rs = toArrayWithKey(await db.execute(stmt))
        for r in rs:
            if r["user_id"] == user.user_id:
                raise exceptions.UserAlreadyExists()
            if r["email"] == user.email:
                raise exceptions.EmailAlreadyUsed()
        return

    async def create_user(self, user: UserCreate, db: AsyncSession):
        stmt = f"""INSERT INTO users (user_uuid, user_id, user_pass, firstname, lastname, email, app_line_id, position_id, section_id, concern_line, created_at, is_active)
            VALUES ('{user.user_uuid}', '{user.user_id}', '{user.user_pass}', '{user.firstname}', '{user.lastname}', '{user.email}', '{user.app_line_id}', '{user.position_id}', '{user.section_id}', ARRAY {user.concern_line}, '{user.created_at}', '{user.is_active}')
        """
        await db.execute(stmt)
        await db.commit()

        return user
