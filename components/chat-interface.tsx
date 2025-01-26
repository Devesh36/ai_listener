"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "ai/react"
import { ArrowUpIcon, ReloadIcon } from "@radix-ui/react-icons"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full" style={{ minHeight: '300px' }}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200/50 scrollbar-track-transparent mb-2">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: message.role === "user" ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg max-w-[85%] mb-3 relative ${
                message.role === "user"
                  ? "bg-green-100 ml-auto"
                  : "bg-blue-100 mr-auto"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Input Area */}
      <div className="sticky bottom-0 bg-background pt-2 border-t border-green-200">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts here..."
            className="pr-12 bg-white/90 backdrop-blur-sm border-green-200 rounded-lg resize-none transition-all duration-200"
            rows={Math.min(input.split('\n').length + 1, 4)}
            maxLength={500}
            aria-label="Type your message"
            style={{ 
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {500 - input.length}
            </span>
            <Button
              type="submit"
              size="icon"
              className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm"
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
    </div>
  )
}