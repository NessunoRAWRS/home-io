from flask import Flask, jsonify, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def login():
	data = request.json

	if 'user' in data and 'password' in data:
		# TODO: generate token (read up online how it actually works)
		# Set a timeout for tokens, so no one should be able to tamper it
		# Watchout for any possibile break through code that could expose data!
		return {'token': 'token-test'}, 200
	else:	
		return 'Missing required parameter', 422


@app.route('/garbage', methods=['GET'])
def get_garbage():
    response = [
		{
			'day': 'Martedì',
			'garbage': [
				'Umido',
				'Carta',
				'Secco'
			]
		},
		{
			'day': 'Giovedì',
			'garbage': [
				'Vetro'
			]
		},
		{
			'day': 'Venerdì',
			'garbage': [
				'Plastica',
				'Umido'
			]
		}
	]
    return jsonify(response), 200



if __name__ == '__main__':
    app.run(port=5000)
