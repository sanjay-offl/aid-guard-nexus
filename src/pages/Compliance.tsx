import { Shield, CheckCircle, XCircle, AlertTriangle, FileText, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const complianceStandards = [
  {
    id: 1,
    name: "FDA 21 CFR Part 820",
    description: "Quality System Regulation for Medical Devices",
    status: "compliant",
    lastAudit: "2024-01-10",
    nextAudit: "2024-07-10",
    score: 98.5,
    violations: 0,
  },
  {
    id: 2,
    name: "ISO 13485:2016",
    description: "Medical devices - Quality management systems",
    status: "compliant",
    lastAudit: "2024-01-05",
    nextAudit: "2024-07-05",
    score: 97.8,
    violations: 1,
  },
  {
    id: 3,
    name: "EU MDR 2017/745",
    description: "European Medical Device Regulation",
    status: "warning",
    lastAudit: "2023-12-20",
    nextAudit: "2024-06-20",
    score: 89.2,
    violations: 3,
  },
  {
    id: 4,
    name: "ICH Q10",
    description: "Pharmaceutical Quality System",
    status: "compliant",
    lastAudit: "2024-01-15",
    nextAudit: "2024-07-15",
    score: 99.1,
    violations: 0,
  },
]

const recentAudits = [
  {
    id: 1,
    hospital: "Metro General Hospital",
    standard: "FDA 21 CFR Part 820",
    date: "2024-01-10",
    auditor: "Dr. Sarah Johnson",
    result: "Pass",
    score: 98.5,
    findings: 2,
  },
  {
    id: 2,
    hospital: "University Medical",
    standard: "ISO 13485:2016",
    date: "2024-01-05",
    auditor: "Michael Chen",
    result: "Pass",
    score: 97.8,
    findings: 1,
  },
  {
    id: 3,
    hospital: "Regional Health System",
    standard: "EU MDR 2017/745",
    date: "2023-12-20",
    auditor: "Dr. Emily Rodriguez",
    result: "Conditional Pass",
    score: 89.2,
    findings: 3,
  },
]

const violations = [
  {
    id: 1,
    hospital: "Regional Health System",
    standard: "EU MDR 2017/745",
    severity: "medium",
    description: "Incomplete documentation for batch tracking procedures",
    dateReported: "2023-12-20",
    status: "remediation",
    dueDate: "2024-02-20",
  },
  {
    id: 2,
    hospital: "Central Medical Center",
    standard: "ISO 13485:2016",
    severity: "low",
    description: "Minor calibration record discrepancies",
    dateReported: "2024-01-05",
    status: "resolved",
    dueDate: "2024-01-25",
  },
]

export default function Compliance() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "violation":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return <Shield className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "compliant":
        return "success"
      case "warning":
        return "warning"
      case "violation":
        return "danger"
      default:
        return "neutral"
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Regulatory Compliance</h1>
        <p className="text-muted-foreground">
          Monitor compliance with medical device and pharmaceutical regulations
        </p>
      </div>

      {/* Compliance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Compliant Standards</p>
                <p className="text-3xl font-bold">
                  {complianceStandards.filter(s => s.status === "compliant").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Warnings</p>
                <p className="text-3xl font-bold">
                  {complianceStandards.filter(s => s.status === "warning").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Open Violations</p>
                <p className="text-3xl font-bold">
                  {violations.filter(v => v.status !== "resolved").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-medical text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg. Score</p>
                <p className="text-3xl font-bold">96.1%</p>
              </div>
              <Shield className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compliance Standards */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Standards</CardTitle>
            <CardDescription>
              Current compliance status for all regulatory standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceStandards.map((standard) => (
                <div
                  key={standard.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(standard.status)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">{standard.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {standard.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Last Audit: {standard.lastAudit}</span>
                        <span>Next: {standard.nextAudit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <StatusBadge variant={getStatusVariant(standard.status)} size="sm">
                      {standard.status}
                    </StatusBadge>
                    <div className="text-sm">
                      <div className="font-medium">{standard.score}%</div>
                      <div className="text-xs text-muted-foreground">
                        {standard.violations} violations
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Audits */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
            <CardDescription>
              Latest compliance audits and their results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="p-4 rounded-lg border bg-card/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{audit.hospital}</h4>
                      <p className="text-sm text-muted-foreground">{audit.standard}</p>
                    </div>
                    <StatusBadge 
                      variant={audit.result === "Pass" ? "success" : "warning"} 
                      size="sm"
                    >
                      {audit.result}
                    </StatusBadge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score: {audit.score}%</span>
                      <span>{audit.findings} findings</span>
                    </div>
                    <Progress value={audit.score} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Auditor: {audit.auditor}</span>
                      <span>{audit.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Violations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Violations & Remediation</CardTitle>
          <CardDescription>
            Current compliance violations and their remediation status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {violations.map((violation) => (
              <div
                key={violation.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card/50"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <XCircle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">{violation.hospital}</h4>
                      <Badge variant="outline" className="text-xs">
                        {violation.standard}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {violation.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Reported: {violation.dateReported}</span>
                      <span>Due: {violation.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <StatusBadge variant={getSeverityVariant(violation.severity)} size="sm">
                    {violation.severity} severity
                  </StatusBadge>
                  <StatusBadge 
                    variant={violation.status === "resolved" ? "success" : "warning"} 
                    size="sm"
                  >
                    {violation.status}
                  </StatusBadge>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}