import React,{ useRef, useState } from "react";

export default function PoseCamera() {
  const videoRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [status, setStatus] = useState({ msg: "Click Start Camera to begin", type: "info" });
  const [camera, setCamera] = useState(null);

  const startCamera = async () => {
    try {
      setStatus({ msg: "Starting camera...", type: "info" });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      videoRef.current.srcObject = stream;
      setIsRunning(true);
      setCamera(stream);
      setStatus({ msg: "Camera started successfully!", type: "success" });
    } catch (error) {
      console.error(error);
      setStatus({ msg: "Error accessing camera", type: "error" });
    }
  };

  const stopCamera = () => {
    if (camera) {
      camera.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsRunning(false);
    setStatus({ msg: "Camera stopped", type: "info" });
  };

  const captureImage = () => {
    if (!isRunning) {
      setStatus({ msg: "Camera not active", type: "error" });
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/png");
    setCapturedImages((prev) => [...prev, imgData]);
    setStatus({ msg: `Image captured! (${capturedImages.length + 1})`, type: "success" });
  };

  const downloadAll = () => {
    capturedImages.forEach((data, i) => {
      const a = document.createElement("a");
      a.href = data;
      a.download = `capture_${i + 1}.png`;
      a.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 p-6">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          📸 Camera Capture System
        </h1>

        {/* Video Section */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-[640px] h-[480px] object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <button
              onClick={startCamera}
              disabled={isRunning}
              className="px-5 py-2 rounded-full text-white font-semibold bg-green-500 hover:bg-green-600 transition"
            >
              Start
            </button>
            <button
              onClick={stopCamera}
              disabled={!isRunning}
              className="px-5 py-2 rounded-full text-white font-semibold bg-red-500 hover:bg-red-600 transition"
            >
              Stop
            </button>
            <button
              onClick={captureImage}
              disabled={!isRunning}
              className="px-5 py-2 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
            >
              Capture
            </button>
            <button
              onClick={downloadAll}
              disabled={capturedImages.length === 0}
              className="px-5 py-2 rounded-full text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
            >
              Download All
            </button>
          </div>

          {/* Status */}
          <div
            className={`mt-4 px-4 py-2 rounded-lg text-center font-medium ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : status.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {status.msg}
          </div>
        </div>

        {/* Captured Images */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">📷 Captured Images</h3>
          {capturedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {capturedImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`capture-${i}`}
                  className="rounded-lg shadow hover:scale-105 transition-transform"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No captures yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}