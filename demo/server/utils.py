import requests
from config import settings


def fetch_poster(movie_id):
    """generate poster link based on id"""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={settings.THEMOVIEDB_API_KEY}&language=en-US"
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path