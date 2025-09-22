import { MainLayout } from "@/components/layout/main-layout"
import { LiveSensorData } from "@/components/iot/live-sensor-data"
import { SensorCharts } from "@/components/iot/sensor-charts"
import { AlertsPanel } from "@/components/iot/alerts-panel"
import { SensorMap } from "@/components/iot/sensor-map"

export default function IoTPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">IoT Data & Monitoring</h1>
          <p className="text-muted-foreground">Real-time sensor data from your farm</p>
        </div>

        {/* Live Data Cards */}
        <LiveSensorData />

        {/* Charts and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SensorCharts />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>

        {/* Sensor Map */}
        <SensorMap />
      </div>
    </MainLayout>
  )
}
