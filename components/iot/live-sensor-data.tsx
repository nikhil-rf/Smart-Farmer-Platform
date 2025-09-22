"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Thermometer, Zap, Beaker } from "lucide-react"

interface SensorReading {
  id: string
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical"
  icon: React.ComponentType<{ className?: string }>
  threshold: { min: number; max: number }
}

export function LiveSensorData() {
  const [sensors, setSensors] = useState<SensorReading[]>([
    {
      id: "moisture",
      name: "Soil Moisture",
      value: 18,
      unit: "%",
      status: "warning",
      icon: Droplets,
      threshold: { min: 25, max: 35 },
    },
    {
      id: "temperature",
      name: "Soil Temperature",
      value: 24,
      unit: "°C",
      status: "normal",
      icon: Thermometer,
      threshold: { min: 20, max: 30 },
    },
    {
      id: "humidity",
      name: "Air Humidity",
      value: 65,
      unit: "%",
      status: "normal",
      icon: Zap,
      threshold: { min: 60, max: 80 },
    },
    {
      id: "ph",
      name: "Soil pH",
      value: 6.8,
      unit: "pH",
      status: "normal",
      icon: Beaker,
      threshold: { min: 6.0, max: 7.5 },
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          const variation = (Math.random() - 0.5) * 2 // Random variation
          let newValue = sensor.value + variation

          // Keep values within reasonable bounds
          if (sensor.id === "moisture") newValue = Math.max(10, Math.min(40, newValue))
          if (sensor.id === "temperature") newValue = Math.max(15, Math.min(35, newValue))
          if (sensor.id === "humidity") newValue = Math.max(40, Math.min(90, newValue))
          if (sensor.id === "ph") newValue = Math.max(5.5, Math.min(8.0, newValue))

          // Determine status based on thresholds
          let status: "normal" | "warning" | "critical" = "normal"
          if (newValue < sensor.threshold.min || newValue > sensor.threshold.max) {
            status = "warning"
          }
          if (newValue < sensor.threshold.min * 0.8 || newValue > sensor.threshold.max * 1.2) {
            status = "critical"
          }

          return {
            ...sensor,
            value: Math.round(newValue * 10) / 10,
            status,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {sensors.map((sensor) => (
        <Card key={sensor.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{sensor.name}</CardTitle>
            <sensor.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {sensor.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{sensor.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Range: {sensor.threshold.min}-{sensor.threshold.max} {sensor.unit}
                </p>
              </div>
              <Badge className={getStatusColor(sensor.status)} variant="secondary">
                {sensor.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
