"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Mic, Camera, Volume2, User, Bot } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  hasAudio?: boolean
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, irrigation, and more. You can ask me questions via text, voice, or upload images for analysis.",
      timestamp: new Date(),
      hasAudio: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(input),
        timestamp: new Date(),
        hasAudio: true,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    // Mock AI responses based on query content
    if (query.toLowerCase().includes("irrigation") || query.toLowerCase().includes("water")) {
      return "Based on your soil moisture data and weather forecast, I recommend irrigating your wheat field tomorrow morning at 6 AM. The soil moisture is currently at 18%, which is below the optimal range of 25-30% for wheat. Apply approximately 25mm of water per hectare."
    }
    if (query.toLowerCase().includes("pest") || query.toLowerCase().includes("disease")) {
      return "I can see signs of potential aphid infestation. For organic treatment, I recommend: 1) Spray neem oil solution (2-3ml per liter) in the evening, 2) Introduce ladybugs as natural predators, 3) Remove affected leaves. Monitor daily and repeat treatment if needed."
    }
    if (query.toLowerCase().includes("fertilizer") || query.toLowerCase().includes("nutrient")) {
      return "Your soil analysis shows nitrogen deficiency. I recommend applying organic compost (2-3 tons per hectare) mixed with vermicompost. For immediate results, use liquid organic fertilizer (NPK 10:5:5) at 2ml per liter of water. Apply during early morning or evening."
    }
    return "Thank you for your question. Based on your farm profile and current conditions, I recommend consulting with local agricultural experts for the best practices specific to your region. I can provide more targeted advice if you share more details about your specific situation."
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle image upload and analysis
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `[Image uploaded: ${file.name}] Please analyze this image for any crop issues.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      // Simulate AI image analysis
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "I can see your crop image. The plants appear healthy overall, but I notice some yellowing on the lower leaves which could indicate nitrogen deficiency or natural senescence. The upper leaves look vibrant green. I recommend a soil test to confirm nutrient levels and consider organic nitrogen supplementation if needed.",
          timestamp: new Date(),
          hasAudio: true,
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 2000)
    }
  }

  const playAudio = (messageId: string) => {
    // Simulate text-to-speech
    console.log("Playing audio for message:", messageId)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-secondary" />
          Krishi-GPT Assistant
          <Badge variant="secondary" className="ml-auto">
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "ai" && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                  {message.hasAudio && message.type === "ai" && (
                    <Button variant="ghost" size="sm" onClick={() => playAudio(message.id)} className="h-6 w-6 p-0">
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <Textarea
            placeholder="Ask me anything about farming, crop management, pest control..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="min-h-[60px] resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mic className="w-4 h-4 mr-2" />
                Voice
              </Button>
              <Button variant="outline" size="sm" onClick={handleImageUpload}>
                <Camera className="w-4 h-4 mr-2" />
                Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
