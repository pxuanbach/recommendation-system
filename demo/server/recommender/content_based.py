from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
from pandas import isnull, notnull
from data import movies


def tfidf_matrix(movies):
    """
    Dùng hàm "TfidfVectorizer" để chuẩn hóa "genres" với:
    + analyzer='word': chọn đơn vị trích xuất là word
    + ngram_range=(1, 1): mỗi lần trích xuất 1 word
    + min_df=0: tỉ lệ word không đọc được là 0
    Lúc này ma trận trả về với số dòng tương ứng với số lượng film và số cột 
    tương ứng với số từ được tách ra từ "genres"
    """
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=0)
    new_tfidf_matrix = tf.fit_transform(movies['genres'])
    return new_tfidf_matrix


def cosine_sim(matrix):
    """
    Dùng hàm "linear_kernel" để tạo thành ma trận hình vuông với số hàng và số cột 
    là số lượng film để tính toán điểm tương đồng giữa từng bộ phim với nhau
    """
    new_cosine_sim = linear_kernel(matrix, matrix)
    return new_cosine_sim


class ContentBasedRecommendation:
    def __init__(self):
        self.movies = movies.toPandas()
        self.tfidf_matrix = None
        self.cosine_sim = None

    def build_model(self):
        """
        Separate genres values for each movie being separated by '|'
        """
        clone_movies = movies.toPandas()
        clone_movies['genres'] = clone_movies['genres'].str.split('|')
        clone_movies['genres'] = clone_movies['genres'].fillna("").astype('str')
        self.tfidf_matrix = tfidf_matrix(clone_movies)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

    def refresh(self):
        """
        Normalize the data and recalculate the matrix
        """
        self.build_model()

    def fit(self):
        self.refresh()

    def get_recommendations_for_title(self, title, num_items=5) -> pd.DataFrame:
        titles = self.movies['title']
        indices = pd.Series(self.movies.index, index=self.movies['title']).drop_duplicates()
        idx = indices[title]
        # sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim = self.cosine_sim[idx]
        sim_scores = dict()
        for i, s in enumerate(sim):
            if isinstance(s, np.float64):
                # prevent recommending the same movie
                if self.movies['title'].iloc[i] == title:
                    continue
                if s > sim_scores.get(i, 0):
                    sim_scores[i] = s
        sim_scores = list(sorted(sim_scores.items(), key=lambda item: item[1], reverse=True))[:num_items]
        movie_indices = [i[0] for i in sim_scores]
        movie_similarity = [i[1] for i in sim_scores]
        # print(sim_scores, titles.iloc[movie_indices])
        return pd.DataFrame(zip(self.movies['movieId'].iloc[movie_indices], 
            self.movies['title'].iloc[movie_indices], 
            self.movies['genres'].iloc[movie_indices], movie_similarity),
            columns=["movieId", "title", "genres", "score"])

    def get_recommendations(self, titles, num_items=5) -> pd.DataFrame:
        """in this function we find similarity score for specific movie sorted
        and gets all metadata for it"""
        indices = pd.Series(self.movies.index, index=self.movies['title']).drop_duplicates()
        idx = [indices[t] for t in titles]
        sim_scores = dict()
        for movie_idx in idx:
            sim = self.cosine_sim[movie_idx]
            for i, s in enumerate(sim):
                if isinstance(s, np.float64):
                    if s > sim_scores.get(i, 0):
                        sim_scores[i] = s

        # for i in idx:
        #     print(i)
        #     del sim_scores[i]

        sim_scores = list(sorted(sim_scores.items(), key=lambda item: item[1], reverse=True))[:num_items]

        movie_indices = [i[0] for i in sim_scores]
        movie_similarity = [i[1] for i in sim_scores]
        return pd.DataFrame(zip(self.movies['movieId'].iloc[movie_indices], 
            self.movies['title'].iloc[movie_indices], 
            self.movies['genres'].iloc[movie_indices], movie_similarity),
            columns=["movieId", "title", "genres", "score"])

content_based_recommender = ContentBasedRecommendation()