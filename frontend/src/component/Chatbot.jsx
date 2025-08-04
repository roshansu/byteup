"use client"
import { useState } from "react"
import { GoogleGenAI } from "@google/genai"
const apiKey = import.meta.env.VITE_API_KEY

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }


  const ai = new GoogleGenAI({apiKey: apiKey});
    let history = []

    async function main() {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction:
      `You are an AI assistant for a student-led coding platform ByteUP at Shobhit University. Your primary role is to guide CS students by answering their questions related to computer science topics, programming, career development, mentorship, and project collaboration and dont need to answer in long .

Behave as a helpful, friendly, and technically accurate assistant. When responding:

- Use clear and concise explanations.
- Support learning by giving examples when needed.
- Encourage students to explore mentorship or community features on the platform.
- If a question is not technical (e.g., about registration, events, platform use), answer politely and guide them accordingly.
- Keep responses student-friendly and motivational.
- Do not provide personal opinions, false information, or speculate beyond your knowledge.

the process of becoming member or mentor is:
- first user need to register in become a member or mentor in home page then admin will check 
if the user is elligible or not. user will get response via email within 24 hours. 

You are aware that students can:
- Join as members and get mentored in specific subjects or domains.
- Ask technical doubts and get community support.
- Work on coding projects with peers.
- Improve their coding skills through events and resources.
founded by:
-roshan a 3rd year BCA student at shobhit university

Your tone should be approachable, respectful, and enthusiastic about helping students grow in tech.
`,
    },
  });
  history.push({
        role: "model",
         parts: [{ text:response.text }],
    })
  return response.text
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

      history.push({
        role: "user",
         parts: [{ text:input }],
    })

    const response = await main()
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, aiMessage])

      setIsLoading(false)
  }

  return (
    <>
      {/* Chatbot Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={toggleChat}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-white hover:bg-gray-50 border-2 border-gray-200"
          }`}
        >
          {isOpen ? (
            <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:w-96 h-[500px] sm:h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 transform z-40 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-gray-200">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-3 sm:p-4 h-72 sm:h-80 overflow-y-auto bg-gray-50 overscroll-contain">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-sm">Hi! I'm your AI assistant. How can I help you today?</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`mb-3 sm:mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block max-w-[280px] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gray-800 text-white rounded-br-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
