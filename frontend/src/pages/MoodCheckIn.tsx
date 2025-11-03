import React, { useState } from "react";
import NavBar from "../components/NavBar";

const MoodCheckIn: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

const handleMoodSubmit = async () => {
  // Basic validation using local state variables
  if (value === null && note.trim() === "") return alert("Please select or write something!");

  try {
    // Simulate saving (replace with real API or supabase calls if available)
    setStatus("Saving...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("Mood saved successfully!");
    setValue(null);
    setNote("");
  } catch (err) {
    console.error("Mood save error:", err);
    setStatus("Error saving mood");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Daily Mood Check-In</h2>
        <div className="bg-white p-6 rounded shadow mb-4">
          <div className="flex gap-3">
            {[1,2,3,4,5].map(v => (
              <button key={v} onClick={() => setValue(v)} className={`w-12 h-12 rounded-full ${value===v ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>{v}</button>
            ))}
          </div>
          <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full border rounded mt-3 p-2" placeholder="Optional note..." />
          <div className="mt-3 flex gap-3">
            <button onClick={handleMoodSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
            <div className="text-sm text-gray-600 self-center">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
  };

export default MoodCheckIn;
