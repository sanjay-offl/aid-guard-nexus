import { useState } from "react"
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Quality threshold exceeded",
    description: "Medicine batch MG-2024-001 failed chemical analysis with score 67.2% (threshold: 85%)",
    hospital: "Metro General Hospital",
    timestamp: "2024-01-15T14:32:15Z",
    status: "active",
    priority: "high",
    source: "quality_testing",
    acknowledgedBy: null,
  },
  {
    id: 2,
    type: "warning",
    title: "Node connectivity issue",
    description: "Testing node #7 experiencing intermittent connection issues. Last successful ping: 12 minutes ago",
    hospital: "Regional Health System",
    timestamp: "2024-01-15T14:20:30Z",
    status: "investigating",
    priority: "medium",
    source: "system_monitoring",
    acknowledgedBy: "Michael Chen",
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled maintenance completed",
    description: "Routine maintenance on nodes 3-6 completed successfully. All systems are operational",
    hospital: "Central Medical Center",
    timestamp: "2024-01-15T13:45:22Z",
    status: "resolved",
    priority: "low",
    source: "maintenance",
    acknowledgedBy: "Sarah Johnson",
  },
  {
    id: 4,
    type: "critical",
    title: "Compliance violation detected",
    description: "FDA compliance check failed for batch CM-2024-089. Immediate review required",
    hospital: "Central Medical Center",
    timestamp: "2024-01-15T13:22:18Z",
    status: "active",
    priority: "high",
    source: "compliance",
    acknowledgedBy: null,
  },
  {
    id: 5,
    type: "warning",
    title: "High test load detected",
    description: "Node capacity at 94% for University Medical. Consider load balancing",
    hospital: "University Medical",
    timestamp: "2024-01-15T12:58:45Z",
    status: "monitoring",
    priority: "medium",
    source: "performance",
    acknowledgedBy: "Emily Rodriguez",
  },
  {
    id: 6,
    type: "success",
    title: "Quality improvement milestone",
    description: "Community Hospital achieved 99% compliance rate for the month",
    hospital: "Community Hospital",
    timestamp: "2024-01-15T11:30:12Z",
    status: "resolved",
    priority: "low",
    source: "quality_metrics",
    acknowledgedBy: "Lisa Park",
  },
]

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesPriority = filterPriority === "all" || alert.priority === filterPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />
      default:
        return <Bell className="h-5 w-5 text-info" />
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "danger"
      case "warning":
        return "warning"
      case "success":
        return "success"
      default:
        return "info"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "danger"
      case "investigating":
      case "monitoring":
        return "warning"
      case "resolved":
        return "success"
      default:
        return "neutral"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      case "low":
        return "info"
      default:
        return "neutral"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  const activeAlerts = filteredAlerts.filter(a => a.status === "active")
  const criticalAlerts = filteredAlerts.filter(a => a.type === "critical")
  const unresolvedAlerts = filteredAlerts.filter(a => a.status !== "resolved")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
        <p className="text-muted-foreground">
          Centralized monitoring and management of system alerts and notifications
        </p>
      </div>

      {/* Alert Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-danger text-destructive-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Alerts</p>
                <p className="text-3xl font-bold">{activeAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Critical</p>
                <p className="text-3xl font-bold">{criticalAlerts.length}</p>
              </div>
              <XCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Unresolved</p>
                <p className="text-3xl font-bold">{unresolvedAlerts.length}</p>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Response</p>
                <p className="text-3xl font-bold">4.2min</p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search alerts by title, description, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Alerts ({filteredAlerts.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({criticalAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="transition-medical hover:shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <StatusBadge variant={getTypeVariant(alert.type)} size="sm">
                            {alert.type}
                          </StatusBadge>
                          <StatusBadge variant={getPriorityVariant(alert.priority)} size="sm">
                            {alert.priority} priority
                          </StatusBadge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                      </div>
                      
                      <StatusBadge variant={getStatusVariant(alert.status)}>
                        {alert.status.toUpperCase()}
                      </StatusBadge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{alert.hospital}</span>
                        <span>•</span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.source.replace('_', ' ')}
                        </Badge>
                        {alert.acknowledgedBy && (
                          <>
                            <span>•</span>
                            <span>Ack. by {alert.acknowledgedBy}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {!alert.acknowledgedBy && alert.status === "active" && (
                          <Button variant="outline" size="sm">
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {alert.status === "active" && (
                          <Button size="sm">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Active alerts content would be filtered here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="critical">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Critical alerts content would be filtered here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Resolved alerts content would be filtered here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}