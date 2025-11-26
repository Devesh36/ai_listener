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
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <NatureBackground />
      
      {/* Header */}
      <header className="relative z-20 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-green-600"
          >
             AI Listener
          </motion.div>
          {!showChat && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1 relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showChat ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 py-12 w-full"
            >
              {/* Hero Section */}
              <section className="container px-4 md:px-6 mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center text-center space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                  >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-green-600">
                      Talk to AI
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 font-semibold max-w-2xl mx-auto">
                      "I Won't Judge... Unlike Your Friends."
                    </p>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                      Get empathetic, non-judgmental responses whenever you need someone to listen
                    </p>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowChat(true)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg transition-all text-lg"
                  >
                    Start Chatting Now 
                  </motion.button>
                </div>
              </section>

              {/* Features Section - REMOVED */}

              {/* CTA Section - REMOVED */}

              {/* Footer */}
            </motion.div>
          ) : (
            <motion.section
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="container px-4 md:px-6 py-8 mx-auto max-w-4xl h-full flex flex-col"
            >
              <div className="space-y-4 flex flex-col h-full">
                <div className="flex items-center justify-between flex-shrink-0">
                  <h2 className="text-3xl font-bold text-gray-800">Chat with AI</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowChat(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    ← Back
                  </motion.button>
                </div>
                <Card className="bg-white/90 backdrop-blur-md border-green-200 shadow-2xl flex-1 flex flex-col overflow-hidden">
                  <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
                    <ChatInterface />
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-700">
              © 2025 AI Listener. Nurturing minds in the digital realm. 💚
            </p>
            <div className="flex gap-4 text-sm text-gray-700">
              <Link
                href="https://github.com/Devesh36"
                className="hover:text-green-600 transition-colors font-semibold"
              >
                Made by Devesh
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
