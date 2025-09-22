import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wheat, Ruler } from "lucide-react"

export function FarmerProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">JD</span>
          </div>
          Farm Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Wheat className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Primary Crop</p>
              <p className="font-medium">Organic Wheat</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">Punjab, India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Ruler className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Land Size</p>
              <p className="font-medium">25 Acres</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Organic Certified</Badge>
          <Badge variant="outline">Drip Irrigation</Badge>
          <Badge variant="outline">Smart Sensors</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
