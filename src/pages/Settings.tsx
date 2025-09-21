import { Settings, Database, Shield, Bell, Users, Wifi, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences, security settings, and network parameters
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Configuration
              </CardTitle>
              <CardDescription>
                Basic system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="AID-MQAN Network" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Healthcare Quality Assurance" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">System Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="AI-Driven Decentralized Medicine Quality Assurance Network"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Display Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-refresh Dashboard</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically refresh dashboard data every 30 seconds
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show System Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Display system status indicator in header
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Manage authentication, access control, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Authentication Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                        <SelectItem value="complex">Complex (16+ chars, all requirements)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Access Control</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multi-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require MFA for all user accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Restriction</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit access to approved IP addresses
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all user actions and system events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure alert preferences and notification channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Alert Thresholds</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quality-threshold">Quality Failure Threshold (%)</Label>
                    <Input id="quality-threshold" type="number" defaultValue="85" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="response-time">Max Response Time (seconds)</Label>
                    <Input id="response-time" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send alerts via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Send critical alerts via SMS
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                System Integrations
              </CardTitle>
              <CardDescription>
                Configure external system connections and APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Hospital Systems</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Epic EMR Integration</p>
                      <p className="text-sm text-muted-foreground">Electronic Medical Records</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Cerner PowerChart</p>
                      <p className="text-sm text-muted-foreground">Clinical Information System</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">HL7 FHIR Gateway</p>
                      <p className="text-sm text-muted-foreground">Healthcare Interoperability</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Regulatory Systems</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">FDA GUDID</p>
                      <p className="text-sm text-muted-foreground">Global Unique Device Identification</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">EU EUDAMED</p>
                      <p className="text-sm text-muted-foreground">European Database on Medical Devices</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Settings */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Configuration
              </CardTitle>
              <CardDescription>
                Configure regulatory compliance standards and audit settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Active Standards</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">FDA 21 CFR Part 820</p>
                      <p className="text-sm text-muted-foreground">Quality System Regulation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ISO 13485:2016</p>
                      <p className="text-sm text-muted-foreground">Medical Device Quality Management</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">EU MDR 2017/745</p>
                      <p className="text-sm text-muted-foreground">European Medical Device Regulation</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Audit Configuration</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="audit-frequency">Audit Frequency</Label>
                    <Select defaultValue="quarterly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="biannual">Bi-annual</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention (years)</Label>
                    <Input id="retention-period" type="number" defaultValue="7" />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Compliance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>
                System performance, database, and technical settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Performance Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                    <Input id="cache-duration" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-connections">Max Concurrent Connections</Label>
                    <Input id="max-connections" type="number" defaultValue="1000" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Database Configuration</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup database daily
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Query Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automatic query optimization
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}