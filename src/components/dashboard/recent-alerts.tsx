import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Quality threshold exceeded",
    description: "Medicine batch MG-2024-001 failed chemical analysis",
    hospital: "Metro General Hospital",
    time: "2 minutes ago",
    status: "active",
  },
  {
    id: 2,
    type: "warning",
    title: "Node connectivity issue",
    description: "Testing node #7 experiencing intermittent connection",
    hospital: "Regional Health System",
    time: "12 minutes ago",
    status: "investigating",
  },
  {
    id: 3,
    type: "success",
    title: "Maintenance completed",
    description: "Scheduled maintenance on nodes 3-6 completed successfully",
    hospital: "Central Medical Center",
    time: "25 minutes ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "info",
    title: "New batch registered",
    description: "Medicine batch UM-2024-047 added to testing queue",
    hospital: "University Medical",
    time: "1 hour ago",
    status: "processed",
  },
]

export function RecentAlerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return <Clock className="h-4 w-4 text-info" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "danger"
      case "investigating":
        return "warning"
      case "resolved":
        return "success"
      default:
        return "info"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          Latest system alerts and notifications across the network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 transition-medical hover:bg-card"
            >
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <StatusBadge variant={getStatusVariant(alert.status)} size="sm">
                    {alert.status}
                  </StatusBadge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{alert.hospital}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}