from config import db_name, db_pass, db_user
from pymongo import MongoClient
import json
from datetime import datetime

allowed_user_keys = {"username", "age", "weight", "sex", "height", "weight-goal", "health-conditions", "machine-access", "frequency", "days"}

url = f"mongodb+srv://{db_user}:{db_pass}@td-cluster.3rurkdz.mongodb.net/{db_name}?retryWrites=true&w=majority&appName=TD-Cluster"
client = MongoClient(url)
db = client["fitlingo"]
user_collection = db["users"]

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def get_user_data(username:str):
    """
    Get user plan data from database using username
    """

    user = user_collection.find_one({"username": username})

    if user == None:
        print(f"user: {username} does not exist")
    
    else:
        user = serialize_doc(user)

    return user

def update_user_plan(username:str, plan:int):
    """
    Add workout plan to database for user
    """

    res = user_collection.update_one({"username": username}, {"$set": {"plan": plan}})

    if res.matched_count == 0:
        err = (1, f"err: no user by name {username}.")
    elif res.modified_count == 0:
        err = (0, f"user: {username} exists, but no change was made to plan")
    else:
        err = (0, "Plan successfully added")

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
    """
    add user to database
    return 
        (errcode, msg) - 1 if there is err, 0 if successful
    """
    username = data.get("username", None)

    if username is None:
        err = (1, "Missing username")
        
    elif not user_collection.find_one({"username": username}):
    
        allowed_user_keys = {"username","first-name", "last-name", "age", "weight", "sex", "height", "weight-goal", "health-conditions", "machine-access", "frequency", "days"}

        cleaned_data = {k: data[k] for k in allowed_user_keys if k in data}
        missing_keys = allowed_user_keys - cleaned_data.keys()

        if missing_keys:
            err = f"Missing the following data for user: {missing_keys}"
            print(err)
            return (1, err)

        result = user_collection.insert_one(data)

        if result.inserted_id:
            err =(0, "insert successful")
        else:
            err = (1, "insert failed")

    else: 
        err = (1, f"user '{username}' already exists")

    print(err[1])
    return err

def search_user(query_string: str):
    """
    search for users based on query
    """

    query = {"username": {"$regex": query_string, "$options": "i"}}
    results = user_collection.find(query)

    serialized = [serialize_doc(doc) for doc in results]

    return serialized