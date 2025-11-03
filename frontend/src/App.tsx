import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/SupabaseClient";

// Pages
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import MoodTrend from "./pages/MoodTrend";
import MoodCheckIn from "./pages/MoodCheckIn";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [session, setSession] = useState<any | null>(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={session ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={session ? <Navigate to="/" replace /> : <Signup />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={session ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/chat"
        element={session ? <ChatPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/mood"
        element={session ? <MoodTrend /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/checkin"
        element={session ? <MoodCheckIn /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
