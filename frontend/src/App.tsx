import { useState } from 'react'
import './App.css'

function App() {
  const [role, setRole] = useState(''); // ✅ React state to track selection
  const [text, setText] = useState('');
  const handleSummarize = () => {
  alert(`✅ You clicked summarize for the role: ${role}`);
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">👔 Choose Your Role</h1>

      <select
        className="p-2 rounded border bg-white"
        value={role}
        onChange={(e) => setRole(e.target.value)} // ✅ this updates the state
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
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={handleSummarize}
>
  Summarize
</button>

{/* 👀 Live preview of typed text */}
{text && (
  <p className="mt-4 text-gray-700">
    You typed: <strong>{text}</strong>
  </p>
)}

    </div>
  )
}

export default App