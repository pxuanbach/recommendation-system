from typing import List, Optional
from pydantic import BaseModel, validator


class Movie(BaseModel):
    movieId: int
    title: Optional[str]
    genres: Optional[str]
    genreList: Optional[List[str]] = []
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    overview: Optional[str]
    original_title: Optional[str]
    release_date: Optional[str]
    status: Optional[str]
    runtime: Optional[int]
    vote_average: Optional[float]
    vote_count: Optional[int]

    @validator("genreList", always=True)
    def generate_genre_list(cls, v, values, **kwargs):
        if 'genres' in values:
            v = str(values['genres']).split('|')
        return v