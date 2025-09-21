import { useState, useEffect } from "react"
import { Activity, MapPin, Zap, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"

// Simulated real-time data
const generateRandomActivity = () => ({
  id: Math.random().toString(36).substr(2, 9),
  hospital: ["Metro General", "Central Medical", "University Medical", "Regional Health", "Community Hospital"][Math.floor(Math.random() * 5)],
  node: `Node ${Math.floor(Math.random() * 12) + 1}`,
  action: ["Test Started", "Test Completed", "Sample Received", "Analysis Running", "Quality Check"][Math.floor(Math.random() * 5)],
  batch: `${["MG", "CM", "UM", "RH", "CH"][Math.floor(Math.random() * 5)]}-2024-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
  timestamp: new Date().toLocaleTimeString(),
  status: ["success", "warning", "info"][Math.floor(Math.random() * 3)]
})

const nodeStatuses = [
  { id: "node-1", name: "Node 1", hospital: "Metro General", location: "Lab A", status: "active", load: 87 },
  { id: "node-2", name: "Node 2", hospital: "Metro General", location: "Lab B", status: "active", load: 65 },
  { id: "node-3", name: "Node 3", hospital: "Central Medical", location: "Main Lab", status: "warning", load: 94 },
  { id: "node-4", name: "Node 4", hospital: "University Medical", location: "Research Wing", status: "active", load: 72 },
  { id: "node-5", name: "Node 5", hospital: "Regional Health", location: "Pharmacy", status: "offline", load: 0 },
  { id: "node-6", name: "Node 6", hospital: "Community Hospital", location: "Quality Control", status: "active", load: 58 },
]

export default function RealTimeMonitor() {
  const [activities, setActivities] = useState<ReturnType<typeof generateRandomActivity>[]>([])

  useEffect(() => {
    // Initial activities
    setActivities(Array.from({ length: 10 }, generateRandomActivity))

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActivities(prev => [generateRandomActivity(), ...prev].slice(0, 20))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4 text-success animate-pulse-medical" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "offline":
        return <Zap className="h-4 w-4 text-destructive" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "warning":
        return "warning"
      case "offline":
        return "danger"
      default:
        return "neutral"
    }
  }

  const getLoadColor = (load: number) => {
    if (load >= 90) return "text-destructive"
    if (load >= 75) return "text-warning"
    return "text-success"
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Real-time Monitor</h1>
        <p className="text-muted-foreground">
          Live monitoring of all quality testing nodes and activities
        </p>
      </div>

      {/* Network Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Nodes</p>
                <p className="text-3xl font-bold">142</p>
              </div>
              <Activity className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">High Load</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-danger text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Offline</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <Zap className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Tests/Hour</p>
                <p className="text-3xl font-bold">847</p>
              </div>
              <Activity className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-3 w-3 bg-success rounded-full animate-pulse-medical"></div>
              Live Activity Feed
            </CardTitle>
            <CardDescription>
              Real-time stream of testing activities across all nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card/50 animate-slide-up"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse-medical"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.hospital} • {activity.node}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {activity.batch}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Node Status Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Node Status</CardTitle>
            <CardDescription>
              Current status and load of all testing nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nodeStatuses.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(node.status)}
                      <div>
                        <h4 className="font-medium">{node.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {node.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{node.hospital}</div>
                      <div className={`text-xs font-mono ${getLoadColor(node.load)}`}>
                        Load: {node.load}%
                      </div>
                    </div>
                    
                    <StatusBadge variant={getStatusVariant(node.status)} size="sm">
                      {node.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}