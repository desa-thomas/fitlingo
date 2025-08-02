import json
from create_prompt import create_prompt
from gemini import create_workout_plan

data = json.loads("""{
    "name": "john", 
    "age": 20,
    "weight": 50,
    "sex": "m",
    "height": 130,
    "weight-goal": ["lose", 2],
    "health-conditions": ["na"],
    "machine-access": true,
    "dumbells-access": true,
    "frequency": 1,
    "days": 1
}""")
print(create_workout_plan(data))