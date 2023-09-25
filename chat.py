import openai
import os
from dotenv import load_dotenv

# Set up OpenAI API key
load_dotenv()

openai.api_key = os.environ["OPENAI_API_KEY"]

# Initialize the messages variable with initial context
messages = [
    {"role": "system", "content": "You are a helpful assistant."}
]

# Define function to send user input to GPT-4 and get response. Make it infinite loop with the condition "True."
while True:
    user_input = input("Enter some text: ")

    # Append user's message to the messages list
    messages.append({"role": "user", "content": user_input})

    # Send the messages list to the API. The "response" is something made by OpenAI that we don't see here. It contains "choices" list that we will use later in the code.
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages  # Use the updated messages list
    )
  

    #Pick a "choices" list from the response and then pick the first item from that list. 
    choice = response["choices"][0]
    content = choice["message"]["content"]

    # Append also the model's response to the messages list.
    messages.append({"role": "assistant", "content": content})

    print(content)


 
 #Additional comments

 #RESPONSE

 #If I print(response), I see why exactly I had to pick "choices" list from response, and "content" from the first item of that list.


 #{
 # "id": "chatcmpl-82dWT50G2vwpXSIXwavYN3PJoWAfH",
 # "object": "chat.completion",
 # "created": 1695639273,
 # "model": "gpt-3.5-turbo-0613",
 # "choices": [
 #   {
 #     "index": 0,
 #     "message": {
 #       "role": "assistant",
 #       "content": "Hello! How can I assist you today?"
 #     },
 #     "finish_reason": "stop"
 #   }
 # ],
 # "usage": {
 #   "prompt_tokens": 19,
 #   "completion_tokens": 9,
 #   "total_tokens": 28
 # }
#}
