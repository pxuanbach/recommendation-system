from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    userId: int
    gender: Optional[str]
    age: Optional[int]
    occupation: Optional[str]
    zipcode: Optional[str]
    age_desc: Optional[str]
    occ_desc: Optional[str]