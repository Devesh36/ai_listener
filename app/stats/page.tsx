"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NatureBackground from "@/components/NatureBackground"

interface SessionStats {
  date: string
  messages: number
  duration: number
  mood: string
}

export default function StatsPage() {
  const [stats, setStats] = useState<SessionStats[]>([])
  const [totalMessages, setTotalMessages] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)

  useEffect(() => {
    // Simulated stats - in production, fetch from backend
    const mockStats: SessionStats[] = [
      { date: new Date().toLocaleDateString(), messages: 15, duration: 45, mood: "😊 Happy" },
      { date: new Date(Date.now() - 86400000).toLocaleDateString(), messages: 22, duration: 60, mood: "😌 Calm" },
      { date: new Date(Date.now() - 172800000).toLocaleDateString(), messages: 18, duration: 50, mood: "😔 Sad" },
    ]
    setStats(mockStats)
    setTotalMessages(mockStats.reduce((a, b) => a + b.messages, 0))
    setTotalSessions(mockStats.length)
  }, [])

  const avgMessages = totalMessages / totalSessions || 0

  return (
    <div className="flex flex-col min-h-screen relative">
      <NatureBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
          <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-600">
              📊 Your Journey
            </h1>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">
                ← Back Home
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats Content */}
        <main className="container px-4 md:px-6 py-12 mx-auto">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Sessions", value: totalSessions, icon: "💬" },
              { label: "Total Messages", value: totalMessages, icon: "📝" },
              { label: "Avg Messages/Session", value: avgMessages.toFixed(1), icon: "📈" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="bg-white/80 backdrop-blur border-green-200">
                  <CardContent className="pt-6 text-center space-y-2">
                    <div className="text-4xl">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sessions History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((session, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-800">{session.date}</div>
                        <div className="text-sm text-gray-600">
                          {session.messages} messages • {session.duration} min • {session.mood}
                        </div>
                      </div>
                      <div className="text-2xl">→</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">💡 Your Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Most Active Time</p>
                  <p className="text-lg text-green-600">Evening (6 PM - 10 PM)</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Your Mood Trend</p>
                  <p className="text-lg text-green-600">Improving 📈</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Consistency</p>
                  <p className="text-lg text-green-600">3-day streak! 🔥</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
