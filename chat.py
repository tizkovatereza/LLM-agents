import openai
import os
from dotenv import load_dotenv # Importing function dotenv


# Set up OpenAI API key

#Loading env variables from .env file
load_dotenv()


#HERE WILL BE THE MESSAGES VARIABLE, AND THE LOOP THAT WILL APPEND NEW MESSAGES TO IT.



openai.api_key = os.environ["OPENAI_API_KEY"]

#context = [{"role": "system", "content": "You are a helpful assistant."}, 
            {"role": "user", "content": "Who won the world series in 2020?"}, #Few shot example
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},]

# Define function to send user input to GPT-4 and get response

while True:             # Infinite loop
    user_input = input("Enter some text: ")
    response = openai.ChatCompletion.create(       # Response is a dictionary
        model="gpt-3.5-turbo",
        messages=[                                          # Messages is a list of dictionaries
            {"role": "system", "content": "You are a helpful assistant."}, 
            {"role": "user", "content": "Who won the world series in 2020?"}, #Few shot example
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},

            {"role": "user", "content": user_input}
        ]
    )

    context.append(user_input)
    choice = response["choices"][0]
    
    #content = choice["message"]["content"]
    # musis do messages parameteru toho OpenAI callu dat tu promennou context, co jsi vytvorial
    # ted to nedavas nikam a musis tam davat i odpovedi od LLM
    # a musis tam appendovat veci ve spravnem dictionary formatu, ted tam appendujes jen string
    


    # print(response)
    print(content) # VALUES in a dictionary can be accessed by passing the associated KEY NAME in a dictionary[key] syntax



#TBD: Append to the messages list of messages.