#  The openai library provides a Python interface for OpenAI API
import openai

# The os library in Python provides a way to interact with the operating system.
# It provides functions for accessing environment variables, working with files and directories, and executing system commands.
import os


#Importing JSON so I can use OpenAI's functions
import json

# Importing dotenv so I can use my API key from .env file
from dotenv import load_dotenv

# Set up OpenAI API key
load_dotenv()

openai.api_key = os.environ["OPENAI_API_KEY"]

# First defining a function, before we can make it available to the LLM
def run_python_code(code):
    """Run a python code that does the task"""
    print("Running python code ====")
    print(code)


# Initialize the messages variable with initial context
messages = [
    {"role": "system", "content": "You are a helpful senior programmer and you can complete tasks by running python code"},
    {"role": "assistant", "content": "Hello, I am a helpful senior programmer and I can complete tasks by running python code"},
    {"role": "user", "content": ""},
]

# Send available functions to the LLM
functions = [
        {
            "name": "run_python_code",
            "description": "Provide a python code that does the task",
             "parameters": {
                "type": "object",
                "properties": { 
                    "code": {
                        "type": "string",
                        "description": "The code that does the task",
                    },
                },          
                "required": ["code"],  
            },
        },
    ]
# When the LLM recognize that it should call a function, the "content" argument in the "choices" in "response" is set on null.
# In that situation, the arguments for function are:
# "arguments": "{\n  \"code\": \"def sum_two_numbers(a, b):\\n    return a + b\\n\\n# Test the function with example values\\nresult = sum_two_numbers(5, 3)\\nresult\"\n}"
# Now I need to get the output of the function

# Define function to send user input to GPT-4 and get response. Make it infinite loop with the condition "True."
while True:
    user_input = input("Enter some text: ")

    # Append user's message to the messages list
    messages.append({"role": "user", "content": user_input})

    # Send the messages list to the API. The "response" is something made by OpenAI that we don't see here. It contains "choices" list that we will use later in the code.
    #This is example of OpenAI API call:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,  # Use the updated messages list
        functions=functions,
        # function_call="auto",  # auto is default, but we'll be explicit
        # max_tokens=1024
    )
    
    print(response)
  

    #Pick a "choices" list from the response and then pick the first item from that list. 
    content = response["choices"][0]["message"]
    # I had to rewrite this to get correct think with the .get method from the message. 

    # If the response contains a function call, the variables below are created.
    if content.get("function_call"):   # The get() method is used to access the value of a key in a dictionary
        #The get is giving error, because I need to call it on dictionary object, instead of string object. Idk how to solve.
        
        # Call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "run_python_code": run_python_code,
        }  # Only one function in this example, but I may add more later.
        function_name = content["function_call"]["name"]   #This takes function call and name from the "message" in the response
        function_to_call = available_functions[function_name] #This picks the function to call
        function_args = json.loads(content["function_call"]["arguments"])
        function_response = function_to_call(
            code=function_args.get("code"),
        )
        # 2609 Adding also model's function response to the context
        messages.append(
                {
                    "role": "function",
                    "name": function_name,
                    "content": function_response,
                }
            )  # extend conversation with function response


    # Append also the model's response to the context (messages list).
    messages.append({"role": "assistant", "content": content})



    # second_response = openai.ChatCompletion.create(
    #         model="gpt-4",
    #         messages=messages,
    #     )  # get a new response from GPT where it can see the function response
    # print(second_response)

    print(content)


 

