import React, { useRef, useState } from "react";

interface Props { onStop: (file: File) => void; }

const VoiceRecorder: React.FC<Props> = ({ onStop }) => {
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [recording, setRecording] = useState(false);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRef.current = mr;
    chunksRef.current = [];
    mr.ondataavailable = (e) => chunksRef.current.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], `recording_${Date.now()}.webm`, { type: "audio/webm" });
      onStop(file);
    };
    mr.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  return (
    <button onClick={() => (recording ? stop() : start())} className={`px-4 py-2 rounded-full ${recording ? "bg-red-500 text-white" : "bg-gray-100"}`}>
      {recording ? "Stop" : "Record"}
    </button>
  );
};

export default VoiceRecorder;
