"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  BarChart,
  BookOpen,
  Github,
  MessageSquare,
  Rss,
  Settings,
  ShieldCheck,
  TerminalSquare,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  {
    name: "LLM Chat",
    href: "/",
    icon: MessageSquare,
  },
  {
    name: "Agent Status",
    href: "/agent-status",
    icon: Activity,
  },
  {
    name: "Scraped Data",
    href: "/scraped-data",
    icon: Rss,
  },
  {
    name: "Analysis Reports",
    href: "/analysis-reports",
    icon: BarChart,
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
  },
  {
    name: "Solutions",
    href: "/solutions",
    icon: ShieldCheck,
  },
  {
    name: "Tools",
    href: "/tools",
    icon: TerminalSquare,
  },
  {
    name: "GitHub Findings",
    href: "/github-findings",
    icon: Github,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(true)

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isMobile])

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  if (!isOpen && isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-40 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -280, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${isMobile ? "fixed inset-y-0 left-0 z-40" : "relative"} flex h-screen w-64 flex-col border-r bg-card`}
      >
        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Navigation</h2>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    "justify-start gap-2 px-3 transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                    pathname === item.href && "bg-primary/10 text-primary font-semibold",
                  )}
                >
                  <Link href={item.href} onClick={handleLinkClick}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="border-t p-4"
        >
          <div className="rounded-md bg-secondary/10 p-3">
            <h3 className="font-semibold text-sm text-secondary">Agent Status</h3>
            <p className="mt-1 text-xs text-muted-foreground">5 agents active, 2 idle</p>
            <Button size="sm" variant="secondary" className="mt-2 w-full text-xs">
              View Details
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
