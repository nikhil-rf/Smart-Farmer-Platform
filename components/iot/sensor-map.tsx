import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, WifiOff } from "lucide-react"

const sensors = [
  {
    id: "A1",
    name: "Field A - North",
    type: "Moisture & Temperature",
    status: "online",
    position: { x: 20, y: 30 },
    lastReading: "2 min ago",
  },
  {
    id: "A2",
    name: "Field A - South",
    type: "Moisture & pH",
    status: "online",
    position: { x: 25, y: 60 },
    lastReading: "1 min ago",
  },
  {
    id: "B1",
    name: "Field B - Center",
    type: "Full Spectrum",
    status: "offline",
    position: { x: 60, y: 40 },
    lastReading: "15 min ago",
  },
  {
    id: "B2",
    name: "Field B - East",
    type: "Moisture & Humidity",
    status: "online",
    position: { x: 80, y: 50 },
    lastReading: "3 min ago",
  },
  {
    id: "C1",
    name: "Greenhouse",
    type: "Climate Control",
    status: "online",
    position: { x: 45, y: 80 },
    lastReading: "30 sec ago",
  },
]

export function SensorMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Sensor Network Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-green-50 rounded-lg p-4 h-[400px] overflow-hidden">
          {/* Farm layout background */}
          <div className="absolute inset-4">
            {/* Field boundaries */}
            <div className="absolute top-4 left-4 w-1/3 h-1/2 border-2 border-green-300 rounded bg-green-100/50">
              <div className="absolute -top-6 left-2 text-xs font-medium text-green-700">Field A</div>
            </div>
            <div className="absolute top-4 right-4 w-1/3 h-1/2 border-2 border-green-300 rounded bg-green-100/50">
              <div className="absolute -top-6 left-2 text-xs font-medium text-green-700">Field B</div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-1/4 border-2 border-blue-300 rounded bg-blue-100/50">
              <div className="absolute -top-6 left-2 text-xs font-medium text-blue-700">Greenhouse</div>
            </div>

            {/* Sensors */}
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${sensor.position.x}%`,
                  top: `${sensor.position.y}%`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    sensor.status === "online" ? "bg-green-500 border-green-600" : "bg-red-500 border-red-600"
                  } shadow-lg`}
                >
                  {sensor.status === "online" ? (
                    <Wifi className="w-2 h-2 text-white m-0.5" />
                  ) : (
                    <WifiOff className="w-2 h-2 text-white m-0.5" />
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  <div className="text-xs font-medium">{sensor.name}</div>
                  <div className="text-xs text-muted-foreground">{sensor.type}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant={sensor.status === "online" ? "default" : "destructive"} className="text-xs">
                      {sensor.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{sensor.lastReading}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Crop Fields</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Greenhouse</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
