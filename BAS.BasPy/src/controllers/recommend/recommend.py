import jsons
from flask_restful import Resource
from services.movie.movie import MovieService
from contracts.response import ResponseDTO
from controllers.recommend.args import recommend_args

class RecommendController(Resource):
    def __init__(self):
        self.movie_service = MovieService()

    def get(self):
        args = recommend_args.parse_args()
        try:
            recommendations = self.movie_service.get_recommended_movies(args.user_account_id, args.page, args.page_size)
            result = ResponseDTO(recommendations)
            return jsons.dump(result, key_transformer=jsons.KEY_TRANSFORMER_CAMELCASE), 200
        except BaseException as e:
            #to do: log errors
            print(e)
            return jsons.dump(ResponseDTO(e)), 500
