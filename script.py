# import system library
import sys
from google import genai
import os
from dotenv import load_dotenv

# take passed variable values 
code = str(sys.argv[1])
language = str(sys.argv[2])
#print(code)

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_TOKEN"))


prompt = f'''<INSTRUCTIONS> \n 
You are a senior software engineer and expert code reviewer. \n
Your task is to analyze the following code written in {language} for any bugs, errors, or logical issues. \n
Be thorough and explain any issues you find. \n
List each issue you find in the code. \n
For each issue provide a brief title, the affected line number(s), and an explanation. \n
If possible, suggest a fix. \n
If the code is correct, say there are no significant issues. \n  
The code is as follows: \n 
<CODE> \n
{code}'''


response = client.models.generate_content(
    model="gemini-2.0-flash", contents=prompt
)

print(response.text)
