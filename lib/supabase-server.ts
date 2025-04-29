import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { getMockData } from "./mock-data"

// Flag to force using mock data (useful for development)
const FORCE_MOCK = process.env.NODE_ENV === "development"

// Create a mock Supabase client that doesn't make any network requests
function createMockServerClient() {
  return {
    from: (table: string) => ({
      select: () => {
        return {
          order: () => Promise.resolve({ data: getMockData(table), error: null }),
          eq: () => Promise.resolve({ data: getMockData(table), error: null }),
          limit: () => Promise.resolve({ data: getMockData(table), error: null }),
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

// Create a server-side Supabase client
export function createServerClient() {
  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // If we're forcing mock mode or missing environment variables, use mock client
  if (FORCE_MOCK || !supabaseUrl || !supabaseServiceKey) {
    console.warn(
      "Using mock Supabase client. " +
        (FORCE_MOCK
          ? "FORCE_MOCK is enabled."
          : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables."),
    )
    return createMockServerClient()
  }

  // Try to create a real Supabase client
  try {
    const cookieStore = cookies()
    return createClient(supabaseUrl, supabaseServiceKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    return createMockServerClient()
  }
}
