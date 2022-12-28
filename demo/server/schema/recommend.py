from typing import Optional
from pydantic import BaseModel


class Recommend(BaseModel):
    """
    {"movieId":1250,"userId":8,"rating":4.629879,"title":"Bridge on the River Kwai, The (1957)","genres":"Adventure|Drama|War"}
    """
    movieId: int
    userId: int
    rating: float
    title: Optional[str]
    genres: Optional[str]