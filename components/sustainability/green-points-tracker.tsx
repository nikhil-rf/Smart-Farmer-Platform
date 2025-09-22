"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Gift, Plus } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  progress?: number
  maxProgress?: number
}

export function GreenPointsTracker() {
  const [totalPoints, setTotalPoints] = useState(1240)
  const [currentLevel, setCurrentLevel] = useState(3)
  const [pointsToNextLevel, setPointsToNextLevel] = useState(260)
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "water-saver",
      title: "Water Saver",
      description: "Save 1000L of water",
      points: 50,
      completed: true,
    },
    {
      id: "organic-champion",
      title: "Organic Champion",
      description: "Use organic methods for 30 days",
      points: 100,
      completed: true,
    },
    {
      id: "carbon-reducer",
      title: "Carbon Reducer",
      description: "Reduce CO₂ by 100kg",
      points: 75,
      completed: false,
      progress: 65,
      maxProgress: 100,
    },
    {
      id: "efficiency-expert",
      title: "Efficiency Expert",
      description: "Achieve 90% resource efficiency",
      points: 150,
      completed: false,
      progress: 78,
      maxProgress: 90,
    },
  ])

  const levelProgress = ((1500 - pointsToNextLevel) / 1500) * 100

  const claimReward = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => (achievement.id === achievementId ? { ...achievement, completed: true } : achievement)),
    )
    const achievement = achievements.find((a) => a.id === achievementId)
    if (achievement) {
      setTotalPoints((prev) => prev + achievement.points)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          Green Points Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Points Overview */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-secondary">{totalPoints.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Total Green Points</p>
          <Badge variant="secondary" className="text-xs">
            Level {currentLevel}
          </Badge>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level {currentLevel}</span>
            <span>Level {currentLevel + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">{pointsToNextLevel} points to next level</p>
        </div>

        {/* Recent Achievements */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Achievements</h4>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="p-3 border border-border rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-sm">{achievement.title}</h5>
                    {achievement.completed && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                  {!achievement.completed && achievement.progress && achievement.maxProgress && (
                    <div className="space-y-1">
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                      <p className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-secondary">+{achievement.points}</div>
                  {achievement.completed ? (
                    <Badge variant="secondary" className="text-xs">
                      Claimed
                    </Badge>
                  ) : (
                    achievement.progress === achievement.maxProgress && (
                      <Button size="sm" variant="outline" onClick={() => claimReward(achievement.id)}>
                        <Gift className="w-3 h-3 mr-1" />
                        Claim
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Earn More Points</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              <Plus className="w-3 h-3 mr-1" />
              Log Activity
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              <Star className="w-3 h-3 mr-1" />
              View Rewards
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
