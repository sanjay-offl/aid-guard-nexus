import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MetricCard } from "@/components/ui/metric-card"
import { TrendingUp, TrendingDown, Activity, Target, Users, Building2 } from "lucide-react"

const monthlyData = [
  { month: "Jan", tests: 2847, passed: 2804, failed: 43, compliance: 98.5 },
  { month: "Feb", tests: 3124, passed: 3086, failed: 38, compliance: 98.8 },
  { month: "Mar", tests: 2956, passed: 2904, failed: 52, compliance: 98.3 },
  { month: "Apr", tests: 3287, passed: 3258, failed: 29, compliance: 99.1 },
  { month: "May", tests: 3456, passed: 3422, failed: 34, compliance: 99.0 },
  { month: "Jun", tests: 3621, passed: 3580, failed: 41, compliance: 98.9 },
]

const hospitalPerformance = [
  { name: "Metro General", tests: 1247, compliance: 98.7, efficiency: 94 },
  { name: "Central Medical", tests: 892, compliance: 99.2, efficiency: 97 },
  { name: "University Medical", tests: 1456, compliance: 99.5, efficiency: 89 },
  { name: "Regional Health", tests: 634, compliance: 97.8, efficiency: 91 },
  { name: "Community Hospital", tests: 392, compliance: 98.1, efficiency: 88 },
]

const testTypeDistribution = [
  { name: "Chemical Analysis", value: 45, count: 1629 },
  { name: "Biological Testing", value: 30, count: 1086 },
  { name: "Visual Inspection", value: 25, count: 906 },
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))']

const chartConfig = {
  tests: { label: "Total Tests", color: "hsl(var(--primary))" },
  passed: { label: "Passed", color: "hsl(var(--success))" },
  failed: { label: "Failed", color: "hsl(var(--destructive))" },
  compliance: { label: "Compliance %", color: "hsl(var(--info))" },
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and insights for medicine quality assurance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tests (6 months)"
          value="19,291"
          description="medicines analyzed"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
          trendValue="+15.2%"
        />
        
        <MetricCard
          title="Average Compliance"
          value="98.9%"
          description="across all hospitals"
          icon={<Target className="h-4 w-4" />}
          trend="up"
          trendValue="+0.4%"
          variant="success"
        />
        
        <MetricCard
          title="Active Hospitals"
          value="38"
          description="in network"
          icon={<Building2 className="h-4 w-4" />}
          trend="up"
          trendValue="+3"
        />
        
        <MetricCard
          title="Efficiency Score"
          value="92.3%"
          description="average processing"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="down"
          trendValue="-1.2%"
          variant="warning"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Testing Trends</CardTitle>
            <CardDescription>
              Test volume and compliance rates over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="tests" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Test Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Test Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of different quality testing methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={testTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {testTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {testTypeDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.count} tests</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hospital Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hospital Performance Comparison</CardTitle>
            <CardDescription>
              Test volume, compliance rates, and efficiency by hospital
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={hospitalPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="tests" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="compliance" 
                  fill="hsl(var(--success))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}