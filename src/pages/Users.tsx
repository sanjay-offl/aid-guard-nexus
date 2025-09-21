import { useState } from "react"
import { Users, Plus, Shield, UserCheck, UserX, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const users = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "s.johnson@aidmqan.com",
    role: "System Administrator",
    hospital: "Metro General Hospital",
    status: "active",
    lastLogin: "2 hours ago",
    permissions: ["full_access", "user_management", "system_config"],
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@aidmqan.com",
    role: "Quality Officer",
    hospital: "Central Medical Center",
    status: "active",
    lastLogin: "15 minutes ago",
    permissions: ["quality_testing", "compliance_review", "reports"],
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "e.rodriguez@aidmqan.com",
    role: "Pharmacist",
    hospital: "University Medical",
    status: "active",
    lastLogin: "3 hours ago",
    permissions: ["testing_review", "batch_approval"],
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@aidmqan.com",
    role: "Lab Technician",
    hospital: "Regional Health System",
    status: "inactive",
    lastLogin: "2 days ago",
    permissions: ["test_execution", "sample_handling"],
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    email: "l.park@aidmqan.com",
    role: "Compliance Manager",
    hospital: "Community Hospital",
    status: "active",
    lastLogin: "1 hour ago",
    permissions: ["compliance_audit", "regulatory_reports", "violation_management"],
    avatar: "/api/placeholder/40/40",
  },
]

const roles = [
  {
    name: "System Administrator",
    permissions: ["full_access", "user_management", "system_config"],
    count: 1,
  },
  {
    name: "Quality Officer", 
    permissions: ["quality_testing", "compliance_review", "reports"],
    count: 2,
  },
  {
    name: "Pharmacist",
    permissions: ["testing_review", "batch_approval", "inventory_management"],
    count: 3,
  },
  {
    name: "Lab Technician",
    permissions: ["test_execution", "sample_handling"],
    count: 8,
  },
  {
    name: "Compliance Manager",
    permissions: ["compliance_audit", "regulatory_reports", "violation_management"],
    count: 2,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "warning"
      case "suspended":
        return "danger"
      default:
        return "neutral"
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions across the AID-MQAN network
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account for the AID-MQAN system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="Enter full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-hospital">Hospital</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metro General Hospital</SelectItem>
                    <SelectItem value="central">Central Medical Center</SelectItem>
                    <SelectItem value="university">University Medical</SelectItem>
                    <SelectItem value="regional">Regional Health System</SelectItem>
                    <SelectItem value="community">Community Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Users</p>
                <p className="text-3xl font-bold">
                  {users.filter(u => u.status === "active").length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Inactive Users</p>
                <p className="text-3xl font-bold">
                  {users.filter(u => u.status === "inactive").length}
                </p>
              </div>
              <UserX className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-medical text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Roles</p>
                <p className="text-3xl font-bold">{roles.length}</p>
              </div>
              <Shield className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search users by name, email, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.name} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>
            Manage user accounts and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card/50 transition-medical hover:bg-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{user.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.hospital}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium">Last Login</div>
                    <div className="text-xs text-muted-foreground">{user.lastLogin}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">Permissions</div>
                    <div className="text-xs text-muted-foreground">
                      {user.permissions.length} assigned
                    </div>
                  </div>
                  
                  <StatusBadge variant={getStatusVariant(user.status)} size="sm">
                    {user.status}
                  </StatusBadge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Role Distribution</CardTitle>
          <CardDescription>
            Overview of user roles and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div
                key={role.name}
                className="p-4 rounded-lg border bg-card/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{role.name}</h4>
                  <Badge variant="outline">{role.count} users</Badge>
                </div>
                <div className="space-y-1">
                  {role.permissions.map((permission) => (
                    <div key={permission} className="text-xs text-muted-foreground">
                      • {permission.replace('_', ' ')}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}