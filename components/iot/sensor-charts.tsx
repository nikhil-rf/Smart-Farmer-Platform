"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Mock data for the last 7 days
const generateMockData = () => {
  const data = []
  const now = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString(),
      moisture: Math.round((20 + Math.random() * 15) * 10) / 10,
      temperature: Math.round((22 + Math.random() * 8) * 10) / 10,
      humidity: Math.round((60 + Math.random() * 20) * 10) / 10,
      ph: Math.round((6.5 + Math.random() * 1) * 10) / 10,
    })
  }

  return data
}

export function SensorCharts() {
  const [selectedMetric, setSelectedMetric] = useState("moisture")
  const data = generateMockData()

  const metrics = [
    { key: "moisture", label: "Soil Moisture", color: "#3b82f6", unit: "%" },
    { key: "temperature", label: "Temperature", color: "#ef4444", unit: "°C" },
    { key: "humidity", label: "Humidity", color: "#10b981", unit: "%" },
    { key: "ph", label: "Soil pH", color: "#f59e0b", unit: "pH" },
  ]

  const currentMetric = metrics.find((m) => m.key === selectedMetric)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Data Trends (Last 7 Days)</CardTitle>
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetric === metric.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(metric.key)}
            >
              {metric.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value} ${currentMetric?.unit}`, currentMetric?.label]} />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric?.color}
                strokeWidth={2}
                dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
                name={currentMetric?.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
