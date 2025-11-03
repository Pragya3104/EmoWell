// src/components/ChatBox.tsx
import React, { useState, useEffect, useRef } from "react";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatBoxProps {
  onSendMessage?: (message: string) => void;
  messages?: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, messages = [] }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSendMessage?.(text);
    setInput("");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden h-[80vh]">
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center border-t border-gray-200 p-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
