import { Building2, MapPin, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"

const hospitals = [
  {
    id: 1,
    name: "Metro General Hospital",
    location: "New York, NY",
    nodes: 8,
    status: "online",
    lastTest: "2 min ago",
    compliance: 98.7,
  },
  {
    id: 2,
    name: "Central Medical Center",
    location: "Los Angeles, CA",
    nodes: 6,
    status: "online",
    lastTest: "5 min ago",
    compliance: 99.2,
  },
  {
    id: 3,
    name: "Regional Health System",
    location: "Chicago, IL",
    nodes: 4,
    status: "warning",
    lastTest: "12 min ago",
    compliance: 97.8,
  },
  {
    id: 4,
    name: "University Medical",
    location: "Boston, MA",
    nodes: 12,
    status: "online",
    lastTest: "1 min ago",
    compliance: 99.5,
  },
  {
    id: 5,
    name: "Community Hospital",
    location: "Seattle, WA",
    nodes: 3,
    status: "offline",
    lastTest: "45 min ago",
    compliance: 98.1,
  },
]

export function HospitalStatus() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "online":
        return "success"
      case "warning":
        return "warning"
      case "offline":
        return "danger"
      default:
        return "neutral"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Network Status</CardTitle>
        <CardDescription>
          Real-time status of all connected hospitals and testing nodes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card/50 transition-medical hover:bg-card"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{hospital.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {hospital.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Wifi className="h-3 w-3" />
                    {hospital.nodes} nodes
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {hospital.lastTest}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium">{hospital.compliance}%</div>
                  <div className="text-xs text-muted-foreground">compliance</div>
                </div>
                
                <StatusBadge variant={getStatusVariant(hospital.status)}>
                  {hospital.status}
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}