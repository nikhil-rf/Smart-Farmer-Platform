"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, Calendar, Clock, TrendingDown } from "lucide-react"

const irrigationSchedule = [
  {
    date: "Today",
    time: "6:00 AM",
    field: "Field A",
    amount: "25mm",
    duration: "2 hours",
    status: "scheduled",
    reason: "Soil moisture below threshold",
  },
  {
    date: "Tomorrow",
    time: "Skip",
    field: "All Fields",
    amount: "0mm",
    duration: "0 hours",
    status: "skipped",
    reason: "Rain expected (5mm)",
  },
  {
    date: "Day 3",
    time: "Skip",
    field: "All Fields",
    amount: "0mm",
    duration: "0 hours",
    status: "skipped",
    reason: "Heavy rain expected (25mm)",
  },
  {
    date: "Day 4",
    time: "7:00 AM",
    field: "Field B",
    amount: "20mm",
    duration: "1.5 hours",
    status: "predicted",
    reason: "Post-rain moisture optimization",
  },
]

export function IrrigationPredictor() {
  const [selectedField, setSelectedField] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "skipped":
        return "bg-gray-100 text-gray-800"
      case "predicted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-3 h-3" />
      case "skipped":
        return <TrendingDown className="w-3 h-3" />
      case "predicted":
        return <Calendar className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          Smart Irrigation Predictor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">18%</div>
            <p className="text-sm text-muted-foreground">Current Soil Moisture</p>
            <Progress value={18} className="h-2 mt-2" />
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">450L</div>
            <p className="text-sm text-muted-foreground">Water Saved This Week</p>
          </div>
        </div>

        {/* Irrigation Schedule */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Predicted Irrigation Schedule</h4>
          <div className="space-y-2">
            {irrigationSchedule.map((schedule, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{schedule.date}</span>
                    <Badge className={getStatusColor(schedule.status)} variant="secondary">
                      {getStatusIcon(schedule.status)}
                      <span className="ml-1">{schedule.status}</span>
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">{schedule.time}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                  <span>Field: {schedule.field}</span>
                  <span>Amount: {schedule.amount}</span>
                  <span>Duration: {schedule.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground italic">{schedule.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">AI Recommendations</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Irrigate Field A today morning before temperature rises</li>
            <li>• Skip irrigation for next 2 days due to expected rainfall</li>
            <li>• Monitor soil moisture after rain for optimal timing</li>
            <li>• Consider drip irrigation for 30% water savings</li>
          </ul>
        </div>

        {/* Water Usage Optimization */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Water Usage Optimization</h4>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-semibold">1,250L</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-semibold">-25%</div>
              <div className="text-xs text-muted-foreground">vs Last Week</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="font-semibold">85%</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
