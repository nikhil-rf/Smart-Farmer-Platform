import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const leaderboard = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    points: 2450,
    initials: "RK",
    badge: "Eco Champion",
  },
  {
    rank: 2,
    name: "Priya Sharma",
    location: "Haryana",
    points: 2180,
    initials: "PS",
    badge: "Water Saver",
  },
  {
    rank: 3,
    name: "Jaskirat Singh",
    location: "Punjab",
    points: 1240,
    initials: "JD",
    badge: "Organic Expert",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Manpreet Singh",
    location: "Punjab",
    points: 1150,
    initials: "MS",
    badge: "Carbon Reducer",
  },
  {
    rank: 5,
    name: "Amit Patel",
    location: "Gujarat",
    points: 980,
    initials: "AP",
    badge: "Green Innovator",
  },
]

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          Green Points Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((farmer) => (
          <div
            key={farmer.rank}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              farmer.isCurrentUser ? "bg-secondary/10 border border-secondary/20" : "bg-muted/50"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8">{getRankIcon(farmer.rank)}</div>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">{farmer.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm truncate">{farmer.name}</h4>
                {farmer.isCurrentUser && (
                  <Badge variant="secondary" className="text-xs">
                    You
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{farmer.location}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-secondary">{farmer.points.toLocaleString()}</div>
              <Badge variant="outline" className="text-xs">
                {farmer.badge}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
