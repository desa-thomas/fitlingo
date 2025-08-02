from config import db_name, db_pass, db_user
from pymongo import MongoClient
import json
from datetime import datetime

allowed_user_keys = {"username", "age", "weight", "sex", "height", "weight-goal", "health-conditions", "machine-access", "frequency", "days"}

url = f"mongodb+srv://{db_user}:{db_pass}@td-cluster.3rurkdz.mongodb.net/{db_name}?retryWrites=true&w=majority&appName=TD-Cluster"
client = MongoClient(url)
db = client["fitlingo"]
user_collection = db["users"]

def get_user_data(username:str):
    """
    Get user plan data from database using username
    """

    user = user_collection.find_one({"username": username})

    if user == None:
        print(f"user: {username} does not exist")
    
    return user

def update_user_plan(username:str, plan:int):
    """
    Add workout plan to database for user
    """

    res = user_collection.update_one({"username": username}, {"$set": {"plan": plan}})

    if res.matched_count == 0:
        err = f"err: no user by name {username}."
    elif res.modified_count == 0:
        err = f"err: user: {username} exists, but no change was made to plan"
    else:
        err = "Plan successfully added"

    print (err)
    return err

def complete_day(username:str, day_no: int):
    """
    Mark day day_no as completed
    """
    query =  {"username": username, f"plan.days.{day_no-1}": {"$exists": True}}
    res = user_collection.update_one(
    query,  # ensure index 1 exists
    {"$set": {f"plan.days.{day_no-1}.date-completed": datetime.now()} } )

    if res.matched_count == 0:
        err = f"err: no user found with the following attributes:\n{query}"   
    
    elif res.modified_count == 0:
        err = f"err: user: {username} exists, but no change was made to `date-completed`"
    else:
        err = f"day {day_no} marked as completed"

    print(err)
    return err

def complete_workout(username:str, day_no: int, workout_no: int):
    """
    Mark workout from day as completed
    """
    day_index = day_no-1 
    workout_index = workout_no-1
    query = {"username": username, 
    f"plan.days.{day_index}": {"$exists": True}, #make sure day and workout exist
    f"plan.days.{day_index}.workouts.{day_index}": {"$exists": True}}
    print(query)
    res = user_collection.update_one(
        query,
        {"$set": {f"plan.days.{day_index}.workouts.{workout_index}.completed": True}}
    )
    
    if res.matched_count == 0:
        err = f"err: no document found with following attributes:\n{query}"   
    
    elif res.modified_count == 0:
        err = f"err: user: {username} exists, but no change was made to `plan.days.{day_no-1}.workouts.{workout_no}-1.completed`"
    else:
        err = f"day {day_no} workout {workout_no} marked as completed"

    print(err)
    
    return err

def add_user(data: dict):
    username = data.get("username", None)

    if username is None:
        err = "Missing username"
        
    elif not user_collection.find_one({"username": username}):
    
        allowed_user_keys = {"username","first-name", "last-name", "age", "weight", "sex", "height", "weight-goal", "health-conditions", "machine-access", "frequency", "days"}

        cleaned_data = {k: data[k] for k in allowed_user_keys if k in data}
        missing_keys = allowed_user_keys - cleaned_data.keys()

        if missing_keys:
            err = f"Missing the following data for user: {missing_keys}"
            print(err)
            return err

        result = user_collection.insert_one(data)

        if result.inserted_id:
            err = "insert successful"
        else:
            err = "insert failed"

    else: 
        err = f"user '{username}' already exists"

    print(err)
    return err

data = json.loads("""
{
    "username": "anothaone-again", 
    "first-name": "tom", 
    "last-name": "bruh", 
    "age": 20,
    "weight": 50,
    "sex": "m",
    "height": 140,
    "weight-goal": ["lose", 2],
    "health-conditions": ["na"],
    "machine-access": true,
    "dumbells-access": true,
    "frequency": 5,
    "days": 5
}
    """)
add_user(data)