import { OverviewCards } from "@/components/dashboard/overview-cards"
import { QualityTrendsChart } from "@/components/dashboard/quality-trends-chart"
import { HospitalStatus } from "@/components/dashboard/hospital-status"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of medicine quality assurance network
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <QualityTrendsChart />
          <RecentAlerts />
        </div>
        
        <div>
          <HospitalStatus />
        </div>
      </div>
    </div>
  )
}