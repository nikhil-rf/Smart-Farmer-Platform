import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Droplets, Recycle, Lightbulb } from "lucide-react"

const recommendations = [
  {
    id: "1",
    title: "Switch to Drip Irrigation",
    description: "Reduce water usage by 40% while maintaining crop yield. Perfect for your wheat fields.",
    impact: "High",
    points: 200,
    category: "Water Conservation",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "2",
    title: "Implement Crop Rotation",
    description: "Rotate wheat with legumes to naturally improve soil nitrogen and reduce fertilizer needs.",
    impact: "Medium",
    points: 150,
    category: "Soil Health",
    icon: Recycle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "3",
    title: "Use Organic Pest Control",
    description: "Replace chemical pesticides with neem oil and beneficial insects for eco-friendly pest management.",
    impact: "High",
    points: 180,
    category: "Organic Practices",
    icon: Leaf,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    id: "4",
    title: "Install Solar Water Pumps",
    description: "Reduce electricity costs and carbon footprint with solar-powered irrigation systems.",
    impact: "High",
    points: 250,
    category: "Energy Efficiency",
    icon: Lightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

export function EcoRecommendations() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-secondary" />
          Eco-Friendly Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 border border-border rounded-lg">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${rec.bgColor} flex items-center justify-center flex-shrink-0`}>
                <rec.icon className={`w-5 h-5 ${rec.color}`} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getImpactColor(rec.impact)} variant="secondary">
                      {rec.impact} Impact
                    </Badge>
                    <Badge variant="outline" className="text-secondary">
                      +{rec.points} pts
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {rec.category}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Button size="sm">Implement</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
