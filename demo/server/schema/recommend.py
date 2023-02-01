from typing import Optional
from pydantic import BaseModel


class Recommend(BaseModel):
    movieId: int
    rating: Optional[float] = 0
    score: Optional[float] = 0
    title: Optional[str]
    genres: Optional[str]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    overview: Optional[str]
    release_date: Optional[str]
    runtime: Optional[int]