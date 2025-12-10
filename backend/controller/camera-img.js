
import fs from "fs";
import path from "path";
import {GoogleGenAI} from "@google/genai"

const aiModel = async (req, res) => {
  try {
    const { personBase64, clotheBase64 } = req.body;
    if (personBase64 == undefined || clotheBase64 == undefined) {
      return res.status(400).json({ error: "personBase64 and clotheBase64 are required" });
    }
    const prompt = [
      { text: "warp clothe on person image" },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: personBase64,
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: clotheBase64,
        },
      },
    ];

    const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    const candidate = response?.candidates?.[0];
    if (!candidate) return res.status(500).json({ error: "AI model returned no candidates" });

    const parts = candidate?.content?.parts || [];
    let foundInline = null;
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        foundInline = part.inlineData;
        break;
      }
    }

    if (!foundInline) return res.status(500).json({ error: "AI model did not return image data" });

    // Return a data-URI so the frontend can set <img src="data:..."> directly
    const dataUri = `data:${foundInline.mimeType || "image/jpeg"};base64,${foundInline.data}`;
    return res.status(200).json({ success: true, message: "Try-on successful", image: foundInline.data, mimeType: foundInline.mimeType, dataUri });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Try-on failed", details: err?.message || String(err) });
  }
};
export { aiModel };