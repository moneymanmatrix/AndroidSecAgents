"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function AnimatedTitle({ title, subtitle, className = "" }: AnimatedTitleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`flex flex-col ${className}`}>
      <h1 className="text-2xl font-bold md:text-3xl overflow-hidden">
        {title.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
      {subtitle && (
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: title.length * 0.03 + 0.2,
            ease: "easeOut",
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
