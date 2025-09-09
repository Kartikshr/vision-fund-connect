const GEMINI_API_KEY = "AIzaSyAL2-SMsbV4m_Ztt2dwe8_lQSx9bTQ1cKU";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateAIResponse = async (prompt: string, userType: "investor" | "founder"): Promise<string> => {
  try {
    const contextualPrompt = `You are an AI assistant for InnoVest, a platform connecting investors and founders. 
    The user is a ${userType}. 
    ${userType === "investor" 
      ? "Help them with investment opportunities, due diligence, portfolio management, and market insights." 
      : "Help them with fundraising strategies, pitch improvements, investor matching, and business development."
    }
    
    User question: ${prompt}
    
    Provide a helpful, concise response (max 200 words) that's specific to their role as a ${userType}.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: contextualPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};