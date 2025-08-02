import json
from functions import create_prompt

# Load sample input JSON
with open('../sample-input.json', 'r') as f:
    user_data = json.load(f)

# Generate prompt
prompt = create_prompt(user_data)

# # Print or send to Gemini API
print(prompt)
# Call Gemini API function:
# response = gemini_api(prompt)  # This should return a JSON string
# response_dict = json.loads(response)  # Convert JSON string to Python dict
# print(response_dict)