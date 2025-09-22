import { MainLayout } from "@/components/layout/main-layout"
import { MarketPrices } from "@/components/market/market-prices"
import { NearbyMarkets } from "@/components/market/nearby-markets"
import { CommunityFeed } from "@/components/market/community-feed"
import { PriceAlerts } from "@/components/market/price-alerts"

export default function MarketPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">Market & Community Hub</h1>
          <p className="text-muted-foreground">Stay updated with market prices and connect with fellow farmers</p>
        </div>

        {/* Market Prices */}
        <MarketPrices />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CommunityFeed />
          </div>
          <div className="space-y-6">
            <NearbyMarkets />
            <PriceAlerts />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
