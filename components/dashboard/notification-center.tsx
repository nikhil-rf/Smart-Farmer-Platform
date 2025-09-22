import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Soil Moisture Detected",
    message: "Field A sensor shows moisture level at 15%. Irrigation recommended.",
    time: "10 minutes ago",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "weather",
    title: "Rain Forecast",
    message: "Light rain expected tomorrow. Consider delaying irrigation schedule.",
    time: "1 hour ago",
    icon: Info,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "success",
    title: "Harvest Goal Achieved",
    message: "Congratulations! You've exceeded your monthly sustainability target.",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
]

export function NotificationCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
            <notification.icon className={`w-5 h-5 mt-0.5 ${notification.color}`} />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
