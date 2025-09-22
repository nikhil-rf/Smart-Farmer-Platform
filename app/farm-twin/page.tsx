import { MainLayout } from "@/components/layout/main-layout"
import { CropGrowthSimulation } from "@/components/farm-twin/crop-growth-simulation"
import { WeatherImpactForecast } from "@/components/farm-twin/weather-impact-forecast"
import { IrrigationPredictor } from "@/components/farm-twin/irrigation-predictor"
import { YieldPredictor } from "@/components/farm-twin/yield-predictor"
import { FieldVisualization } from "@/components/farm-twin/field-visualization"

export default function FarmTwinPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">Farm Digital Twin</h1>
          <p className="text-muted-foreground">AI-powered simulation and prediction for optimal farm management</p>
        </div>

        {/* Field Visualization */}
        <FieldVisualization />

        {/* Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CropGrowthSimulation />
          <WeatherImpactForecast />
        </div>

        {/* Prediction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IrrigationPredictor />
          <YieldPredictor />
        </div>
      </div>
    </MainLayout>
  )
}
