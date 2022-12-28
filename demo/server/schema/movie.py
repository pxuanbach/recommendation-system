from typing import List, Optional
from pydantic import BaseModel, validator


class Movie(BaseModel):
    movieId: int
    title: Optional[str]
    genres: Optional[str]
    # thumbnail: Optional[str]
    genreList: Optional[List[str]] = []

    @validator("genreList", always=True)
    def generate_genre_list(cls, v, values, **kwargs):
        if 'genres' in values:
            v = str(values['genres']).split('|')
        return v