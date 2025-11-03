import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow w-[380px]">
        <h2 className="text-xl font-semibold mb-4">Welcome back</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="text-red-500 text-sm">{err}</div>}
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
        </form>
        <div className="text-sm text-center mt-3">
          Don't have an account? <a className="text-indigo-600 cursor-pointer" onClick={()=>navigate("/signup")}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
