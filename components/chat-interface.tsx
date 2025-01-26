"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "ai/react"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 max-h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.role === "user" ? "bg-green-200 text-gray-800 self-end" : "bg-blue-200 text-gray-800 self-start"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Share your thoughts here..."
          className="flex-1 bg-white/50 backdrop-blur-sm border-green-200"
        />
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          Send
        </Button>
      </form>
    </div>
  )
}


