# TERMINAL
# pip install e2b
# pip install openai

#############################################################################################################################################

# IMPORT PACKAGES

import e2b
from openai import OpenAI

client = OpenAI()

# We'll need these later
import asyncio
import json

load_dotenv()

# def of session variable
session: e2b.Session

#############################################################################################################################################

# PREPARE OPENAI FUNCTIONS

functions = [
  {
      "name": "exec_code",
      "description": "Executes the passed JavaScript code using Nodejs and returns the stdout and stderr.",
      "parameters": {
          "type": "object",
          "properties": {
              "code": {
                  "type": "string",
                  "description": "The JavaScript code to execute.",
              },
          },
          "required": ["code"],
      },
  }
]
 { 
      "name": "install_package", 
      "description": "Installs the passed npm package.", 
      "parameters": { 
          "type": "object", 
          "properties": { 
              "name": { 
                  "type": "string", 
                  "description": "The name of an npm package to install.", 
              }, 
          }, 
          "required": ["name"], 
      }, 
  } 


#############################################################################################################################################

# PARSE GPT RESPONSE


# long-running sessions
async def run_code(code: str): 
  global session
  # 1. First we need to write the code to a file.
  await session.filesystem.write("/home/user/index.js", code)
  # 2. Then execute the file with Node.
  proc = await session.process.start("node /home/user/index.js")
  # 3. Wait for the process to finish.
  out = await proc
  # 4. Return the stdout and stderr.
  return out.stdout, out.stderr

# long-running sessions 
async def install_package(package: str): 
  global session
  # 1. Install the package through starting the `npm` process
  proc = await session.process.start(f"npm install {package}")
  # 2. Wait for the process to finish.
  out = await proc
  #. 3. Return the stdout and stderr.
  return out.stdout, out.stderr

async def parse_gpt_response(response):
  message = response.choices[0].message
  if (func := message.get("function_call")):
    func_name = func["name"]
  
    # Get rid of newlines and leading/trailing spaces in the raw function arguments JSON string.
    # This sometimes help to avoid JSON parsing errors.
    args = func["arguments"].strip().replace("\n", "")
    # Parse the cleaned up JSON string.
    func_args = json.loads(args)
  
    # If the model is calling the exec_code function we defined in the `functions` variable, we want to save the `code` argument to a variable.
    if func_name == "exec_code":
      code = func_args["code"]
    # EXECUTE THE CODE USING E2B
      stdout, stderr = await run_code(code) 
      print(stdout) 
      print(stderr) 
    elif func_name == "install_package": 
      package_name = func_args["name"] 
      stdout, stderr = await install_package(package_name) 
      print(stdout) 
      print(stderr) 
    else:
      # The model didn't call a function, so we just print the message.
      content = message["content"]
      print(content)

#############################################################################################################################################

# MAKE CALLS TO GPT



async def main():
  session = await e2b.Session.create(id="Node") 
  response = client.chat.completions.create(model="gpt-4",
  messages=[
      {"role": "system", "content": "You are a senior developer that can code in JavaScript. Always produce valid JSON."},
      {"role": "user", "content": "Write hello world"}, # $HighlightLine
      {"role": "assistant", "content": "print(\"hello world\")", "name":"exec_code"}, # $HighlightLine
      {"role": "user", "content": "Generate first 100 fibonacci numbers"}, # $HighlightLine
  ],
  functions=functions)
  
  await parse_gpt_response(response)


asyncio.run(main())












