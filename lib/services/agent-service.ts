import { supabase } from "../supabase"

export type Agent = {
  id: number
  name: string
  status: "Running" | "Completed" | "Error" | "Idle"
  last_run: string
  summary: string
}

export async function getAgents() {
  const { data, error } = await supabase.from("agents").select("*").order("name")

  if (error) {
    console.error("Error fetching agents:", error)
    return []
  }

  return data as Agent[]
}

export async function updateAgentStatus(id: number, status: Agent["status"], summary?: string) {
  const updates = {
    status,
    last_run: new Date().toISOString(),
    ...(summary && { summary }),
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("agents").update(updates).eq("id", id)

  if (error) {
    console.error("Error updating agent status:", error)
    return false
  }

  return true
}
