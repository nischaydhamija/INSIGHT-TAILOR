from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="InsightTailor API", description="AI-Powered Report & Email Summarizer")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

# Request model for the summarize endpoint
class SummarizeRequest(BaseModel):
    role: str
    text: str

# Response model for the summarize endpoint
class SummarizeResponse(BaseModel):
    summary: str
    role: str

# Role-specific prompts for better summarization
ROLE_PROMPTS = {
    "product_manager": """You are a Product Manager. Summarize this report/email focusing on:
    - Key business metrics and KPIs
    - Product features and user feedback
    - Market opportunities and competitive insights
    - Action items and strategic decisions
    Keep it concise and business-focused.""",
    
    "engineer": """You are a Software Engineer. Summarize this report/email focusing on:
    - Technical requirements and specifications
    - System architecture and implementation details
    - Performance metrics and technical challenges
    - Bug reports and technical action items
    Keep it technical and implementation-focused.""",
    
    "analyst": """You are a Data Analyst. Summarize this report/email focusing on:
    - Data insights and statistical findings
    - Trends, patterns, and correlations
    - Methodology and data quality considerations
    - Recommendations based on data analysis
    Keep it analytical and data-driven."""
}

@app.get("/")
async def root():
    return {"message": "InsightTailor API is running!", "status": "healthy"}

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize_text(request: SummarizeRequest):
    try:
        # Validate inputs
        if not request.role or not request.text:
            raise HTTPException(status_code=400, detail="Role and text are required")
        
        if request.role not in ROLE_PROMPTS:
            raise HTTPException(status_code=400, detail="Invalid role. Must be one of: product_manager, engineer, analyst")
        
        if len(request.text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Text must be at least 10 characters long")
        
        # Check if OpenAI API key is configured
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Get role-specific prompt
        role_prompt = ROLE_PROMPTS[request.role]
        
        # Call OpenAI API using the older syntax that works with current version
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": role_prompt},
                {"role": "user", "content": f"Please summarize the following text:\n\n{request.text}"}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        # Extract the summary from the response
        summary = response.choices[0].message.content.strip()
        
        return SummarizeResponse(summary=summary, role=request.role)
        
    except Exception as e:
        # Handle OpenAI specific errors
        if "authentication" in str(e).lower():
            raise HTTPException(status_code=401, detail="Invalid OpenAI API key")
        elif "rate limit" in str(e).lower():
            raise HTTPException(status_code=429, detail="OpenAI API rate limit exceeded")
        else:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
