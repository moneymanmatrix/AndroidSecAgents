import { supabase } from "../supabase"
import { getMockData } from "../mock-data"

export type ChatMessage = {
  id: number
  user_id?: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export async function getChatMessages(limit = 20) {
  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching chat messages:", error)
      return getMockData("chat_messages") as ChatMessage[]
    }

    return (Array.isArray(data) ? data : []).reverse() as ChatMessage[]
  } catch (error) {
    console.error("Error fetching chat messages:", error)
    return getMockData("chat_messages") as ChatMessage[]
  }
}

export async function addChatMessage(message: Omit<ChatMessage, "id">) {
  try {
    const { data, error } = await supabase.from("chat_messages").insert([message]).select()

    if (error) {
      console.error("Error adding chat message:", error)
      return createMockMessage(message)
    }

    return data && data.length > 0 ? (data[0] as ChatMessage) : createMockMessage(message)
  } catch (error) {
    console.error("Error adding chat message:", error)
    return createMockMessage(message)
  }
}

// Create a mock message with a generated ID
function createMockMessage(message: Omit<ChatMessage, "id">): ChatMessage {
  return { ...message, id: Date.now() } as ChatMessage
}
