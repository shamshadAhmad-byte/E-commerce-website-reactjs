import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../contextStore/ShopContext";
function ClotheWarpingDisplay({ personId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { url, token } = useContext(ShopContext);
  const handleImage = async () => {
    if (!personId) {
      alert("Select Person and clothe image if You are missing.");
      return;
    }
    try {
      const response = await axios.post(
        `${url}/web/camera/ai-model`,
        { personId },
        { headers: { token }, responseType: "arraybuffer" }
      );
      console.log(response);
      // Convert buffer → base64
      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageSrc = `data:image/png;base64,${base64String}`;
      setSelectedImage(imageSrc);
    } catch (error) {
      console.log("AI Model error:", error);
    }
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center border-l border-gray-300 pl-6">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        🖼️ Image Preview
      </h3>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full max-w-sm rounded-xl shadow-lg object-cover m-"
        />
      ) : (
        <p className="text-gray-500 text-center">
          Select an image to preview...
        </p>
      )}
      <button
        className="mt-4 px-4 py-2 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
        onClick={handleImage}
      >
        Output Image
      </button>
    </div>
  );
}
export default ClotheWarpingDisplay;
