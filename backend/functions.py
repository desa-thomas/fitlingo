def create_prompt(data):
    """
    Create a Gemini prompt based on the provided user input data.

    Args:
        data (dict): A dictionary containing user details.

    Returns:
        str: A prompt string for the API.
    """
    prompt = f"""Create a {data.get('days', 30)} day workout plan for the following user:
- Age: {data.get('age', 'N/A')}
- Weight: {data.get('weight', 'N/A')} kg
- Height: {data.get('height', 'N/A')} cm
- Weight goal: {data.get('weight-goal', ['N/A'])[0]} {data.get('weight-goal', ['N/A', ''])[1]} kg
- Health conditions: {', '.join(data.get('health-conditions', []))}
- Machine access: {"Yes" if data.get('machine-access') else "No"}
- Dumbbells access: {"Yes" if data.get('dumbells-access') else "No"}
- Frequency: {data.get('frequency', 'N/A')} days per week

Please generate a detailed workout plan effectively helps the user reach their goals
while taking into consideration their health conditions. Output the plan in the following format:"""
    
    prompt += (""" 
    {
        "days": 
        [ 
            {
            "day-name": "push/pull/legs/cardio/rest",
            "day-number": 1,
            "suggested-calorie-intake": 1500
            "workouts": 
                [
                {"name": "workout name",
                "sets": 3,
                "reps": 12,
                "instructions": "pull weight"}
                ]
            }
        ]
    }
""")
    return prompt