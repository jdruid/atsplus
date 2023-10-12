# HTML + JavaScript + NodeJS + Azure OpenAI ChatGPT #

First off this is my first repo let along code project in close to 7 years. This was for an internal learning/hackathon and uses the JS Client Libary for Azure OpenAI ChatGPT to be called from an HTML/JS page.

## Installation ##

1. Clone repo
2. Create Azure OpenAI service and deploy your model https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal
3. Update .env with your API key, model and URL.
4. Chat away

## Usage ##

**ATS Plus**

This project was to prove out sending a prebuilt prompt to the LLM to get a response and then the user will interact with the LLM accordingly.

The first few functions are prompt guiding. Looking up information (hard coded for now), having the user select the information, providing a little more prompt guidance on what the issue is, and then sending the built prompt to the LLM.

The first few functions in the index.js file are just building the "prompt" that will be sent to the API. The last function does the work.

*index.js* - sendMessage() takes the prompt and issues a POST and waits for the results

*server.js* - with the POST to response it calls 

    openai.createChatCompletion

More info on this is here https://learn.microsoft.com/en-us/javascript/api/overview/azure/openai-readme?view=azure-node-preview

## History ##

None at this time

## Credits ##

Joshua Drew
Microsoft
@jdruid

## License ##

MIT License

Copyright (c) 2023 [JDRUID]

## DISCLAIMER: ##

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.