import { Activity, Building2, FlaskConical, Shield, TrendingUp, Users } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Nodes"
        value="147"
        description="across 38 hospitals"
        icon={<Activity className="h-4 w-4" />}
        trend="up"
        trendValue="+12%"
        variant="success"
      />
      
      <MetricCard
        title="Tests Today"
        value="2,847"
        description="medicines tested"
        icon={<FlaskConical className="h-4 w-4" />}
        trend="up"
        trendValue="+8.2%"
      />
      
      <MetricCard
        title="Pass Rate"
        value="98.7%"
        description="quality compliance"
        icon={<Shield className="h-4 w-4" />}
        trend="up"
        trendValue="+0.3%"
        variant="success"
      />
      
      <MetricCard
        title="Alert Resolution"
        value="4.2min"
        description="average response time"
        icon={<TrendingUp className="h-4 w-4" />}
        trend="down"
        trendValue="-1.8min"
        variant="success"
      />
    </div>
  )
}