import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplets, Leaf, Zap } from "lucide-react"

const metrics = [
  {
    icon: Droplets,
    label: "Water Saved",
    value: "2,450 L",
    progress: 78,
    color: "text-blue-600",
  },
  {
    icon: Leaf,
    label: "Carbon Reduced",
    value: "145 kg CO₂",
    progress: 65,
    color: "text-green-600",
  },
  {
    icon: Zap,
    label: "Organic Practices",
    value: "85% Adoption",
    progress: 85,
    color: "text-secondary",
  },
]

export function SustainabilityScorecard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-secondary" />
          Sustainability Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-secondary">76</div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
        </div>

        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm font-semibold">{metric.value}</span>
              </div>
              <Progress value={metric.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
