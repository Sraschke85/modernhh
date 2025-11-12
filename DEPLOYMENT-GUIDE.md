# Deployment Guide - Modern Homecare Chatbot

## Overview
The chatbot now uses a secure backend API to handle OpenAI requests. The API key is stored as an environment variable, not in the code.

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Or simply push to GitHub and import the project at https://vercel.com

3. **Add Environment Variable**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add a new variable:
     - **Name**: `GPTAPI`
     - **Value**: Your OpenAI API key (sk-proj-...)
     - **Environment**: Production, Preview, Development (select all)
   - Click Save

4. **Redeploy**:
   - Vercel will automatically redeploy when you push to GitHub
   - Or manually redeploy from the Vercel dashboard

### Option 2: GitHub Pages + Netlify Functions

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add secure chatbot with backend API"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Environment Variables**:
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add:
     - **Key**: `GPTAPI`
     - **Value**: Your OpenAI API key

4. **Deploy**: Netlify will automatically deploy your site

### Option 3: Local Development with Environment Variable

For local testing:

1. **Create `.env.local` file**:
   ```
   GPTAPI=sk-proj-your-api-key-here
   ```

2. **Run with a local server that supports environment variables**:
   ```bash
   # Install dotenv-cli if needed
   npm install -g dotenv-cli

   # Run with environment variables
   dotenv -e .env.local -- npx http-server -p 8000
   ```

## GitHub Environment Setup

If you want to use GitHub Secrets (for GitHub Actions deployment):

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**:
   - **Name**: `GPTAPI`
   - **Secret**: Your OpenAI API key
4. **Create a GitHub Actions workflow** (see `.github/workflows/deploy.yml`)

## Testing the Deployment

1. Visit your deployed site URL
2. Click the chat button (💬) in the bottom-right corner
3. Send a test message
4. The chatbot should respond using the secure API

## Security Notes

✅ **Secure**: API key is stored as environment variable on the server
✅ **No exposure**: API key never sent to client browser
✅ **Protected**: Backend API validates requests

## Troubleshooting

**Error: "Server configuration error"**
- Make sure the environment variable `GPTAPI` is set correctly
- Check the spelling (case-sensitive)
- Redeploy after adding the environment variable

**Error: "API error 429"**
- Your OpenAI API key needs billing enabled
- Check your OpenAI account at https://platform.openai.com/

**Chatbot not loading**
- Check browser console for errors (F12)
- Verify the API endpoint URL is correct
- Check deployment logs for server errors

## Files Structure

```
modernhh/
├── api/
│   └── chat.js          # Backend API endpoint
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── chat.js      # Frontend chatbot code
├── index.html
├── package.json
├── vercel.json          # Vercel configuration
├── .gitignore
└── DEPLOYMENT-GUIDE.md  # This file
```
