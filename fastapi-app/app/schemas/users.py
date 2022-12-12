from pydantic import BaseModel, EmailStr
from typing import Optional, List


class UserLogin(BaseModel):
    user_id: str
    user_pass: str


class UserDetail(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    app_line_id: Optional[str] = ""
    position_id: int
    section_id: int
    concern_line: Optional[List[int]] = []
    is_active: bool = False
    is_admin: bool = False
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True


class UserRegister(BaseModel):
    user_id: str
    user_pass: str
    firstname: str
    lastname: str
    email: EmailStr
    app_line_id: Optional[str] = ""
    position_id: int
    section_id: int
    concern_line: Optional[List[int]] = []
    is_active: bool = True
    is_admin: bool = False

    class Config:
        orm_mode = True

class UserCreate(UserRegister):
    user_uuid: str
    created_at: str

    class Config:
        orm_mode = True
