import { type NextRequest, NextResponse } from "next/server"

// Mock Gemini API integration
export async function POST(request: NextRequest) {
  try {
    const { message, type = "text" } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock AI response based on message content
    let response = ""

    if (type === "image") {
      response =
        "I can analyze your crop image. The plants appear healthy overall, but I notice some yellowing on the lower leaves which could indicate nitrogen deficiency or natural senescence. I recommend a soil test to confirm nutrient levels."
    } else {
      // Text-based responses
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("irrigation") || lowerMessage.includes("water")) {
        response =
          "Based on your soil moisture data and weather forecast, I recommend irrigating your wheat field tomorrow morning at 6 AM. The soil moisture is currently at 18%, which is below the optimal range of 25-30% for wheat."
      } else if (lowerMessage.includes("pest") || lowerMessage.includes("disease")) {
        response =
          "For organic pest control, I recommend: 1) Spray neem oil solution (2-3ml per liter) in the evening, 2) Introduce beneficial insects like ladybugs, 3) Remove affected plant parts. Monitor daily and repeat if needed."
      } else if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrient")) {
        response =
          "Your soil analysis shows potential nutrient deficiency. I recommend applying organic compost (2-3 tons per hectare) mixed with vermicompost. For immediate results, use liquid organic fertilizer during early morning or evening."
      } else {
        response =
          "Thank you for your question. Based on your farm profile and current conditions, I can provide more targeted advice if you share specific details about your crops, soil conditions, or the challenges you're facing."
      }
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      hasAudio: true,
    })
  } catch (error) {
    console.error("Advisory API error:", error)
    return NextResponse.json({ error: "Failed to process advisory request" }, { status: 500 })
  }
}
