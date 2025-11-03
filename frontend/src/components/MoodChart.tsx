import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);

interface MoodChartProps {
  currentMood: string;
}

const MoodChart: React.FC<MoodChartProps> = ({ currentMood }) => {
  const [moodData, setMoodData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const value = currentMood === "positive" ? 3 : currentMood === "neutral" ? 2 : 1;
    setMoodData((prev) => [...prev.slice(-6), value]);
    setLabels((prev) => [...prev.slice(-6), `Day ${prev.length + 1}`]);
  }, [currentMood]);

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Trend",
        data: moodData,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139,92,246,0.3)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Mood Trends</h3>
      <Line data={data} />
    </div>
  );
};

export default MoodChart;
