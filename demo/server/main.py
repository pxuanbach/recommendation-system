from typing import Any, List, Optional
from fastapi import FastAPI, Body, HTTPException
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

from logger import logger
from config import settings
from data import movies, users
from model_based import load_model, get_model_based_recommend


class Movie(BaseModel):
    movieId: int
    title: Optional[str]
    genres: Optional[str]
    thumbnail: Optional[str]


class User(BaseModel):
    userId: int
    gender: Optional[str]
    age: Optional[int]
    occupation: Optional[str]
    zipcode: Optional[str]
    age_desc: Optional[str]
    occ_desc: Optional[str]


class Recommend(BaseModel):
    """
    {"movieId":1250,"userId":8,"rating":4.629879,"title":"Bridge on the River Kwai, The (1957)","genres":"Adventure|Drama|War"}
    """
    movieId: int
    userId: int
    rating: float
    title: Optional[str]
    genres: Optional[str]


model = load_model()
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


@app.get("/users")
async def get_users(
    skip: int = 0,
    limit: int = 10
):
    user_arr= [
        (
            User(**row)
        ) for index, row in users[skip:limit].iterrows()
    ]  
    return user_arr


@app.get("/movies")
async def get_movies(
    skip: int = 0,
    limit: int = 10
):
    movie_arr= [
        (
            Movie(**row)
        ) for index, row in movies[skip:limit].iterrows()
    ]  
    return movie_arr


@app.get(
    "/recommend/{user_id}/model-based",
    response_model=List[Recommend]
)
async def get_movies(
    user_id: int
):
    # try:
    result = await get_model_based_recommend(user_id, model)
    recommend_arr = []
    for obj_str in result.toJSON().collect():
        recommend_arr.append(json.loads(obj_str))
    return recommend_arr
    # except Exception as e:
    #     raise HTTPException(
    #         status_code=500,
    #         detail=str(e)
    #     )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=int("8000"),
    )
    