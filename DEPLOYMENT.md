# Deployment Instructions

## Backend Deployment (Railway.app)

### Step 1: Sign up for Railway
1. Go to [Railway.app](https://railway.app/)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### Step 2: Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your `INSIGHT-TAILOR` repository
3. Choose the `backend` folder as the root directory
4. Railway will automatically detect it's a Python app

### Step 3: Add Environment Variables
In Railway dashboard:
1. Go to your project → Variables tab
2. Add: `OPENAI_API_KEY` = `your_openai_api_key_here`
3. Add: `PORT` = `8000`

### Step 4: Get Your Backend URL
- Railway will give you a URL like: `https://your-app-name.railway.app`
- Copy this URL

## Alternative: Deploy to Render

### Step 1: Sign up for Render
1. Go to [Render.com](https://render.com/)
2. Sign up with your GitHub account

### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Set Root Directory: `backend`
4. Set Build Command: `pip install -r requirements.txt`
5. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Add Environment Variables
1. Go to Environment tab
2. Add: `OPENAI_API_KEY` = `your_openai_api_key_here`

## Update Frontend

Once you have your backend URL, update the frontend:

1. Create a `.env` file in frontend folder:
```
VITE_API_URL=https://your-backend-url.railway.app
```

2. Rebuild and redeploy:
```bash
cd frontend
npm run build
npm run deploy
```

Your app will then be fully functional!
