import { MainLayout } from "@/components/layout/main-layout"
import { AIChat } from "@/components/advisory/ai-chat"
import { MicroAdvisoryTips } from "@/components/advisory/micro-advisory-tips"
import { RecentQueries } from "@/components/advisory/recent-queries"

export default function AdvisoryPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-balance">AI Advisory</h1>
          <p className="text-muted-foreground">Get personalized farming advice powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIChat />
          </div>
          <div className="space-y-6">
            <MicroAdvisoryTips />
            <RecentQueries />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
