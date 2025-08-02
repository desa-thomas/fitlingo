from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/")
def test():
    """test flask"""
    return jsonify({"msg": "bruh"})

if __name__ == '__main__':
    app.run(debug=True) 