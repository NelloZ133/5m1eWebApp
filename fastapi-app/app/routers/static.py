from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator
import asyncio

from app.crud.static import staticdataCRUD


def static_routers(db: AsyncGenerator) -> APIRouter:
    router = APIRouter()
    crud = staticdataCRUD()

    @router.post("/temp")
    async def dummy():
        return {"msg": "temp file uploaded"}

    @router.get("/5m1e/settings", name="Setting data for 5M1E report")
    async def _5m1e_settings(db: AsyncSession = Depends(db)):
        (
            positions,
            users_join_positions,
            department,
            sections,
            lines,
            processes_join_types,
            sc_symbols,
            processes_symbols,
            products,
            # machines,
            models,
            models_customers,
            customers_join_plants,
            request_processes,
            list_items_problem,
            list_items_changepoint,
        ) = await asyncio.gather(
            crud.get_positions(db),
            crud.get_join_users_positions(db),
            crud.get_departments(db),
            crud.get_sections(db),
            crud.get_lines(db),
            crud.get_join_processes_types(db),
            crud.get_sc_symbols(db),
            crud.get_processes_symbols(db),
            crud.get_products(db),
            # crud.get_machines(db),
            crud.get_models(db),
            crud.get_models_customers(db),
            crud.get_join_customers_plants(db),
            crud.get_request_processes(db),
            crud.get_list_items([1], db),  # problem
            crud.get_list_items([2], db),  # changepoint
        )

        data = {
            "positions": positions,
            "users_join_roles_positions": users_join_positions,
            "departments": department,
            "sections": sections,
            "lines": lines,
            "processes_join_types": processes_join_types,
            "sc_symbols": sc_symbols,
            "processes_symbols": processes_symbols,
            "products": products,
            # "machines": machines,
            "models": models,
            "models_customers": models_customers,
            "customers_join_plants": customers_join_plants,
            "request_processes": request_processes,
            "list_items_problem": list_items_problem,
            "list_items_changepoint": list_items_changepoint,
        }
        return data

    @router.get("/5m1e/report", name="Static data for 5M1E report")
    async def _5m1e_report(db: AsyncSession = Depends(db)):
        (
            request_processes,
            list_items_problem,
            list_items_changepoint,
            item_details,
            products,
            lines,
            processes,
            processes_machines,
            # parts,
        ) = await asyncio.gather(
            crud.get_request_processes(db),
            crud.get_list_items([1], db),  # problem
            crud.get_list_items([2], db),  # changepoint
            crud.get_item_details(db),
            crud.get_products(db),
            crud.get_lines(db),
            crud.get_processes(db),
            crud.get_processes_machines(db),
        )

        data = {
            "request_processes": request_processes,
            "list_items_problem": list_items_problem,
            "list_items_changepoint": list_items_changepoint,
            "item_details": item_details,
            "products": products,
            "lines": lines,
            "processes": processes,
            "processes_machines": processes_machines,
        }
        return data

    return router
