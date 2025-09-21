import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "success" | "warning" | "danger"
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, description, icon, trend, trendValue, variant = "default", ...props }, ref) => {
    const getTrendColor = () => {
      switch (trend) {
        case "up":
          return "text-success"
        case "down":
          return "text-destructive"
        default:
          return "text-muted-foreground"
      }
    }

    const getVariantStyles = () => {
      switch (variant) {
        case "success":
          return "border-success/20 bg-success/5"
        case "warning":
          return "border-warning/20 bg-warning/5"
        case "danger":
          return "border-destructive/20 bg-destructive/5"
        default:
          return ""
      }
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-medical hover:shadow-card",
          getVariantStyles(),
          className
        )}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="h-4 w-4 text-muted-foreground">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {(description || trendValue) && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {trendValue && (
                <span className={cn("font-medium", getTrendColor())}>
                  {trend === "up" && "↗"} {trend === "down" && "↘"} {trendValue}
                </span>
              )}
              {description && <span>{description}</span>}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }