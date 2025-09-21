import { useState } from "react"
import { Building2, MapPin, Wifi, Plus, Settings, Users, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const hospitals = [
  {
    id: 1,
    name: "Metro General Hospital",
    location: "New York, NY",
    address: "123 Medical Center Dr, New York, NY 10001",
    nodes: 8,
    status: "online",
    lastTest: "2 min ago",
    compliance: 98.7,
    testsToday: 247,
    staff: 12,
    established: "2019",
  },
  {
    id: 2,
    name: "Central Medical Center",
    location: "Los Angeles, CA",
    address: "456 Health Plaza, Los Angeles, CA 90210",
    nodes: 6,
    status: "online",
    lastTest: "5 min ago",
    compliance: 99.2,
    testsToday: 189,
    staff: 8,
    established: "2020",
  },
  {
    id: 3,
    name: "Regional Health System",
    location: "Chicago, IL",
    address: "789 Care Avenue, Chicago, IL 60601",
    nodes: 4,
    status: "warning",
    lastTest: "12 min ago",
    compliance: 97.8,
    testsToday: 134,
    staff: 6,
    established: "2021",
  },
  {
    id: 4,
    name: "University Medical",
    location: "Boston, MA",
    address: "321 Research Blvd, Boston, MA 02101",
    nodes: 12,
    status: "online",
    lastTest: "1 min ago",
    compliance: 99.5,
    testsToday: 356,
    staff: 18,
    established: "2018",
  },
  {
    id: 5,
    name: "Community Hospital",
    location: "Seattle, WA",
    address: "654 Community St, Seattle, WA 98101",
    nodes: 3,
    status: "offline",
    lastTest: "45 min ago",
    compliance: 98.1,
    testsToday: 67,
    staff: 4,
    established: "2022",
  },
]

export default function Hospitals() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null)

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hospital Management</h1>
          <p className="text-muted-foreground">
            Manage hospitals in the AID-MQAN quality assurance network
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Hospital
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hospital</DialogTitle>
              <DialogDescription>
                Register a new hospital to the AID-MQAN network
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input id="hospital-name" placeholder="Enter hospital name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full address" />
              </div>
              <Button>Register Hospital</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Network Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Hospitals</p>
                <p className="text-3xl font-bold">{hospitals.length}</p>
              </div>
              <Building2 className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Online</p>
                <p className="text-3xl font-bold">
                  {hospitals.filter(h => h.status === "online").length}
                </p>
              </div>
              <Activity className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Warning</p>
                <p className="text-3xl font-bold">
                  {hospitals.filter(h => h.status === "warning").length}
                </p>
              </div>
              <Settings className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-medical text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Nodes</p>
                <p className="text-3xl font-bold">
                  {hospitals.reduce((sum, h) => sum + h.nodes, 0)}
                </p>
              </div>
              <Wifi className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search hospitals by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="grid gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="transition-medical hover:shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                {/* Hospital Info */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{hospital.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {hospital.location}
                      </div>
                      <p className="text-sm text-muted-foreground">{hospital.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">Est. {hospital.established}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {hospital.staff} staff
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{hospital.nodes}</div>
                    <div className="text-xs text-muted-foreground">Active Nodes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{hospital.testsToday}</div>
                    <div className="text-xs text-muted-foreground">Tests Today</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{hospital.compliance}%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                  
                  <div className="text-center">
                    <StatusBadge variant={getStatusVariant(hospital.status)}>
                      {hospital.status}
                    </StatusBadge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {hospital.lastTest}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hospital Details Dialog */}
      <Dialog open={!!selectedHospital} onOpenChange={() => setSelectedHospital(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedHospital?.name}</DialogTitle>
            <DialogDescription>Hospital details and performance metrics</DialogDescription>
          </DialogHeader>
          {selectedHospital && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Location</Label>
                  <p className="text-sm">{selectedHospital.location}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <StatusBadge variant={getStatusVariant(selectedHospital.status)}>
                      {selectedHospital.status}
                    </StatusBadge>
                  </div>
                </div>
                <div>
                  <Label>Active Nodes</Label>
                  <p className="text-sm">{selectedHospital.nodes}</p>
                </div>
                <div>
                  <Label>Compliance Rate</Label>
                  <p className="text-sm">{selectedHospital.compliance}%</p>
                </div>
                <div>
                  <Label>Tests Today</Label>
                  <p className="text-sm">{selectedHospital.testsToday}</p>
                </div>
                <div>
                  <Label>Staff Count</Label>
                  <p className="text-sm">{selectedHospital.staff}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}