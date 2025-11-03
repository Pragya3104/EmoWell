import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="w-full bg-white drop-shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="text-2xl">🧠</div>
          <div className="font-semibold text-lg">EmoWell</div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="text-sm hover:underline">Home</button>
          <button onClick={() => navigate("/chat")} className="text-sm hover:underline">Chat</button>
          <button onClick={() => navigate("/mood")} className="text-sm hover:underline">Mood</button>
          <button onClick={() => navigate("/checkin")} className="text-sm hover:underline">Check-in</button>
          <button onClick={logout} className="bg-indigo-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
