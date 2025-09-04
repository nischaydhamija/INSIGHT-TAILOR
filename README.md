# InsightTailor 📌

## AI-Powered Report & Email Summarizer

A full-stack web application that provides role-specific summaries of reports and emails using AI.

### 🚀 Live Demo
- **Frontend**: [View Live App](https://nischaydhamija.github.io/INSIGHT-TAILOR/)
- **Backend API**: Deployed separately (see deployment section)

### ✨ Features
- **Role-Based Summarization**: Choose from Product Manager, Engineer, or Analyst perspectives
- **AI-Powered**: Uses OpenAI GPT-3.5-turbo for intelligent summarization
- **Real-time Processing**: Instant feedback with loading states
- **Responsive Design**: Built with TailwindCSS for all devices
- **Error Handling**: Comprehensive error handling and validation

### 🛠️ Tech Stack
- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: FastAPI + Python
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Deployment**: GitHub Pages (Frontend) + Cloud hosting (Backend)

### 🎯 How It Works
1. **Select Your Role**: Choose Product Manager, Engineer, or Analyst
2. **Paste Content**: Add any report, email, or document text
3. **Get Summary**: Receive a tailored summary based on your selected role
4. **Role-Specific Focus**:
   - **Product Manager**: Business metrics, KPIs, strategic insights
   - **Engineer**: Technical specs, implementation details, performance
   - **Analyst**: Data insights, trends, analytical recommendations

### 🏃‍♂️ Quick Start

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
# Set OPENAI_API_KEY in .env file
uvicorn main:app --reload
```

### 📦 Project Structure
```
InsightTailor/
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── App.tsx    # Main application component
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── backend/           # FastAPI Python app
│   ├── main.py        # API endpoints and OpenAI integration
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

### 🔧 Environment Setup

Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 🚀 Deployment

#### Frontend (GitHub Pages)
```bash
npm run build
npm run deploy
```

#### Backend (Railway/Render/Heroku)
The backend includes CORS configuration and is ready for cloud deployment.

### 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### 📄 License
MIT License - see LICENSE file for details

### 🙋‍♂️ Support
For issues and questions, please open a GitHub issue.

---
**Built with ❤️ by [Nischay Dhamija](https://github.com/nischaydhamija)**
