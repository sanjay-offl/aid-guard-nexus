import { useState } from "react"
import { QrCode, Scan, FlaskConical, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"

const testResults = [
  {
    id: "MG-2024-001",
    name: "Amoxicillin 500mg",
    batch: "MG-2024-001",
    hospital: "Metro General Hospital",
    timestamp: "2024-01-15 14:32:15",
    status: "failed",
    confidence: 94.7,
    tests: {
      chemical: { status: "failed", score: 67.2, threshold: 85 },
      biological: { status: "passed", score: 96.8, threshold: 90 },
      visual: { status: "passed", score: 98.1, threshold: 85 },
    }
  },
  {
    id: "CM-2024-089",
    name: "Ibuprofen 200mg",
    batch: "CM-2024-089",
    hospital: "Central Medical Center",
    timestamp: "2024-01-15 14:28:42",
    status: "passed",
    confidence: 98.3,
    tests: {
      chemical: { status: "passed", score: 96.4, threshold: 85 },
      biological: { status: "passed", score: 97.1, threshold: 90 },
      visual: { status: "passed", score: 99.2, threshold: 85 },
    }
  },
  {
    id: "UM-2024-047",
    name: "Acetaminophen 325mg",
    batch: "UM-2024-047",
    hospital: "University Medical",
    timestamp: "2024-01-15 14:25:18",
    status: "testing",
    confidence: null,
    tests: {
      chemical: { status: "testing", score: null, threshold: 85 },
      biological: { status: "pending", score: null, threshold: 90 },
      visual: { status: "pending", score: null, threshold: 85 },
    }
  },
]

export default function QualityTesting() {
  const [scanMode, setScanMode] = useState(false)
  const [batchId, setBatchId] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "testing":
        return <Clock className="h-4 w-4 text-warning animate-pulse-medical" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "passed":
        return "success"
      case "failed":
        return "danger"
      case "testing":
        return "warning"
      default:
        return "neutral"
    }
  }

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-success"
      case "failed":
        return "text-destructive"
      case "testing":
        return "text-warning"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medicine Quality Testing</h1>
        <p className="text-muted-foreground">
          AI-powered medicine quality assessment and testing interface
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Register New Batch</h3>
                <p className="text-sm opacity-90">Scan or enter batch ID</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <FlaskConical className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Run AI Analysis</h3>
                <p className="text-sm opacity-90">Start quality testing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-medical text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Scan className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Batch Scanner</h3>
                <p className="text-sm opacity-90">Quick barcode scan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batch Registration */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Registration</CardTitle>
          <CardDescription>
            Register a new medicine batch for quality testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter batch ID (e.g., MG-2024-001)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => setScanMode(!scanMode)}>
              <Scan className="h-4 w-4 mr-2" />
              {scanMode ? "Stop Scan" : "Scan Code"}
            </Button>
            <Button variant="default">
              <FlaskConical className="h-4 w-4 mr-2" />
              Start Testing
            </Button>
          </div>
          {scanMode && (
            <div className="mt-4 p-4 border-2 border-dashed border-primary/50 rounded-lg text-center">
              <Scan className="h-12 w-12 mx-auto text-primary mb-2 animate-pulse-medical" />
              <p className="text-sm text-muted-foreground">Position barcode or QR code in view</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
          <CardDescription>
            Latest medicine quality testing results and AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResults.map((result) => (
              <div
                key={result.id}
                className="p-6 border rounded-lg bg-card/50 transition-medical hover:bg-card space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <h3 className="font-semibold">{result.name}</h3>
                      <Badge variant="outline">Batch: {result.batch}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.hospital}</p>
                    <p className="text-xs text-muted-foreground">{result.timestamp}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {result.confidence && (
                      <div className="text-right">
                        <div className="text-sm font-medium">AI Confidence</div>
                        <div className="text-lg font-bold text-primary">{result.confidence}%</div>
                      </div>
                    )}
                    <StatusBadge variant={getStatusVariant(result.status)}>
                      {result.status.toUpperCase()}
                    </StatusBadge>
                  </div>
                </div>

                {/* Test Details */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Chemical Analysis</h4>
                      <span className={`text-sm font-medium ${getTestStatusColor(result.tests.chemical.status)}`}>
                        {result.tests.chemical.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {result.tests.chemical.score && (
                        <div className="flex justify-between text-sm">
                          <span>Score:</span>
                          <span className="font-medium">{result.tests.chemical.score}%</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Threshold:</span>
                        <span>{result.tests.chemical.threshold}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Biological Test</h4>
                      <span className={`text-sm font-medium ${getTestStatusColor(result.tests.biological.status)}`}>
                        {result.tests.biological.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {result.tests.biological.score && (
                        <div className="flex justify-between text-sm">
                          <span>Score:</span>
                          <span className="font-medium">{result.tests.biological.score}%</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Threshold:</span>
                        <span>{result.tests.biological.threshold}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Visual Inspection</h4>
                      <span className={`text-sm font-medium ${getTestStatusColor(result.tests.visual.status)}`}>
                        {result.tests.visual.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {result.tests.visual.score && (
                        <div className="flex justify-between text-sm">
                          <span>Score:</span>
                          <span className="font-medium">{result.tests.visual.score}%</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Threshold:</span>
                        <span>{result.tests.visual.threshold}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}