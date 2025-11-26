"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpIcon, ReloadIcon, TrashIcon, CopyIcon } from "@radix-ui/react-icons"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface MoodData {
  mood: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [moods, setMoods] = useState<MoodData[]>([])
  const [selectedMood, setSelectedMood] = useState<string>("neutral")
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const moodOptions = ["😊 Happy", "😔 Sad", "😤 Frustrated", "😌 Calm", "😰 Anxious", "😐 Neutral"]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setMoods([...moods, { mood, timestamp: new Date() }])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let assistantMessage = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        assistantMessage += chunk
        setMessages(prev => {
          const newMessages = [...prev]
          if (newMessages[newMessages.length - 1]?.role === "assistant") {
            newMessages[newMessages.length - 1].content = assistantMessage
          } else {
            newMessages.push({ role: "assistant", content: assistantMessage, timestamp: new Date() })
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, an error occurred. Please try again.", timestamp: new Date() }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const clearChat = () => {
    if (confirm("Are you sure you want to clear the chat?")) {
      setMessages([])
    }
  }

  const downloadChat = () => {
    const chatText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(chatText))
    element.setAttribute("download", `chat_${new Date().toISOString()}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Mood Tracker */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm font-semibold text-gray-700 mb-2">How are you feeling?</p>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map(mood => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedMood === mood
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400"
              }`}
            >
              {mood}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200/50 scrollbar-track-transparent mb-2 space-y-3">
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-center text-gray-400"
            >
              <div>
                <p className="text-lg font-semibold">Start a conversation</p>
                <p className="text-sm">I'm here to listen and support you 💚</p>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: message.role === "user" ? 50 : -50 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 relative group ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                      : "bg-gradient-to-r from-blue-100 to-blue-50 text-gray-800 shadow-sm border border-blue-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className={`text-xs ${message.role === "user" ? "text-green-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.role === "assistant" && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => copyToClipboard(message.content)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <CopyIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-blue-100 rounded-lg p-4 flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                  className="w-3 h-3 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2 justify-end mb-2">
        {messages.length > 0 && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadChat}
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
              title="Download chat"
            >
              ⬇️ Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearChat}
              className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center gap-1"
            >
              <TrashIcon className="w-4 h-4" /> Clear
            </motion.button>
          </>
        )}
      </div>

      {/* Sticky Input Area */}
      <div className="sticky bottom-0 bg-background pt-2 border-t border-green-200">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts here... (Shift+Enter for new line)"
            className="pr-12 bg-white/90 backdrop-blur-sm border-green-200 rounded-lg resize-none transition-all duration-200 focus:ring-2 focus:ring-green-400"
            rows={Math.min(input.split("\n").length + 1, 4)}
            maxLength={500}
            aria-label="Type your message"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {500 - input.length}
            </span>
            <Button
              type="submit"
              size="icon"
              className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-all"
              disabled={isLoading || input.trim() === ""}
              aria-label="Send message"
            >
              {isLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Copy Feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            ✓ Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}