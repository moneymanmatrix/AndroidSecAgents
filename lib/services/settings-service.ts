import { supabase } from "../supabase"

export type UserSetting = {
  id: number
  user_id?: string
  setting_key: string
  setting_value: string
}

export async function getUserSettings(userId?: string) {
  const query = supabase.from("user_settings").select("*")

  if (userId) {
    query.eq("user_id", userId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching user settings:", error)
    return []
  }

  return data as UserSetting[]
}

export async function saveUserSetting(key: string, value: string, userId?: string) {
  const setting = {
    setting_key: key,
    setting_value: value,
    ...(userId && { user_id: userId }),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from("user_settings")
    .upsert([setting], { onConflict: "user_id, setting_key" })
    .select()

  if (error) {
    console.error("Error saving user setting:", error)
    return null
  }

  return data[0] as UserSetting
}
