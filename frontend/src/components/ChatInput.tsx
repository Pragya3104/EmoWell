import React, { useState } from "react";
import { Mic } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg border border-gray-200">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Mic size={20} className="text-gray-600" />
      </button>
      <button
        onClick={handleSend}
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
