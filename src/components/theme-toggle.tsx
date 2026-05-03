import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark"

const storageKey = "heals-theme"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(storageKey)
  if (stored === "light" || stored === "dark") {
    return stored
  }

  return "light"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  const isDark = theme === "dark"

  return (
    <Button
      aria-label={isDark ? "切换到浅色主题" : "切换到暗色主题"}
      size="icon"
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "切换到浅色主题" : "切换到暗色主题"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
