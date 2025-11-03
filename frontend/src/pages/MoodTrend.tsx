import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import NavBar from "../components/NavBar";

const MoodTrend: React.FC = () => {
  const [data, setData] = useState<{ date: string; mood: number }[]>([
    { date: "Mon", mood: 3 },
    { date: "Tue", mood: 2 },
    { date: "Wed", mood: 4 },
  ]);

  useEffect(() => {
  const fetchMoods = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    try {
      const res = await apiClient.get(`/mood/history/${user.id}`);
      const data = res.data;

      setData(
        data.map((m: any) => ({
          date: new Date(m.created_at).toLocaleDateString(),
          mood: m.mood,
        }))
      );
    } catch (err) {
      console.error("Error fetching mood history:", err);
    }
  };
  fetchMoods();
}, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Mood Trends</h2>
        <div className="bg-white p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <CartesianGrid stroke="#eee" />
              <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default MoodTrend;
