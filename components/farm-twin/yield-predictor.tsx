"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Target, Calendar } from "lucide-react"

const yieldData = [
  { month: "Jan", predicted: 2.2, actual: 2.1 },
  { month: "Feb", predicted: 2.4, actual: 2.3 },
  { month: "Mar", predicted: 2.6, actual: 2.5 },
  { month: "Apr", predicted: 2.8, actual: 0 }, // Current month
  { month: "May", predicted: 3.0, actual: 0 },
  { month: "Jun", predicted: 2.9, actual: 0 },
]

const factors = [
  { name: "Weather Conditions", impact: 85, status: "positive" },
  { name: "Soil Health", impact: 92, status: "positive" },
  { name: "Irrigation Management", impact: 78, status: "neutral" },
  { name: "Pest Control", impact: 88, status: "positive" },
  { name: "Fertilizer Application", impact: 82, status: "neutral" },
]

export function YieldPredictor() {
  const currentYieldPrediction = 2.8
  const targetYield = 3.0
  const achievementPercentage = (currentYieldPrediction / targetYield) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case "positive":
        return "text-green-600"
      case "neutral":
        return "text-yellow-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-secondary" />
          Yield Prediction & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Prediction */}
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold text-secondary">{currentYieldPrediction} tons</div>
          <p className="text-sm text-muted-foreground">Predicted Yield (Current Season)</p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Target: {targetYield} tons</span>
            </div>
            <Badge variant={achievementPercentage >= 90 ? "default" : "secondary"}>
              {Math.round(achievementPercentage)}% of target
            </Badge>
          </div>
          <Progress value={achievementPercentage} className="h-3" />
        </div>

        {/* Yield Trend Chart */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Yield Trend (Tons per Hectare)</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value} tons`, "Yield"]} />
                <Bar dataKey="predicted" fill="#84cc16" name="Predicted" />
                <Bar dataKey="actual" fill="#22c55e" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yield Factors */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Yield Influencing Factors</h4>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className={`text-sm ${getStatusColor(factor.status)}`}>{factor.impact}%</span>
                  </div>
                  <Progress value={factor.impact} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Optimization Recommendations</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Improve irrigation efficiency to reach 90% for +0.1 ton yield</li>
            <li>• Apply organic fertilizer next week for optimal grain filling</li>
            <li>• Monitor weather closely for harvest timing</li>
            <li>• Consider premium variety for next season (+15% yield potential)</li>
          </ul>
        </div>

        {/* Harvest Timeline */}
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <Calendar className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium text-sm">Estimated Harvest Date</div>
            <div className="text-sm text-muted-foreground">May 15-20, 2024 (42 days remaining)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
