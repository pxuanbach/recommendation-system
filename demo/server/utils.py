import requests
from config import settings
from data import links


def convert_movielen_id_to_tmdb_id(movielen_id):
    result = links.select("*").filter(f"movieId == {movielen_id}").first().asDict()
    return result["tmdbId"]


def fetch_movie_data(movie_id) -> dict:
    """generate poster link based on id"""
    tmdb_id = convert_movielen_id_to_tmdb_id(movie_id)
    url = f"https://api.themoviedb.org/3/movie/{tmdb_id}?api_key={settings.THEMOVIEDB_API_KEY}&language=en-US"
    data = requests.get(url)
    data = data.json()
    if "success" not in data:
        return {
            "overview": data['overview'],
            "poster_path": "https://image.tmdb.org/t/p/w500/" + data['poster_path'],
            "release_date": data['release_date'],
        }
    return {
        "overview": "",
        "poster_path": "",
        "release_date": "",
    }