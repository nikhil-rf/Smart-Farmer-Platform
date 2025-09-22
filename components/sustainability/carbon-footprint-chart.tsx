"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

// Mock data for carbon footprint over time
const monthlyData = [
  { month: "Jan", emissions: 450, reduction: 50 },
  { month: "Feb", emissions: 420, reduction: 80 },
  { month: "Mar", emissions: 380, reduction: 120 },
  { month: "Apr", emissions: 350, reduction: 150 },
  { month: "May", emissions: 320, reduction: 180 },
  { month: "Jun", emissions: 300, reduction: 200 },
]

const weeklyData = [
  { period: "Week 1", emissions: 75, reduction: 45 },
  { period: "Week 2", emissions: 70, reduction: 50 },
  { period: "Week 3", emissions: 65, reduction: 55 },
  { period: "Week 4", emissions: 60, reduction: 60 },
]

export function CarbonFootprintChart() {
  const [timeRange, setTimeRange] = useState<"monthly" | "weekly">("monthly")
  const data = timeRange === "monthly" ? monthlyData : weeklyData

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Carbon Footprint Tracking</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={timeRange === "weekly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === "monthly" ? "month" : "period"} />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} kg CO₂`,
                  name === "emissions" ? "Emissions" : "Reduction",
                ]}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="emissions"
              />
              <Area
                type="monotone"
                dataKey="reduction"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="reduction"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>CO₂ Emissions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>CO₂ Reduction</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
