from google import genai
from config import API_KEY
import json

client = genai.Client(api_key=API_KEY)

#example response

# response = client.models.generate_content(
#     model="gemini-2.5-flash", contents="Explain how AI works in a few words"
# )
# print(response.text)

def create_workout_plan(data):

    """
    Create a fitness plan in json format, refer to sample-output.json

    input
        data (dict) - json formatted user data, refer to sample-input.json
    
    output
        plan (dict) - json formatted plan, refer to sample-output.json
    """

    #prompt = create_prompt(data)
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    plan = json.loads(response)

    return plan