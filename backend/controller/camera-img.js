import { GoogleGenerativeAI } from "@google/generative-ai";

const aiModel = async (req, res) => {
  try {
    const { personBase64, clotheBase64 } = req.body;
    
    // Validate inputs
    if (!personBase64 || !clotheBase64) {
      return res.status(400).json({ 
        success: false,
        error: "Both personBase64 and clotheBase64 are required" 
      });
    }

    // Validate API key
    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY not found in environment variables");
      return res.status(500).json({ 
        success: false,
        error: "Server configuration error" 
      });
    }

    // Initialize Gemini AI for image generation
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "image/jpeg",
      }
    });

    // Build the prompt for virtual try-on
    const prompt = `Create a photorealistic virtual try-on image. Take the person from the first image and overlay the clothing item from the second image onto them. Ensure the clothing fits naturally on the person's body with proper proportions, lighting, shadows, and wrinkles. The result should look like the person is actually wearing the clothing item.`;
    
    const imageParts = [
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

    // Generate image using Gemini
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;

    // Parse response
    const candidate = response?.candidates?.[0];
    if (!candidate) {
      console.error("No candidates in AI response");
      return res.status(500).json({ 
        success: false,
        error: "AI model returned no results" 
      });
    }

    const parts = candidate?.content?.parts || [];
    let foundInline = null;
    
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        foundInline = part.inlineData;
        break;
      }
    }

    if (!foundInline) {
      console.error("No inline image data in response");
      return res.status(500).json({ 
        success: false,
        error: "AI model did not return image data" 
      });
    }

    // Return a data-URI so the frontend can set <img src="data:..."> directly
    const dataUri = `data:${foundInline.mimeType || "image/jpeg"};base64,${foundInline.data}`;
    
    return res.status(200).json({ 
      success: true, 
      message: "Virtual try-on completed successfully", 
      image: foundInline.data, 
      mimeType: foundInline.mimeType, 
      dataUri 
    });

  } catch (err) {
    console.error("AI Model Error:", err);
    return res.status(500).json({ 
      success: false,
      error: "Try-on failed", 
      details: err?.message || String(err) 
    });
  }
};
export { aiModel };