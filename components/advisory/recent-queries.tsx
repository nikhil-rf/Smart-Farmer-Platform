import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, RotateCcw } from "lucide-react"

const recentQueries = [
  {
    id: 1,
    query: "How to control aphids organically?",
    time: "2 hours ago",
  },
  {
    id: 2,
    query: "Best time for wheat harvesting?",
    time: "1 day ago",
  },
  {
    id: 3,
    query: "Soil pH testing methods",
    time: "2 days ago",
  },
  {
    id: 4,
    query: "Drip irrigation setup guide",
    time: "3 days ago",
  },
]

export function RecentQueries() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Queries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentQueries.map((query) => (
          <div key={query.id} className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{query.query}</p>
              <p className="text-xs text-muted-foreground">{query.time}</p>
            </div>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
