import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const stats = [
  {
    label: "Today's Yield",
    value: "2.4 tons",
    change: "+12%",
    trend: "up",
  },
  {
    label: "Water Usage",
    value: "1,250 L",
    change: "-8%",
    trend: "down",
  },
  {
    label: "Energy Cost",
    value: "₹450",
    change: "0%",
    trend: "neutral",
  },
  {
    label: "Green Points",
    value: "1,240",
    change: "+25",
    trend: "up",
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="w-4 h-4" />}
                {stat.trend === "down" && <TrendingDown className="w-4 h-4" />}
                {stat.trend === "neutral" && <Minus className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
