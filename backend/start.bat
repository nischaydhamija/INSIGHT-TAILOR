@echo off
echo Starting InsightTailor Backend...

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Load environment variables from .env file if it exists
if exist ".env" (
    echo Loading environment variables...
    for /f "delims=" %%x in (.env) do (set "%%x")
)

REM Start the server
echo Starting FastAPI server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause
