# AI Chatbot Implementation

## Overview
Your Modern Homecare website now has a fully functional AI chatbot powered by OpenAI's GPT-3.5-turbo API.

## Features
- Real-time chat interface with OpenAI GPT
- Pre-configured with Modern Homecare company information
- Conversation history management
- Clean, responsive UI
- Ready for knowledge base integration

## Testing the Chatbot

### Quick Test (Open HTML directly)
1. Simply open `index.html` in your web browser
2. Click the chat button (💬) in the bottom-right corner
3. Start chatting!

### Testing with a Local Server (Recommended)
If you encounter CORS issues, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# OR using Python 2
python -m SimpleHTTPServer 8000

# OR using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## Adding Your Knowledge Base

When you're ready to add your knowledge base:

1. Open `update-knowledge-base.js`
2. Replace the example content in the `knowledgeBase` variable with your content
3. Run: `node update-knowledge-base.js`

Your knowledge base will be automatically integrated into the chatbot's system prompt.

## Current Configuration

- **Model**: GPT-3.5-turbo
- **Max Tokens**: 500 per response
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Conversation Memory**: Last 20 messages + system prompt

## Security Note

⚠️ **Important**: This implementation stores the API key in the client-side code. This is ONLY suitable for demos and testing. For production use, you should:

1. Move the API key to a backend server
2. Create an API endpoint that proxies requests to OpenAI
3. Never expose API keys in client-side code

## Files Modified/Created

- `assets/js/chat.js` - Updated with OpenAI integration
- `update-knowledge-base.js` - Helper script for adding knowledge base
- `CHATBOT-README.md` - This file

## Example Questions to Test

- "What services do you offer?"
- "How can I contact Modern Homecare?"
- "Do you provide oncology support?"
- "What is your phone number?"
- "Tell me about your therapy services"

## Troubleshooting

**Chatbot not responding:**
- Check browser console for errors (F12)
- Verify API key is valid
- Check internet connection

**CORS errors:**
- Use a local server instead of opening the HTML file directly

**Rate limit errors:**
- Wait a few moments between requests
- OpenAI has rate limits on free tier accounts
