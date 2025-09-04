import { useState } from 'react'

function App() {
  const [role, setRole] = useState(''); // ✅ React state to track selection
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!role || !text) {
      alert('Please select a role and enter some text.');
      return;
    }
    setLoading(true);
    setSummary('');
    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // Check if we're in production without a backend URL (demo mode)
      const isDemo = window.location.hostname === 'nischaydhamija.github.io' && !import.meta.env.VITE_API_URL;
      
      if (isDemo) {
        // Demo mode - simulate API response
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        const demoSummaries = {
          product_manager: `**Product Manager Summary:**
• Key business metrics show 25% user engagement increase
• New feature requests focus on mobile optimization
• Competitive analysis reveals market opportunity in AI integration
• Action items: Prioritize mobile UX improvements and explore AI partnerships`,
          engineer: `**Engineering Summary:**
• System performance improved by 40% after latest optimization
• Technical debt identified in authentication module
• API response times reduced from 200ms to 80ms average
• Action items: Refactor auth system and implement caching layer`,
          analyst: `**Data Analysis Summary:**
• User retention rate increased 15% month-over-month
• Conversion funnel shows 30% drop-off at checkout
• Geographic data reveals strong growth in Asia-Pacific region
• Recommendation: Optimize checkout process and expand APAC marketing`
        };
        setSummary(demoSummaries[role as keyof typeof demoSummaries] || 'Demo summary not available for this role.');
      } else {
        // Real API call
        const response = await fetch(`${apiUrl}/summarize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role, text }),
        });
        if (!response.ok) throw new Error('Failed to fetch summary');
        const data = await response.json();
        setSummary(data.summary || 'No summary returned.');
      }
    } catch (err) {
      if (window.location.hostname === 'nischaydhamija.github.io') {
        setSummary('🚀 **Demo Mode Active** - Backend deployment in progress. This is a simulated summary showing the app\'s capability. Connect your own OpenAI API key and deploy the backend to get real AI-powered summaries!');
      } else {
        setSummary('Error: ' + ((err as Error).message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  const isDemo = window.location.hostname === 'nischaydhamija.github.io' && !import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isDemo && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
          <p className="font-bold">🚀 Demo Mode</p>
          <p className="text-sm">This is a live demo with simulated AI responses. Deploy the backend with your OpenAI API key for real AI summarization!</p>
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-4">� InsightTailor - AI-Powered Summarizer</h1>
      <p className="text-gray-600 mb-6">Get role-specific summaries of reports and emails tailored to your perspective.</p>

      <h2 className="text-lg font-semibold mb-2">�👔 Choose Your Role</h2>
      <select
        className="p-2 rounded border bg-white"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select your role</option>
        <option value="product_manager">Product Manager</option>
        <option value="engineer">Engineer</option>
        <option value="analyst">Analyst</option>
      </select>

      {/* ✅ Show the selected role below */}
      {role && (
        <p className="mt-4 text-green-600">
          ✅ You selected: <strong>{role.replace('_', ' ').toUpperCase()}</strong>
        </p>
      )}
      
      {/* 📝 Textarea for pasting the email or report */}
      <h2 className="text-lg font-semibold mb-2 mt-6">📝 Paste Your Content</h2>
      <textarea
        className="mt-2 p-3 border rounded w-full h-40 resize-none"
        placeholder={isDemo 
          ? "Try pasting any text here! In demo mode, you'll get a simulated AI summary based on your selected role." 
          : "Paste your email, report, or any document here for AI-powered summarization..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 font-semibold"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? '🤖 Summarizing...' : '✨ Summarize'}
      </button>

      {/* 🧠 Show summary result */}
      {summary && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="font-bold text-lg mb-3 text-gray-800">📋 AI Summary</h2>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line">{summary}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App