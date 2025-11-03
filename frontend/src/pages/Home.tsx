import React from "react";
import SideBar from "../components/SideBar";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to EmoWell</h1>
          <p className="text-gray-600 mb-6">Start a chat or check your mood trends.</p>
          <div className="space-x-3">
            <a href="/chat" className="bg-indigo-600 text-white px-4 py-2 rounded">Open Chat</a>
            <a href="/mood" className="border px-4 py-2 rounded">Mood Trends</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
