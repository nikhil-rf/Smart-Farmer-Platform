"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react"

interface CropPrice {
  id: string
  name: string
  currentPrice: number
  previousPrice: number
  unit: string
  market: string
  lastUpdated: string
}

export function MarketPrices() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [prices, setPrices] = useState<CropPrice[]>([
    {
      id: "wheat",
      name: "Wheat",
      currentPrice: 2150,
      previousPrice: 2100,
      unit: "₹/quintal",
      market: "Ludhiana Mandi",
      lastUpdated: "2 hours ago",
    },
    {
      id: "rice",
      name: "Basmati Rice",
      currentPrice: 4200,
      previousPrice: 4350,
      unit: "₹/quintal",
      market: "Amritsar Mandi",
      lastUpdated: "1 hour ago",
    },
    {
      id: "cotton",
      name: "Cotton",
      currentPrice: 6800,
      previousPrice: 6800,
      unit: "₹/quintal",
      market: "Bathinda Mandi",
      lastUpdated: "3 hours ago",
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      currentPrice: 350,
      previousPrice: 340,
      unit: "₹/quintal",
      market: "Jalandhar Mandi",
      lastUpdated: "4 hours ago",
    },
  ])

  const refreshPrices = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setPrices((prev) =>
        prev.map((price) => ({
          ...price,
          previousPrice: price.currentPrice,
          currentPrice: Math.round(price.currentPrice * (0.95 + Math.random() * 0.1)),
          lastUpdated: "Just now",
        })),
      )
      setIsRefreshing(false)
    }, 1500)
  }

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous
    const percentage = ((change / previous) * 100).toFixed(1)
    return { change, percentage }
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return "text-green-600"
    if (current < previous) return "text-red-600"
    return "text-gray-500"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Live Market Prices</CardTitle>
        <Button variant="outline" size="sm" onClick={refreshPrices} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map((crop) => {
            const { change, percentage } = getPriceChange(crop.currentPrice, crop.previousPrice)
            return (
              <div key={crop.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{crop.name}</h3>
                  {getTrendIcon(crop.currentPrice, crop.previousPrice)}
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    {crop.currentPrice.toLocaleString()} <span className="text-sm font-normal">{crop.unit}</span>
                  </div>
                  <div className={`text-sm ${getTrendColor(crop.currentPrice, crop.previousPrice)}`}>
                    {change > 0 ? "+" : ""}
                    {change} ({percentage}%)
                  </div>
                  <div className="text-xs text-muted-foreground">{crop.market}</div>
                  <div className="text-xs text-muted-foreground">{crop.lastUpdated}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
