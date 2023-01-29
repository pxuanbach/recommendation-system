import requests
from config import settings
from data import links
from logger import logger


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
        try:
            return {
                "overview": data['overview'],
                "poster_path": "https://image.tmdb.org/t/p/w500/" + data['poster_path'],
                "backdrop_path": "https://image.tmdb.org/t/p/w1280/" + data['backdrop_path'],
                "release_date": data['release_date'],
                "runtime": data["runtime"],
                "original_title": data["original_title"],
                "status": data["status"],
                "vote_average": data["vote_average"],
                "vote_count": data["vote_count"],
            }
        except Exception as e:
            logger.critical(f"Fetch data movieId {movie_id} error - {str(e)}")
    return {
        "overview": "",
        "poster_path": "",
        "backdrop_path": "",
        "release_date": "",
        "runtime": 0,
        "original_title": "",
        "status": "",
        "vote_average": 0,
        "vote_count": 0,
    }