from google import genai
from config import API_KEY
from create_prompt import create_prompt
import json

client = genai.Client(api_key=API_KEY)

#example response

# response = client.models.generate_content(
#     model="gemini-2.5-flash", contents="Explain how AI works in a few words"
# )
# print(response.text)

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
        return plan

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

    return json.dumps(plan, indent=2)
