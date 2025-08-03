from google import genai
from config import API_KEY
import json

client = genai.Client(api_key=API_KEY)

def create_prompt(data):
    """
    Create a Gemini prompt based on the provided user input data.

    Args:
        data (dict): A dictionary containing user details.

    Returns:
        str: A prompt string for the API.
    """
    prompt = f"""Create a {data.get('days', 1)} day workout plan for the following user:
- Age: {data.get('age', 'N/A')}
- Weight: {data.get('weight', 'N/A')} kg
- Height: {data.get('height', 'N/A')} cm
- Weight goal: {data.get('weight-goal', ['N/A'])[0]} {data.get('weight-goal', ['N/A', ''])[1]} kg
- Health conditions: {', '.join(data.get('health-conditions', []))}
- Machine access: {"Yes" if data.get('machine-access') else "No"}
- Dumbbells access: {"Yes" if data.get('dumbells-access') else "No"}
- Frequency: {data.get('frequency', 'N/A')} days per week
- Intensity: {data.get('intensity', 'average')}
- Skill level: {data.get('skill', 'beginner')}

Please generate a detailed workout plan taking into consideration the users health conditions,
goals, skill level and desired intensity. Also include rest days. 
Output the plan ONLY in the following json format:"""
    
    prompt += ("""
    {
        "days": [
            {
                "day-name": "push/pull/legs/cardio/rest",
                "day-number": 1,
                "estimated-workout-time": x-y minutes
                "suggested-calorie-intake": x-y cals,
                "workouts": [
                    {
                        "name": "dead-lift etc",
                        "sets": 3,
                        "reps": 12,
                        "instructions": "pull weight"
                    },
                ]
            }
        ]
    }
    If the day is a rest day, include 1 workout like so {"name": "rest", "sets": 1, "reps": 1, "instructions": "rest today"}
    """)
    return prompt

def create_workout_plan(data):
    """
    Create a fitness plan in json format, referring to sample-output.json.
    This version correctly extracts the JSON string from the API response
    and includes robust cleaning logic.

    Args:
        data (dict): json formatted user data, refer to sample-input.json.
    
    Returns:
        dict: A json formatted plan, refer to sample-output.json, or an error dictionary.
    """
    err = 0
    prompt = create_prompt(data)
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)

    # Correctly access the nested text from the API response object.
    # The JSON string is located in response.candidates[0].content.parts[0].text
    try:
        response_text = response.candidates[0].content.parts[0].text
    except (AttributeError, IndexError):
        # If the response structure is unexpected, fall back to a raw string
        # representation for debugging.
        plan = {"error": "Could not find text in response object", "raw": str(response)}
        err = 1
        return err, plan

    # Split the text into lines for cleaning.
    lines = response_text.splitlines()

    # --- Start of improved cleaning logic ---
    # Remove all leading lines that are part of a markdown code block.
    while lines and lines[0].strip().lower() in ["json", "```json", "'''json"]:
        lines = lines[1:]
    while lines and lines[0].strip() in ['"""', "'''", "```"]:
        lines = lines[1:]

    # Remove all trailing markdown code block lines.
    while lines and lines[-1].strip() in ['"""', "'''", "```"]:
        lines = lines[:-1]
    # --- End of improved cleaning logic ---

    # Join the cleaned lines back into a single string.
    stripped_response = "\n".join(lines)

    try:
        # Attempt to parse the cleaned string as a JSON object.
        plan = json.loads(stripped_response)
    except Exception as e:
        # If parsing fails, return a detailed error message with the raw data.
        plan = {"error": f"Could not parse response. Exception: {e}", "raw": stripped_response}
        err = 1

    return err, plan