import { MainLayout } from "@/components/layout/main-layout"
import { SustainabilityDashboard } from "@/components/sustainability/sustainability-dashboard"
import { GreenPointsTracker } from "@/components/sustainability/green-points-tracker"
import { EcoRecommendations } from "@/components/sustainability/eco-recommendations"
import { CarbonFootprintChart } from "@/components/sustainability/carbon-footprint-chart"
import { Leaderboard } from "@/components/sustainability/leaderboard"

export default function SustainabilityPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">Sustainability & Green Points</h1>
          <p className="text-muted-foreground">
            Track your environmental impact and earn rewards for sustainable practices
          </p>
        </div>

        {/* Sustainability Overview */}
        <SustainabilityDashboard />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CarbonFootprintChart />
            <EcoRecommendations />
          </div>
          <div className="space-y-6">
            <GreenPointsTracker />
            <Leaderboard />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
