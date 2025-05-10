# README

This is a code reviewer. Upon opening a file, click on the clipboard icon in the toolbar to the left of the screen. Click on the "Review Code" button to get a review of your code. 

The suggestions will be shown in the output tab of your terminal. Incorporate these changes as required. 

# README

This VScode extension is built using Node.js, Yeoman, and Python. 

To obtain Node.js, download the appropriate package from the website: https://nodejs.org/en/download.

To obtain Python, download the appropriate package from the website: https://www.python.org/downloads/.

To obtain Yeoman, run the following command (need to have Node.js to do this): 
```npx --package yo --package generator-code -- yo code```

In order to get the python dependencies required, run the command: 
```pip install -r requirements.txt```

In order to run this, you will need a Gemini API token. Create a .env file, and add the following line: 
GEMINI_TOKEN = "your_unique_token_here"
