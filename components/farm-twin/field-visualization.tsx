"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Layers, Zap } from "lucide-react"

const fieldData = {
  fieldA: {
    name: "Field A - North",
    crop: "Wheat",
    area: "12 acres",
    stage: "Flowering",
    health: 85,
    moisture: 28,
    temperature: 24,
    zones: [
      { id: "A1", health: 90, moisture: 30, issue: null },
      { id: "A2", health: 85, moisture: 28, issue: null },
      { id: "A3", health: 75, moisture: 22, issue: "Low moisture" },
      { id: "A4", health: 88, moisture: 32, issue: null },
    ],
  },
  fieldB: {
    name: "Field B - South",
    crop: "Rice",
    area: "8 acres",
    stage: "Vegetative",
    health: 92,
    moisture: 35,
    temperature: 26,
    zones: [
      { id: "B1", health: 95, moisture: 38, issue: null },
      { id: "B2", health: 90, moisture: 34, issue: null },
      { id: "B3", health: 88, moisture: 32, issue: null },
      { id: "B4", health: 95, moisture: 36, issue: null },
    ],
  },
}

export function FieldVisualization() {
  const [selectedField, setSelectedField] = useState<"fieldA" | "fieldB">("fieldA")
  const [viewMode, setViewMode] = useState<"health" | "moisture" | "temperature">("health")

  const currentField = fieldData[selectedField]

  const getZoneColor = (zone: any) => {
    switch (viewMode) {
      case "health":
        if (zone.health >= 90) return "bg-green-500"
        if (zone.health >= 80) return "bg-yellow-500"
        return "bg-red-500"
      case "moisture":
        if (zone.moisture >= 30) return "bg-blue-500"
        if (zone.moisture >= 25) return "bg-blue-300"
        return "bg-red-300"
      case "temperature":
        return "bg-orange-400"
      default:
        return "bg-gray-400"
    }
  }

  const getHealthStatus = (health: number) => {
    if (health >= 90) return { label: "Excellent", color: "bg-green-100 text-green-800" }
    if (health >= 80) return { label: "Good", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Needs Attention", color: "bg-red-100 text-red-800" }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Field Visualization
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedField === "fieldA" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("fieldA")}
          >
            Field A
          </Button>
          <Button
            variant={selectedField === "fieldB" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("fieldB")}
          >
            Field B
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Field Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{currentField.crop}</div>
            <p className="text-sm text-muted-foreground">{currentField.area}</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{currentField.stage}</div>
            <p className="text-sm text-muted-foreground">Growth Stage</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{currentField.health}%</div>
            <Badge className={getHealthStatus(currentField.health).color} variant="secondary">
              {getHealthStatus(currentField.health).label}
            </Badge>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{currentField.moisture}%</div>
            <p className="text-sm text-muted-foreground">Avg Moisture</p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">View Mode:</span>
          <div className="flex gap-2">
            {["health", "moisture", "temperature"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Field Map */}
        <div className="relative bg-green-50 rounded-lg p-6 h-[300px]">
          <div className="grid grid-cols-2 gap-4 h-full">
            {currentField.zones.map((zone, index) => (
              <div
                key={zone.id}
                className={`relative rounded-lg border-2 border-white shadow-sm cursor-pointer transition-all hover:scale-105 ${getZoneColor(
                  zone,
                )}`}
              >
                <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                <div className="absolute top-2 left-2 text-white font-semibold text-sm">{zone.id}</div>
                {zone.issue && (
                  <div className="absolute top-2 right-2">
                    <Zap className="w-4 h-4 text-yellow-300" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-white text-xs">
                  {viewMode === "health" && `${zone.health}%`}
                  {viewMode === "moisture" && `${zone.moisture}%`}
                  {viewMode === "temperature" && `${currentField.temperature}°C`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentField.zones.map((zone) => (
            <div key={zone.id} className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Zone {zone.id}</h4>
                {zone.issue && (
                  <Badge variant="destructive" className="text-xs">
                    {zone.issue}
                  </Badge>
                )}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Health: {zone.health}%</div>
                <div>Moisture: {zone.moisture}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
