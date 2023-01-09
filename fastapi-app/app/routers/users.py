from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator, List

from app.schemas.users import UserLogin, UserCreate, UserRegister
from app.manager.users import UserManager
from app.dependencies import get_pg_async_db
from app.errors import ErrorCode
from app.functions import api_key_auth
from pydantic import BaseModel


class BearerResponse(BaseModel):
    user_uuid: str
    user_id: str
    firstname: str
    lastname: str
    email: str
    position_id: int
    section_id: int
    concern_line: List[int]
    created_at: str
    updated_at: str
    is_active: bool

    access_token: str
    refresh_token: str
    token_type: str = "Bearer"


def users_routers(db: AsyncGenerator) -> APIRouter:
    router = APIRouter()
    user_manager = UserManager()

    @router.get("/all", dependencies=[Depends(api_key_auth)])
    async def get_all_users(db: AsyncSession = Depends(db)):
        return await user_manager.get_all_users(db=db)

    @router.get("/user_id", dependencies=[Depends(api_key_auth)])
    async def get_user_by_user_id(v: str, db: AsyncSession = Depends(db)):
        user = await user_manager.get_by_user_id(user_id=v, db=db)
        return user

    @router.get("/email", dependencies=[Depends(api_key_auth)])
    async def get_user_by_email(v: str, db: AsyncSession = Depends(get_pg_async_db)):
        user = await user_manager.get_by_email(email=v, db=db)
        return user

    @router.post("/login")
    async def login(user: UserLogin, db: AsyncSession = Depends(db)):
        user_data = await user_manager.authenticate(user=user, db=db)

        if user_data is None:
            raise HTTPException(status_code=400, detail=ErrorCode.USER_NOT_VERIFIED)

        return BearerResponse(
            user_uuid=user_data["user_uuid"],
            user_id=user_data["user_id"],
            firstname=user_data["firstname"],
            lastname=user_data["lastname"],
            email=user_data["email"],
            position_id=user_data["position_id"],
            section_id=user_data["section_id"],
            concern_line=user_data["concern_line"],
            created_at=user_data["created_at"],
            updated_at=user_data["updated_at"],
            is_active=user_data["is_active"],
            access_token="",
            refresh_token="",
        )

    @router.post("/register", dependencies=[Depends(api_key_auth)])
    async def create_user(user: UserRegister, db: AsyncSession = Depends(db)):
        user_detail = UserCreate(
            user_uuid="",
            created_at="",
            user_id=user.user_id,
            user_pass=user.user_pass,
            firstname=user.firstname,
            lastname=user.lastname,
            email=user.email,
            app_line_id=user.app_line_id,
            position_id=user.position_id,
            section_id=user.section_id,
            concern_line=user.concern_line,
            is_active=user.is_active,
            is_admin=user.is_admin,
        )
        created_user = await user_manager.create(user=user_detail, db=db)
        return created_user

    return router
