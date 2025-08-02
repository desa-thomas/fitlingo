from flask import Flask, request, jsonify
from flask_cors import CORS

from gemini import create_workout_plan
import database_functions as db

app = Flask(__name__)
CORS(app)


@app.get("/")
def test():
    """test flask"""
    return "<h1> bruh </h1>"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Expecting JSON in the request body

    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    #add user to database
    err = add_user(data)
    if err[0]:
        return jsonify({"error": err[1]})
    
    #create a workout plan
    plan = create_workout_plan(data)

    username = data.get("username", None)
    if username is None:
        return jsonify ({"error": "Missing username"})

    #add generated workout plan to database
    err = update_user_plan(username, plan)

    if err[0]:
        return jsonify({"error": err[1]})

    return jsonify({"msg": "user successfully created"}), 200

@app.route('/getuser', methods=['GET'])
def serve_user_data(username):
    """
    Serve user data based on user name
    """
    return

@app.route('/search', methods=['GET'])
def search_user():

    return "Hello alice"

@app.route('/complete-day', methods=['POST'])
def complete_day():
    return

@app.route('/complete-exercise', methods=['POST'])
def complete_exercise():

    username = request.args.get("username")
    workout_no = request.args.get("workout_no")
    day_no = request.args.get("day_no")

    db.complete_workout(username, workout_no, day_no)
    return

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)