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
    } catch (err) {
      setSummary('Error: ' + ((err as Error).message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">👔 Choose Your Role</h1>

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
        <p className="mt-4">
          ✅ You selected: <strong>{role}</strong>
        </p>
      )}
      
      {/* 📝 Textarea for pasting the email or report */}
      <textarea
        className="mt-4 p-2 border rounded w-full h-40"
        placeholder="Paste your email/report here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {/* 👀 Live preview of typed text */}
      {text && (
        <p className="mt-4 text-gray-700">
          You typed: <strong>{text}</strong>
        </p>
      )}

      {/* 🧠 Show summary result */}
      {summary && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}

export default App