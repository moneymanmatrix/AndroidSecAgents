"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User, Sparkles, AlertCircle, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getChatMessages, addChatMessage, type ChatMessage } from "@/lib/services/chat-service"
import { AnimatedTitle } from "@/components/animated-title"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Check network status
  useEffect(() => {
    const handleOnline = () => setIsOfflineMode(false)
    const handleOffline = () => setIsOfflineMode(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check
    setIsOfflineMode(!navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Fetch chat messages on component mount
  useEffect(() => {
    async function fetchMessages() {
      setLoading(true)
      setError(null)
      try {
        const fetchedMessages = await getChatMessages()

        // If no messages exist, add a welcome message
        if (fetchedMessages.length === 0) {
          const welcomeMessage = {
            role: "assistant" as const,
            content: "Welcome to the Android Security Assistant! How can I help you analyze threats today?",
            timestamp: new Date().toISOString(),
          }

          const savedMessage = await addChatMessage(welcomeMessage)
          if (savedMessage) {
            setMessages([savedMessage])
          }
        } else {
          setMessages(fetchedMessages)
        }
      } catch (err) {
        console.error("Error fetching messages:", err)
        setError("Failed to load chat messages. Using demo mode.")
        // Set a default welcome message
        setMessages([
          {
            id: 1,
            role: "assistant",
            content: "Welcome to the Android Security Assistant! How can I help you analyze threats today? (Demo Mode)",
            timestamp: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Create user message
    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date().toISOString(),
    }

    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      // Save user message to database
      await addChatMessage(userMessage)

      // Simulate assistant response (in a real app, this would be an API call)
      setTimeout(async () => {
        const assistantMessage = {
          role: "assistant" as const,
          content:
            "I'm analyzing your query about Android security. Let me check our knowledge base and recent findings to provide you with the most relevant information.",
          timestamp: new Date().toISOString(),
        }

        // Save assistant message to database
        const savedMessage = await addChatMessage(assistantMessage)

        if (savedMessage) {
          setMessages((prev) => [...prev, savedMessage])
        }
      }, 1000)
    } catch (err) {
      console.error("Error sending message:", err)
      // Still show the assistant response even if saving to DB fails
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: "assistant",
            content:
              "I'm analyzing your query about Android security. Let me check our knowledge base and recent findings to provide you with the most relevant information. (Demo Mode)",
            timestamp: new Date().toISOString(),
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <AnimatedTitle title="LLM Chat Assistant" subtitle="Ask questions about Android security vulnerabilities" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center gap-2"
        >
          {isOfflineMode ? (
            <span className="flex items-center text-amber-500 text-sm">
              <WifiOff className="h-4 w-4 mr-1" />
              Offline
            </span>
          ) : (
            <span className="flex items-center text-green-500 text-sm">
              <Wifi className="h-4 w-4 mr-1" />
              Online
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={async () => {
              setMessages([])
              // Clear chat messages from database would go here
              const welcomeMessage = {
                role: "assistant" as const,
                content: "Welcome to the Android Security Assistant! How can I help you analyze threats today?",
                timestamp: new Date().toISOString(),
              }
              const savedMessage = await addChatMessage(welcomeMessage)
              if (savedMessage) {
                setMessages([savedMessage])
              }
            }}
          >
            <Sparkles className="h-4 w-4" />
            New Chat
          </Button>
        </motion.div>
      </div>

      {(error || isOfflineMode) && (
        <Alert className="mb-4 border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{isOfflineMode ? "Offline Mode" : "Database Connection Issue"}</AlertTitle>
          <AlertDescription>
            {isOfflineMode
              ? "You are currently offline. The app is running in demo mode with sample data."
              : error || "Using demo mode with sample data."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="flex-1 overflow-hidden border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <p>Loading messages...</p>
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pb-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[80%] gap-3 rounded-lg p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary/10"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 border-2 border-secondary">
                          <AvatarImage src="/robot-avatar.png" alt="AI Assistant" />
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm">{message.content}</span>
                        <span className="mt-1 text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 border-2 border-primary">
                          <AvatarImage src="/user-avatar.png" alt="User" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollArea>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border-t p-4 bg-background/50 backdrop-blur-sm"
          >
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the assistant about vulnerabilities, tools, analysis, or Android issues..."
                className="min-h-[60px] flex-1 resize-none border-secondary/20 focus-visible:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-[60px] w-[60px] bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
