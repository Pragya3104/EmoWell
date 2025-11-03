import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatItem { id: string; title: string; lastMessage?: string; }

const SideBar: React.FC<{ onSelectChat?: (id: string) => void }> = ({ onSelectChat }) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // for demo: fetch chat list from Supabase table "chat_sessions" or from backend
    async function load() {
      // Example: fetch from backend or supabase
      // Replace with your own DB call. Here we use static demo data:
      setChats([
        { id: "c1", title: "General check-in", lastMessage: "You: I'm anxious" },
        { id: "c2", title: "Workout mood", lastMessage: "Bot: That's great!" }
      ]);
    }
    load();
  }, []);

  return (
    <aside className="w-72 bg-white/80 border-r p-4 flex flex-col gap-4 h-screen overflow-y-auto">
      <div className="flex flex-col">
        <button
          onClick={() => navigate("/chat")}
          className="bg-indigo-600 text-white py-2 rounded mb-3"
        >
          + New Chat
        </button>
        <h3 className="text-sm text-gray-600 mb-2">Your conversations</h3>
        <div className="flex flex-col gap-2">
          {chats.map(c => (
            <div key={c.id} onClick={() => onSelectChat?.(c.id)} className="p-2 rounded hover:bg-gray-100 cursor-pointer">
              <div className="font-medium">{c.title}</div>
              <div className="text-xs text-gray-500">{c.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
