from typing import Optional
from pydantic import BaseModel


class Recommend(BaseModel):
    """
    {"movieId":1250,"rating":4.629879, "score": 1.00004, "title":"Bridge on the River Kwai, The (1957)","genres":"Adventure|Drama|War"}
    """
    movieId: int
    rating: Optional[float] = 0
    score: Optional[float] = 0
    title: Optional[str]
    genres: Optional[str]