"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                AI Therapist
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300">
                Find peace and support in our AI-powered natural sanctuary.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowChat(true)}>
                Start Your Journey
              </Button>
            </motion.div>
          </div>
        </section>

        {showChat && (
          <motion.section
            className="w-full py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6">
              <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">Chat with AI Therapist</CardTitle>
                  <CardDescription className="text-gray-600">
                    Share your thoughts in our serene digital space.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatInterface />
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}
      </main>
      <footer className="w-full py-6 bg-green-100/50 backdrop-blur-md border-t border-green-200 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-700 md:text-left">
              © 2023 AI Therapist. Nurturing minds in the digital realm.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-gray-700 hover:text-green-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-700 hover:text-green-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

