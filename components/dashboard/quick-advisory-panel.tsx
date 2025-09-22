import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Lightbulb, Clock } from "lucide-react"

const advisories = [
  {
    id: 1,
    title: "Optimal Irrigation Time",
    message: "Based on soil moisture data, irrigate Field A tomorrow at 6 AM for best water absorption.",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    title: "Pest Alert",
    message: "Weather conditions favor aphid growth. Consider organic neem oil spray this week.",
    time: "5 hours ago",
    priority: "medium",
  },
  {
    id: 3,
    title: "Fertilizer Recommendation",
    message: "Soil analysis suggests adding organic compost to boost nitrogen levels in Field B.",
    time: "1 day ago",
    priority: "low",
  },
]

export function QuickAdvisoryPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" />
          Latest AI Recommendations
        </CardTitle>
        <Button variant="outline" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask AI
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {advisories.map((advisory) => (
          <div key={advisory.id} className="border-l-4 border-l-secondary pl-4 py-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{advisory.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{advisory.message}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {advisory.time}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
