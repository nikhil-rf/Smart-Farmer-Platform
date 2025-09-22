import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock } from "lucide-react"

const markets = [
  {
    id: "1",
    name: "Ludhiana Grain Market",
    distance: "12 km",
    rating: 4.5,
    speciality: "Wheat, Rice",
    contact: "+91 98765 43210",
    timings: "6 AM - 6 PM",
    status: "open",
  },
  {
    id: "2",
    name: "Amritsar Agricultural Mandi",
    distance: "25 km",
    rating: 4.2,
    speciality: "Basmati Rice",
    contact: "+91 98765 43211",
    timings: "5 AM - 7 PM",
    status: "open",
  },
  {
    id: "3",
    name: "Bathinda Cotton Market",
    distance: "45 km",
    rating: 4.0,
    speciality: "Cotton, Oilseeds",
    contact: "+91 98765 43212",
    timings: "7 AM - 5 PM",
    status: "closed",
  },
]

export function NearbyMarkets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Nearby Markets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {markets.map((market) => (
          <div key={market.id} className="p-3 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{market.name}</h4>
                <p className="text-xs text-muted-foreground">{market.speciality}</p>
              </div>
              <Badge variant={market.status === "open" ? "default" : "secondary"}>{market.status}</Badge>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{market.distance} away</span>
                <span>★ {market.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{market.timings}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>{market.contact}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
              Get Directions
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
