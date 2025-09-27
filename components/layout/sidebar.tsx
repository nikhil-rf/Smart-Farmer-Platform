"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, Activity, TrendingUp, Leaf, BarChart3, Menu, X } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "AI Advisory", href: "/advisory", icon: MessageSquare },
  { name: "IoT Data", href: "/iot", icon: Activity },
  { name: "Market Hub", href: "/market", icon: TrendingUp },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Farm Twin", href: "/farm-twin", icon: BarChart3 },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-border">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-card-foreground">Smart Farmer</h1>
              <p className="text-xs text-muted-foreground">Advisory Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-card-foreground hover:bg-muted",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsNavigating(true)
                    setIsOpen(false)
                    router.push(item.href)
                  }}
                >
                  <item.icon className={cn("w-5 h-5", isNavigating && pathname === item.href && "opacity-50")} />
                  <span className={cn(isNavigating && pathname === item.href && "opacity-50")}>{item.name}</span>
                  {isNavigating && pathname === item.href && (
                    <LoadingSpinner className="absolute right-2" size="sm" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">Jaskirat</p>
                <p className="text-xs text-muted-foreground truncate">Organic Farm, Punjab</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
