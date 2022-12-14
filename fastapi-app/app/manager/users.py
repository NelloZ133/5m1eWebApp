import uuid
from typing import Optional, Generic
from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from passlib import pwd
from passlib.context import CryptContext
from datetime import datetime

from app import exceptions
from app.crud import UsersCRUD
from app.errors import ErrorCode
from app.schemas.users import UserLogin, UserDetail, UserRegister, UserCreate
from app.types import DependencyCallable


class UserManager:
    def __init__(self) -> None:
        self.password_manager = PasswordManager()
        self.crud = UsersCRUD()
        # set_db(get_pg_async_db)
        # reset password
        # forget password
        # update detail

    async def get_all_users(self, safe: bool = True, db: AsyncSession = None):
        return await self.crud.get_all_users(safe=safe, db=db)

    async def get_by_user_id(
        self, user_id: str, safe: bool = True, db: AsyncSession = None
    ):
        try:
            user_data = await self.crud.get_user_by_user_id(
                user_id=user_id, safe=safe, db=db
            )
        except exceptions.UserNotFound:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_NOT_FOUND)
        except exceptions.UserInactive:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_INACTIVE)

        return user_data[0]

    async def get_by_user_uuid(
        self, user_uuid: str, safe: bool = True, db: AsyncSession = None
    ):
        try:
            user_data = await self.crud.get_user_by_user_uuid(
                user_uuid=user_uuid, safe=safe, db=db
            )
        except exceptions.UserNotFound:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_NOT_FOUND)
        except exceptions.UserInactive:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_INACTIVE)

        return user_data[0]

    async def get_by_line_id(
        self, line_id: int, safe: bool = True, db: AsyncSession = None
    ):
        try:
            user_data = await self.crud.get_user_by_line_id(line_id=line_id, db=db)
        except exceptions.UserNotFound:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_NOT_FOUND)
        except exceptions.UserInactive:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_INACTIVE)

        return user_data

    async def get_by_email(
        self, email: str, safe: bool = True, db: AsyncSession = None
    ):
        try:
            user_data = await self.crud.get_user_by_email(email=email, safe=safe, db=db)

        except exceptions.EmailNotFound:
            raise HTTPException(status_code=400, detail="Email not found")
        return user_data[0]

    async def authenticate(self, user: UserLogin, db: AsyncSession) -> UserDetail:
        try:
            user_data = await self.get_by_user_id(
                user_id=user.user_id, safe=False, db=db
            )

            self.password_manager.verify_password(
                password=user.user_pass, hashed_password=user_data.get("user_pass")
            )

            if user_data.get("user_pass") is not None:
                del user_data["user_pass"]

            return user_data
        except exceptions.PasswordIncorrect:
            raise HTTPException(status_code=400, detail=ErrorCode.PASSWORD_INCORRECT)

    async def create(self, user: UserCreate, db: AsyncSession) -> str:
        try:
            helper = PasswordManager()
            user_detail: UserCreate = user
            await self.crud.validate_create_user(user=user, db=db)
            user_detail.user_pass = helper.hash_password(password=user.user_pass)
            user_detail.user_uuid = helper.generate_uuid(user_id=user.user_id)
            user_detail.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
            # print(user_detail)
            created_user = await self.crud.create_user(user=user_detail, db=db)

        except exceptions.UserAlreadyExists:
            raise HTTPException(
                status_code=400, detail=ErrorCode.REGISTER_USER_ALREADY_EXISTS
            )
        except exceptions.EmailAlreadyUsed:
            raise HTTPException(
                status_code=400, detail=ErrorCode.REGISTER_EMAIL_ALREADY_USED
            )
        except:
            raise HTTPException(
                status_code=400, detail="Has some problem with UserManager.create()"
            )
        return created_user


class PasswordManager:
    def __init__(self, context: Optional[CryptContext] = None) -> None:
        if context is None:
            self.context = CryptContext(
                schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12
            )
        else:
            self.context = context

    def generate_uuid(self, user_id: str) -> str:
        return str(uuid.uuid5(uuid.NAMESPACE_X500, user_id))

    def hash_password(self, password: str) -> str:
        return self.context.hash(password)

    def verify_password(self, password: str, hashed_password: str) -> None:
        verified, _ = self.context.verify_and_update(password, hashed_password)
        if not verified:
            raise exceptions.PasswordIncorrect()

    def generate_password(self) -> str:
        return pwd.genword(length=10, charset="ascii_50")


UserManagerDependency = DependencyCallable[UserManager]
