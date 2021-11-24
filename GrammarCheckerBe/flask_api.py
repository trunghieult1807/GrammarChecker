from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from predictor import *

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)


class GrammarChecker(Resource):
    def post(self):
        req = request.json
        return predict(req['body'])


api.add_resource(GrammarChecker, '/grammar_checker')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
