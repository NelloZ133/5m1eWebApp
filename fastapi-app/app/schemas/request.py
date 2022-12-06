from pydantic import BaseModel, Json
from typing import Optional, List, Dict

class RequestBase(BaseModel):
    pass

class RequestCreateSubmit(RequestBase):
    request_process_name: str
    data_value: Dict[str, str | int | list | tuple | None]
    user_uuid: str
    line_id: int
    request_process_id: int
    current_state_id: int
    action_user_uuid: str
    action_id: int
    action_note: str
    transition_id: int
    email_list: List[str]

class RequestCreateSubmitWithId(RequestBase):
    request_id: str
    request_process_name: str
    data_value: Dict[str, str | int | list | tuple | None]
    user_uuid: str
    line_id: int
    request_process_id: int
    current_state_id: int
    action_user_uuid: str
    action_id: int
    action_note: str
    transition_id: int
    email_list: List[str]

