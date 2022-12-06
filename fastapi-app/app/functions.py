from typing import Any, List
import asyncpg.pgproto.pgproto as pgproto
from fastapi.security import APIKeyHeader
from fastapi import Depends, HTTPException
from starlette import status
from datetime import datetime, tzinfo
import pytz
from dotenv import dotenv_values

# load config from .env to get X-API-KEY list
config = dotenv_values(".env")
api_keys = config["X_API_KEY"]
X_API_KEY = APIKeyHeader(name="X-API-Key")


def toArray(input: Any) -> list:
    # input : result from AsyncSession.execute(stmt)
    rs = input.scalars().all()
    return rs


def toArrayWithKey(input: Any, except_column: list[str] = []) -> list:
    if input == None:
        return

    tz = pytz.timezone("Asia/Bangkok")
    # query with raw statement
    rs = [
        {
            c: str(getattr(r, c))
            if isinstance(getattr(r, c), pgproto.UUID)
            else getattr(r, c)
            .replace(tzinfo=pytz.utc)
            .astimezone(tz)
            .strftime("%Y-%m-%d %H:%M:%S.%f")
            if isinstance(getattr(r, c), datetime)
            else getattr(r, c)
            for c in r.keys()
            if c not in except_column
        }
        for r in input
    ]
    return rs


def toDictByColumnId(input: list, id_column: str) -> dict:
    output = {}
    for e in input:  # each element in input list
        if id_column not in e:
            return
        e_output = {}
        for k, v in e.items():  # each key, value in element.items()
            if k != id_column:
                e_output = {**e_output, k: v}
        output = {**output, e[id_column]: e_output}
    return output


def toDictArrayByColumnId(
    input: list, id_column: str, except_array_columns: list[str] = []
) -> dict:
    output = {}
    for e in input:
        if id_column not in e:
            return
        except_output = {}
        e_output = {}
        for k, v in e.items():
            if k != id_column and k not in except_array_columns:
                e_output = {**e_output, k: v}
            elif k != id_column and k in except_array_columns:
                except_output = {**except_output, k: v}
        if e[id_column] in output:
            output = {
                **output,
                e[id_column]: {
                    **except_output,
                    "data": [*output[e[id_column]]["data"], e_output],
                },
            }
        else:
            output = {**output, e[id_column]: {**except_output, "data": [e_output]}}
    return output


def api_key_auth(x_api_key: str = Depends(X_API_KEY)):
    # this function is used to validate X-API-KEY in request header
    # if the sent X-API-KEY in header is not existed in the config file
    #   reject access
    if x_api_key not in api_keys:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Forbidden"
        )
