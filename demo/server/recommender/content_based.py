from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
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
        Tách các giá trị của genres ở từng bộ phim đang được ngăn cách bởi '|'
        """
        self.movies['genres'] = self.movies['genres'].str.split('|')
        self.movies['genres'] = self.movies['genres'].fillna("").astype('str')
        self.tfidf_matrix = tfidf_matrix(self.movies)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

    def refresh(self):
        """
        Chuẩn hóa dữ liệu và tính toán lại ma trận
        """
        self.build_model()

    def fit(self):
        self.refresh()

    # def genre_recommendations(self, title, top_x):
    #     """
    #     Xây dựng hàm trả về danh sách top film tương đồng theo tên film truyền vào:
    #     + Tham số truyền vào gồm "title" là tên film và "topX" là top film tương đồng cần lấy
    #     + Tạo ra list "sim_score" là danh sách điểm tương đồng với film truyền vào
    #     + Sắp xếp điểm tương đồng từ cao đến thấp
    #     + Trả về top danh sách tương đồng cao nhất theo giá trị "topX" truyền vào
    #     """
    #     titles = self.movies['title']
    #     indices = pd.Series(self.movies.index, index=self.movies['title'])
    #     idx = indices[title]
    #     sim_scores = list(enumerate(self.cosine_sim[idx]))
    #     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    #     sim_scores = sim_scores[1:top_x + 1]
    #     movie_indices = [i[0] for i in sim_scores]
    #     return sim_scores, titles.iloc[movie_indices].values

    def contend_based_recommendations(self, movie, titles):
        """read matrix create similarity function and call main function"""
        cosine_sim = linear_kernel(self.tfidf_matrix, self.tfidf_matrix)
        return self.get_recommendations(movie, titles, cosine_sim)
    
    def get_recommendations(movie, titles, cosine_sim):
        """in this function we find similarity score for specific movie sorted
        and gets all metadata for it"""
        indices = pd.Series(movie.index, index=movie['title']).drop_duplicates()
        idx = {indices[t] for t in titles}
        sim_scores = dict()
        for movie_idx in idx:
            sim = cosine_sim[movie_idx]
            for i, s in enumerate(sim):
                sim_scores[i] = s if s > sim_scores.get(i, 0) else sim_scores.get(i, 0)

        for i in idx:
            del sim_scores[i]

        sim_scores = list(sorted(sim_scores.items(), key=lambda item: item[1], reverse=True))[:5]

        movie_indices = [i[0] for i in sim_scores]
        movie_similarity = [i[1] for i in sim_scores]
        return pd.DataFrame(zip(movie['id'].iloc[movie_indices], movie['title'].iloc[movie_indices], movie_similarity),
                            columns=["movieId", "title", "score"])

content_based_recommender = ContentBasedRecommendation()