import { createClient } from "@supabase/supabase-js"
import { getMockData } from "./mock-data"

// Flag to force using mock data (useful for development)
const FORCE_MOCK = process.env.NODE_ENV === "development"

// Create a mock Supabase client that doesn't make any network requests
function createMockSupabaseClient() {
  return {
    from: (table: string) => ({
      select: () => {
        return {
          order: () => {
            return {
              limit: () => Promise.resolve({ data: getMockData(table), error: null }),
              eq: () => Promise.resolve({ data: getMockData(table), error: null }),
              single: () => Promise.resolve({ data: getMockData(table)[0], error: null }),
            }
          },
          eq: () => Promise.resolve({ data: getMockData(table), error: null }),
          single: () => Promise.resolve({ data: getMockData(table)[0], error: null }),
        }
      },
      insert: () => ({
        select: () => Promise.resolve({ data: [{ id: Date.now(), ...getMockData(table)[0] }], error: null }),
      }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
      upsert: () => ({
        select: () => Promise.resolve({ data: [{ id: Date.now(), ...getMockData(table)[0] }], error: null }),
      }),
    }),
  }
}

// Create a client-side Supabase client
let supabaseInstance: any

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If we're forcing mock mode or missing environment variables, use mock client
if (FORCE_MOCK || !supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Using mock Supabase client. " +
      (FORCE_MOCK
        ? "FORCE_MOCK is enabled."
        : "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."),
  )
  supabaseInstance = createMockSupabaseClient()
} else {
  // Try to create a real Supabase client
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    supabaseInstance = createMockSupabaseClient()
  }
}

export const supabase = supabaseInstance
