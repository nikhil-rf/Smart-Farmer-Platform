import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

const tips = [
  {
    id: 1,
    title: "Morning Irrigation",
    tip: "Water your crops between 6-8 AM for optimal absorption and reduced evaporation.",
    category: "Water Management",
  },
  {
    id: 2,
    title: "Companion Planting",
    tip: "Plant marigolds near tomatoes to naturally repel harmful insects.",
    category: "Pest Control",
  },
  {
    id: 3,
    title: "Soil Health",
    tip: "Add organic matter like compost to improve soil structure and nutrient retention.",
    category: "Soil Care",
  },
  {
    id: 4,
    title: "Weather Watch",
    tip: "Check weather forecasts before applying fertilizers to avoid nutrient loss from rain.",
    category: "Planning",
  },
]

export function MicroAdvisoryTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" />
          Quick Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="p-3 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{tip.category}</span>
            </div>
            <p className="text-sm text-muted-foreground">{tip.tip}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
