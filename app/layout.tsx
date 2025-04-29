import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ParticleBackground } from "@/components/particle-background"
import { EnvWarning } from "@/components/env-warning"
import { DemoModeBanner } from "@/components/demo-mode-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Android Security Multi-Agent System",
  description: "Dashboard and interface for Android Security Multi-Agent System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ParticleBackground />
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-background">
                <div className="agentic-container py-6">{children}</div>
              </main>
            </div>
          </div>
          <EnvWarning />
          <DemoModeBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
