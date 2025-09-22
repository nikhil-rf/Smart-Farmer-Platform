import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, Leaf, Zap, Recycle } from "lucide-react"

const metrics = [
  {
    id: "water",
    title: "Water Conservation",
    value: "2,450 L",
    subtitle: "Saved this month",
    progress: 78,
    target: "3,000 L",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "carbon",
    title: "Carbon Reduction",
    value: "145 kg",
    subtitle: "CO₂ reduced",
    progress: 65,
    target: "200 kg",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "organic",
    title: "Organic Practices",
    value: "85%",
    subtitle: "Adoption rate",
    progress: 85,
    target: "90%",
    icon: Recycle,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    id: "energy",
    title: "Energy Efficiency",
    value: "320 kWh",
    subtitle: "Saved this month",
    progress: 72,
    target: "400 kWh",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

export function SustainabilityDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className={`w-8 h-8 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>Target: {metric.target}</span>
              </div>
              <Progress value={metric.progress} className="h-2" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {metric.progress}% Complete
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
