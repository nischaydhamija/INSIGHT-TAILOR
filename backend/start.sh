#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
