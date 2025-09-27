import { MainLayout } from "@/components/layout/main-layout"
import { FarmerProfileCard } from "@/components/dashboard/farmer-profile-card"
import { QuickAdvisoryPanel } from "@/components/dashboard/quick-advisory-panel"
import { SustainabilityScorecard } from "@/components/dashboard/sustainability-scorecard"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { QuickStats } from "@/components/dashboard/quick-stats"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">Welcome back, Jaskirat!</h1>
          <p className="text-muted-foreground">Here's what's happening on your farm today.</p>
        </div>

        {/* Top Row - Profile and Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FarmerProfileCard />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickAdvisoryPanel />
          <SustainabilityScorecard />
        </div>

        {/* Notifications */}
        <NotificationCenter />
      </div>
    </MainLayout>
  )
}
