from flask import Flask
from flask_restful import Api
from controllers.recommend.recommend import RecommendController

application = app = Flask(__name__)
api = Api(application)

api.add_resource(RecommendController, '/movies/recommend')

#parser = argparse.ArgumentParser()
#parser.add_argument("--environment")
#args = parser.parse_args()
#create_config(args.environment)

if __name__ == "__main__":
    application.run(debug=True)
	
#lubie placki