"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NatureBackground from "@/components/NatureBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"
import Link from "next/link"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="flex flex-col min-h-screen relative">
      <NatureBackground />
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center md:flex-row">
        {/* Hero Section - Hidden on mobile when chat is open */}
        <motion.section
          className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 md:w-1/2 flex items-center justify-center ${
            showChat ? 'hidden md:flex' : 'flex'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center p-8 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                AI Listener
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300 font-semibold">
                "Talk to Me, I Won't Judge... Unlike Your Friends."
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowChat(true)}
                aria-label="Start chatting with AI"
              >
                Start Chatting
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Chat Section with AnimatePresence */}
        <AnimatePresence>
          {showChat && (
            <motion.section
              key="chat"
              className="w-full py-12 md:w-1/2 md:py-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container px-4 md:px-6">
                <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md border-green-200 hover:shadow-emerald-700 relative">
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-green-800">Chat with AI</CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        "Say anything. I've got nothing better to do."
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setShowChat(false)}
                      className="text-gray-500 hover:text-green-600 -mt-2"
                      aria-label="Close chat"
                    >
                      ×
                    </Button>
                  </CardHeader>
                  <CardContent className="max-h-[70vh] overflow-y-auto">
                    <ChatInterface />
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-green-100/50 backdrop-blur-md border-t border-green-200 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-700 md:text-left">
              © 2025 AI Listener. Nurturing minds in the digital realm.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-gray-700 hover:text-green-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-700 hover:text-green-600 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}