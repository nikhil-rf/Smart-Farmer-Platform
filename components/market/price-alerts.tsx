"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, X } from "lucide-react"

interface PriceAlert {
  id: string
  crop: string
  targetPrice: number
  condition: "above" | "below"
  isActive: boolean
}

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      crop: "Wheat",
      targetPrice: 2200,
      condition: "above",
      isActive: true,
    },
    {
      id: "2",
      crop: "Rice",
      targetPrice: 4000,
      condition: "below",
      isActive: true,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    crop: "",
    targetPrice: "",
    condition: "above" as "above" | "below",
  })

  const handleAddAlert = () => {
    if (!newAlert.crop || !newAlert.targetPrice) return

    const alert: PriceAlert = {
      id: Date.now().toString(),
      crop: newAlert.crop,
      targetPrice: Number.parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      isActive: true,
    }

    setAlerts((prev) => [...prev, alert])
    setNewAlert({ crop: "", targetPrice: "", condition: "above" })
    setShowAddForm(false)
  }

  const removeAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const toggleAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Price Alerts
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Alert Form */}
        {showAddForm && (
          <div className="p-3 border border-border rounded-lg space-y-3">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop</Label>
              <Select
                value={newAlert.crop}
                onValueChange={(value) => setNewAlert((prev) => ({ ...prev, crop: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                  <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={newAlert.condition}
                  onValueChange={(value: "above" | "below") => setNewAlert((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="2000"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert((prev) => ({ ...prev, targetPrice: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddAlert}>
                Add Alert
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Active Alerts */}
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No price alerts set</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{alert.crop}</span>
                    <Badge variant={alert.isActive ? "default" : "secondary"}>
                      {alert.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Alert when price goes {alert.condition} ₹{alert.targetPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => toggleAlert(alert.id)} className="h-6 w-6 p-0">
                    <Bell className={`w-3 h-3 ${alert.isActive ? "" : "opacity-50"}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeAlert(alert.id)} className="h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
