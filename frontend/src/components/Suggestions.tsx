import React from "react";

const Suggestions: React.FC<{ mood: string }> = ({ mood }) => {
  const tips = {
    positive: ["Keep this energy — write down three wins today.", "Share the joy with a friend."],
    neutral: ["Try a 5-minute breathing exercise.", "Go for a short walk."],
    negative: ["Take three deep breaths slowly.", "If it helps, write this feeling down."],
  } as Record<string, string[]>;

  const list = tips[mood] ?? tips.neutral;

  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-3xl mt-4">
      <h3 className="font-semibold mb-2">Suggestions</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        {list.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
};

export default Suggestions;
