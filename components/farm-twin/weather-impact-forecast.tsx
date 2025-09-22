import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, CloudRain, Sun, AlertTriangle, Droplets } from "lucide-react"

const weatherForecast = [
  {
    day: "Today",
    condition: "Partly Cloudy",
    temp: { high: 28, low: 18 },
    humidity: 65,
    rainfall: 0,
    impact: "Optimal",
    icon: Cloud,
  },
  {
    day: "Tomorrow",
    condition: "Light Rain",
    temp: { high: 25, low: 16 },
    humidity: 80,
    rainfall: 5,
    impact: "Beneficial",
    icon: CloudRain,
  },
  {
    day: "Day 3",
    condition: "Heavy Rain",
    temp: { high: 22, low: 15 },
    humidity: 90,
    rainfall: 25,
    impact: "Risk",
    icon: CloudRain,
  },
  {
    day: "Day 4",
    condition: "Sunny",
    temp: { high: 30, low: 20 },
    humidity: 55,
    rainfall: 0,
    impact: "Good",
    icon: Sun,
  },
  {
    day: "Day 5",
    condition: "Sunny",
    temp: { high: 32, low: 22 },
    humidity: 50,
    rainfall: 0,
    impact: "Monitor",
    icon: Sun,
  },
]

const alerts = [
  {
    type: "warning",
    title: "Heavy Rain Alert",
    message: "25mm rainfall expected on Day 3. Consider drainage and fungal disease prevention.",
    action: "Apply preventive fungicide spray before rain",
  },
  {
    type: "info",
    title: "Optimal Growth Conditions",
    message: "Next 2 days show ideal conditions for wheat flowering stage.",
    action: "Monitor crop development closely",
  },
]

export function WeatherImpactForecast() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Optimal":
        return "bg-green-100 text-green-800"
      case "Beneficial":
        return "bg-blue-100 text-blue-800"
      case "Good":
        return "bg-green-100 text-green-800"
      case "Monitor":
        return "bg-yellow-100 text-yellow-800"
      case "Risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Weather Impact Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weather Forecast */}
        <div className="space-y-3">
          {weatherForecast.map((day, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <day.icon className="w-6 h-6 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{day.day}</span>
                  <Badge className={getImpactColor(day.impact)} variant="secondary">
                    {day.impact}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{day.condition}</span>
                  <span>
                    {day.temp.high}°/{day.temp.low}°C
                  </span>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span>{day.rainfall}mm</span>
                </div>
                <div className="text-muted-foreground">{day.humidity}% humidity</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weather Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Weather Alerts</h4>
          {alerts.map((alert, index) => (
            <Alert key={index} className={alert.type === "warning" ? "border-yellow-200" : "border-blue-200"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-sm">{alert.message}</div>
                  <div className="text-xs text-muted-foreground italic">Recommendation: {alert.action}</div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">5-Day Impact Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-green-600">Positive Impacts</div>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Adequate moisture for flowering</li>
                <li>• Optimal temperature range</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-red-600">Risk Factors</div>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Heavy rain on Day 3</li>
                <li>• High temperature on Day 5</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
