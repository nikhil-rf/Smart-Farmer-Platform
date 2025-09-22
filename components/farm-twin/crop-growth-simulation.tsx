"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Sprout } from "lucide-react"

const growthStages = [
  { name: "Germination", duration: 7, progress: 100, color: "bg-green-200" },
  { name: "Seedling", duration: 14, progress: 100, color: "bg-green-300" },
  { name: "Vegetative", duration: 30, progress: 100, color: "bg-green-400" },
  { name: "Flowering", duration: 21, progress: 65, color: "bg-yellow-400" },
  { name: "Grain Filling", duration: 28, progress: 0, color: "bg-orange-400" },
  { name: "Maturity", duration: 14, progress: 0, color: "bg-amber-600" },
]

export function CropGrowthSimulation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDay, setCurrentDay] = useState(72)
  const [selectedCrop, setSelectedCrop] = useState("wheat")

  const totalDuration = growthStages.reduce((sum, stage) => sum + stage.duration, 0)
  const overallProgress = (currentDay / totalDuration) * 100

  const getCurrentStage = () => {
    let dayCount = 0
    for (const stage of growthStages) {
      dayCount += stage.duration
      if (currentDay <= dayCount) {
        return stage
      }
    }
    return growthStages[growthStages.length - 1]
  }

  const currentStage = getCurrentStage()

  const toggleSimulation = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSimulation = () => {
    setCurrentDay(0)
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-secondary" />
          Crop Growth Simulation
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleSimulation}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={resetSimulation}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold">Day {currentDay}</div>
          <Badge variant="secondary" className="text-sm">
            {currentStage.name} Stage
          </Badge>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</p>
        </div>

        {/* Growth Stages Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Growth Timeline</h4>
          <div className="space-y-2">
            {growthStages.map((stage, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stage.name}</span>
                    <span className="text-xs text-muted-foreground">{stage.duration} days</span>
                  </div>
                  <Progress value={stage.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold">42 days</div>
            <p className="text-xs text-muted-foreground">Until Harvest</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">2.8 tons</div>
            <p className="text-xs text-muted-foreground">Predicted Yield</p>
          </div>
        </div>

        {/* Environmental Factors */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Current Conditions</h4>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-semibold">28%</div>
              <div className="text-xs text-muted-foreground">Soil Moisture</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <div className="font-semibold">24°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-semibold">Good</div>
              <div className="text-xs text-muted-foreground">Nutrition</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
