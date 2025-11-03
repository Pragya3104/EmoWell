import React, { useState } from "react";
import { apiClient } from "../api/apiClient";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { supabase } from "../lib/SupabaseClient";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const { data } = await supabase.auth.getUser();
  const user_id = data.user?.id || "guest";

  const userMsg = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await apiClient.post("/chat", { user_id, message: input });
    const botMsg = { sender: "bot", text: res.data.reply };
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error("Chat API error:", err);
  }
};



  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <div className="flex flex-col flex-1 p-6 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-4 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="flex items-center gap-2 p-4 border-t bg-white shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
