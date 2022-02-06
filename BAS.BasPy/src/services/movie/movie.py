from services.movie.contracts.recommended_movies import RecommendedMoviesDTO
from data.moviedb import MovieDbContext

class MovieService:
    def __init__(self):
        self.movie_db = MovieDbContext()

    def get_recommended_movies(self, user_account_id, page=1, page_size=20):
        connection = self.movie_db.get_connection()
        cursor = connection.cursor()
        offset = (page - 1) * page_size
        movies = cursor.execute('SELECT [Id] '
                                'FROM [dbo].[Movies] '
                                'ORDER BY NEWID() '
                                'OFFSET (?) ROWS '
                                'FETCH NEXT (?) ROWS ONLY ',
                                offset, page_size).fetchall()
        total = cursor.execute('SELECT COUNT([Id]) FROM [dbo].[Movies]').fetchone()[0]
        movie_ids = [movie.Id for movie in movies]
        return RecommendedMoviesDTO(movie_ids=movie_ids, total=total)
