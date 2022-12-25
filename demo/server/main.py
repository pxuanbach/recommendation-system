from typing import Any
from fastapi import FastAPI, Body
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from logger import logger
from config import settings


app = FastAPI(
    title="Movie Recommender API",
    description="Development",
    version="1.0",
    default_response_class=ORJSONResponse
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    expose_headers=["Content-Range", "Range"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    """Health check."""
    # return {"status_code": 200, "detail": "Healthy!"}
    return ORJSONResponse(
        content={"detail": "Healthy!"}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=int("8000"),
    )
    