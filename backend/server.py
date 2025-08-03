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

    username = data.get("username", None)
    if username is None:
        return jsonify ({"error": "Missing username"}), 400

    #add user to database
    err = db.add_user(data)
    if err[0]:
        return jsonify({"error": err[1]}), 400
    
    #create a workout plan
    err, plan = create_workout_plan(data)
    if err: 
        return jsonify(plan), 400

    #add generated workout plan to database
    err = db.update_user_plan(username, plan)

    if err[0]:
        return jsonify({"error": err[1]}), 400

    return jsonify({"msg": "user successfully created"}), 200

@app.route('/getuser', methods=['GET'])
def serve_user_data():
    """
    Serve user data based on user name
    """
    username = request.args.get("username")
    
    if not username:
        data = jsonify({"err": "missing required parameter 'username'"})
        code = 400
    
    #username is provided 
    else:
        data = db.get_user_data(username)
        if not data:
            data = jsonify({"err": f"user: {username} does not exist"})
            code = 400
        else:
            
            code = 200
    

    return data, code

@app.route('/search', methods=['GET'])
def search_user():
    query = request.args.get("query")

    if not query:
        results = jsonify({"err": "Missing required parameter: 'query'"})
        code = 400
    
    else:
        results = db.search_user(query)
        code = 200

    return results, code

@app.route('/complete-day', methods=['POST'])
def complete_day():
    data = request.get_json()
    if not data:
        return jsonify({"err": "missing body parameters"}), 400

    username = data.get("username", None)
    day_no = data.get("day_no", None)

    if not username:
        res = jsonify({"err": "Missing requried parameter username"})
        code = 400
    elif not day_no:
        res = jsonify({"err": "Missing required parameter day_no"})
        code = 400
    else:
        err, msg = db.complete_day(username, day_no)
        if err:
            res = jsonify({"err": msg})
            code = 400
        else: 
            res = jsonify({"msg": msg})
            code = 200

    print(res, code)
    return res, code

@app.route('/complete-exercise', methods=['POST'])
def complete_exercise():

    data = request.get_json() 
    if not data: 
        return jsonify({"err": "Missing parameter body"}), 400
    
    username = data.get("username", None)
    day_no = data.get("day_no", None)
    workout_no = data.get("workout_no", None)

    if username == None or day_no == None or workout_no == None:
        return jsonify({"err": f"Missing one or more required parameters: 'username', 'day_no', 'exercise_no']"}), 400

    msg, err = db.complete_workout(username, day_no, workout_no)
    if err:
        code = 400
    else: 
        code = 200
    
    return jsonify(msg), code

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)