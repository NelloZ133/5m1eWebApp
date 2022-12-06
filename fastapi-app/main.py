import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# need import models for auto create
from app.routers import users_routers, static_routers, request_routers
from app.dependencies import get_pg_async_db

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(static_routers(get_pg_async_db), prefix="/api/static")
app.include_router(users_routers(get_pg_async_db), prefix="/api/users")
app.include_router(request_routers(get_pg_async_db), prefix="/api/request")
app.mount("/api/static", StaticFiles(directory="uploaded_files"), name="/api/static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
