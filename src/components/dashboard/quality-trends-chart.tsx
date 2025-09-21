import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", passed: 2847, failed: 43, compliance: 98.5 },
  { month: "Feb", passed: 3124, failed: 38, compliance: 98.8 },
  { month: "Mar", passed: 2956, failed: 52, compliance: 98.3 },
  { month: "Apr", passed: 3287, failed: 29, compliance: 99.1 },
  { month: "May", passed: 3456, failed: 34, compliance: 99.0 },
  { month: "Jun", passed: 3621, failed: 41, compliance: 98.9 },
]

const chartConfig = {
  passed: {
    label: "Passed Tests",
    color: "hsl(var(--success))",
  },
  failed: {
    label: "Failed Tests", 
    color: "hsl(var(--destructive))",
  },
}

export function QualityTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Trends</CardTitle>
        <CardDescription>
          Monthly medicine quality testing results across all hospitals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="passedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="passed"
              stroke="hsl(var(--success))"
              fillOpacity={1}
              fill="url(#passedGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="failed"
              stroke="hsl(var(--destructive))"
              fillOpacity={1}
              fill="url(#failedGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}