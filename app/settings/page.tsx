"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Laptop,
  Save,
  Bot,
  Rss,
  BarChart,
  BookOpen,
  Lightbulb,
  Terminal,
  Code,
  Github,
  Check,
  PlugZap,
  Play,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedTitle } from "@/components/animated-title"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [temperature, setTemperature] = useState(0.7)

  return (
    <div className="animate-fade-in pb-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <AnimatedTitle title="Application Settings" subtitle="Configure your Android Security Suite preferences" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </motion.div>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="llm" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">LLM</span>
          </TabsTrigger>
          <TabsTrigger value="scraper" className="flex items-center gap-2">
            <Rss className="h-4 w-4" />
            <span className="hidden sm:inline">Scraper</span>
          </TabsTrigger>
          <TabsTrigger value="analyzer" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Knowledge</span>
          </TabsTrigger>
          <TabsTrigger value="solutions" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Solutions</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          {/* System Settings */}
          <TabsContent value="system" className="animate-slide-up">
            <Card className="border border-border/50 mb-6">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                    <span className="font-semibold">Dark Mode</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Use dark theme for the application interface
                    </span>
                  </Label>
                  <Switch id="dark-mode" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-analyze" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Analyze New Findings</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Analyzer triggers automatically after Scraper
                    </span>
                  </Label>
                  <Switch id="auto-analyze" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notifications" className="flex flex-col space-y-1">
                    <span className="font-semibold">Enable UI Notifications</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      For agent completion, errors, etc.
                    </span>
                  </Label>
                  <Switch id="notifications" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="retention" className="font-semibold">
                    Data Retention Period
                  </Label>
                  <Select defaultValue="-1">
                    <SelectTrigger id="retention" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="-1">Indefinitely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear Cache/Temporary Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Laptop className="h-5 w-5 text-primary" />
                  Performance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="parallel-agents" className="flex flex-col space-y-1">
                    <span className="font-semibold">Enable Parallel Agent Execution</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Run multiple agents simultaneously (uses more resources)
                    </span>
                  </Label>
                  <Switch id="parallel-agents" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="max-threads" className="font-semibold">
                    Maximum Concurrent Threads
                  </Label>
                  <Select defaultValue="4">
                    <SelectTrigger id="max-threads" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select maximum threads" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Threads</SelectItem>
                      <SelectItem value="4">4 Threads</SelectItem>
                      <SelectItem value="8">8 Threads</SelectItem>
                      <SelectItem value="16">16 Threads</SelectItem>
                      <SelectItem value="0">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="background-processing" className="flex flex-col space-y-1">
                    <span className="font-semibold">Background Processing</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Continue processing when application is minimized
                    </span>
                  </Label>
                  <Switch id="background-processing" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LLM Settings */}
          <TabsContent value="llm" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  LLM Assistant Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="assistant-proactivity" className="flex flex-col space-y-1">
                    <span className="font-semibold">Enable Assistant Proactivity</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Greetings, automatic report announcements
                    </span>
                  </Label>
                  <Switch id="assistant-proactivity" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="llm-api-key" className="font-semibold">
                    LLM API Key
                  </Label>
                  <div className="flex gap-2">
                    <Input id="llm-api-key" type="password" placeholder="Enter your LLM API Key" className="flex-1" />
                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                      <PlugZap className="h-4 w-4" />
                      Test Connection
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="llm-model" className="font-semibold">
                    LLM Model
                  </Label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger id="llm-model" className="w-full">
                      <SelectValue placeholder="Select LLM model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">OpenAI GPT-4o</SelectItem>
                      <SelectItem value="gpt-4-turbo">OpenAI GPT-4 Turbo</SelectItem>
                      <SelectItem value="gemini-1.5-pro">Google Gemini 1.5 Pro</SelectItem>
                      <SelectItem value="claude-3-sonnet">Anthropic Claude 3 Sonnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature" className="font-semibold">
                      Creativity (Temperature)
                    </Label>
                    <span className="text-sm font-medium">{temperature.toFixed(1)}</span>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1.5}
                    step={0.1}
                    defaultValue={[0.7]}
                    onValueChange={(value) => setTemperature(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="history-length" className="font-semibold">
                    Conversation History Length
                  </Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="history-length" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select history length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Last 5 Messages</SelectItem>
                      <SelectItem value="10">Last 10 Messages</SelectItem>
                      <SelectItem value="20">Last 20 Messages</SelectItem>
                      <SelectItem value="0">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="system-prompts" className="flex flex-col space-y-1">
                    <span className="font-semibold">Use Custom System Prompts</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Define specialized behavior for the assistant
                    </span>
                  </Label>
                  <Switch id="system-prompts" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scraper Agent Settings */}
          <TabsContent value="scraper" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Rss className="h-5 w-5 text-primary" />
                  Scraper Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="monitoring-frequency" className="font-semibold">
                    Monitoring Frequency
                  </Label>
                  <Select defaultValue="1h">
                    <SelectTrigger id="monitoring-frequency" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select monitoring frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15m">Every 15 Minutes</SelectItem>
                      <SelectItem value="30m">Every 30 Minutes</SelectItem>
                      <SelectItem value="1h">Hourly</SelectItem>
                      <SelectItem value="6h">Every 6 Hours</SelectItem>
                      <SelectItem value="1d">Daily</SelectItem>
                      <SelectItem value="manual">Manual Trigger Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="target-sources" className="font-semibold">
                    Target Sources (URLs, Feeds, Keywords - one per line)
                  </Label>
                  <Textarea
                    id="target-sources"
                    placeholder={`https://feeds.example-sec.com/rss\ntwitter:#androidvuln\nsecurityblog.example.com/android`}
                    rows={5}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="js-rendering" className="flex flex-col space-y-1">
                    <span className="font-semibold">Enable JavaScript Rendering</span>
                    <span className="text-sm font-normal text-muted-foreground">For complex sites, slower</span>
                  </Label>
                  <Switch id="js-rendering" className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="max-items" className="font-semibold">
                    Maximum Items per Run
                  </Label>
                  <Input id="max-items" type="number" defaultValue="50" className="w-full sm:w-[250px]" />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="gap-2">
                    <Play className="h-4 w-4" />
                    Run Scraper Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analyzer Agent Settings */}
          <TabsContent value="analyzer" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Analyzer Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="analysis-detail" className="font-semibold">
                    Analysis Detail Level
                  </Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger id="analysis-detail" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select analysis detail level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Only</SelectItem>
                      <SelectItem value="detailed">Detailed Technical Analysis</SelectItem>
                      <SelectItem value="full_report">Full Report Generation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-fetch-cve" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-fetch CVE Details</span>
                    <span className="text-sm font-normal text-muted-foreground">From NVD/MITRE databases</span>
                  </Label>
                  <Switch id="auto-fetch-cve" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="nvd-api-key" className="font-semibold">
                    NVD API Key (Optional, for higher rate limits)
                  </Label>
                  <Input id="nvd-api-key" type="password" placeholder="Enter NVD API Key" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="severity-calculation" className="flex flex-col space-y-1">
                    <span className="font-semibold">Use CVSS for Severity Calculation</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Common Vulnerability Scoring System
                    </span>
                  </Label>
                  <Switch id="severity-calculation" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-categorize" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Categorize Vulnerabilities</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Group by type, component, and impact
                    </span>
                  </Label>
                  <Switch id="auto-categorize" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Management Agent Settings */}
          <TabsContent value="knowledge" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Knowledge Management Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="knowledge-sources" className="font-semibold">
                    Knowledge Sources (Documentation Sites, Repos - one per line)
                  </Label>
                  <Textarea
                    id="knowledge-sources"
                    placeholder={`https://developer.android.com/reference\nhttps://owasp.org/www-project-mobile-security/`}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="update-frequency" className="font-semibold">
                    Update Check Frequency
                  </Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="update-frequency" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select update frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual Trigger Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-summarize" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Summarize New Knowledge</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Create concise summaries of new information
                    </span>
                  </Label>
                  <Switch id="auto-summarize" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="knowledge-indexing" className="flex flex-col space-y-1">
                    <span className="font-semibold">Enable Vector Search Indexing</span>
                    <span className="text-sm font-normal text-muted-foreground">For semantic search capabilities</span>
                  </Label>
                  <Switch id="knowledge-indexing" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Update Knowledge Base Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solution Architect Agent Settings */}
          <TabsContent value="solutions" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Solution Architect Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <Label className="font-semibold mb-3 block">Suggestion Scope:</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sol-code" defaultChecked />
                      <Label htmlFor="sol-code">Code Modifications / Patches</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sol-arch" defaultChecked />
                      <Label htmlFor="sol-arch">Architectural Changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sol-tools" defaultChecked />
                      <Label htmlFor="sol-tools">Security Tool Implementation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sol-config" defaultChecked />
                      <Label htmlFor="sol-config">Configuration Hardening</Label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="prioritize-by" className="font-semibold">
                    Prioritize Suggestions By:
                  </Label>
                  <Select defaultValue="impact">
                    <SelectTrigger id="prioritize-by" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select prioritization method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="impact">Impact / Severity</SelectItem>
                      <SelectItem value="feasibility">Implementation Feasibility</SelectItem>
                      <SelectItem value="speed">Quickest Fixes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="include-references" className="flex flex-col space-y-1">
                    <span className="font-semibold">Include Reference Documentation</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Link to relevant security guidelines and best practices
                    </span>
                  </Label>
                  <Switch id="include-references" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-generate-poc" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Generate Proof of Concept</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Create example implementations for suggested solutions
                    </span>
                  </Label>
                  <Switch id="auto-generate-poc" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toolsmith Agent Settings */}
          <TabsContent value="tools" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Toolsmith Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="tool-discovery" className="font-semibold">
                    Tool Discovery Sources (GitHub Topics, Awesome Lists - one per line)
                  </Label>
                  <Textarea
                    id="tool-discovery"
                    placeholder={`github-topic:android-security\ngithub-list:user/awesome-android-sec`}
                    rows={3}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="tool-update-frequency" className="font-semibold">
                    Update Check Frequency
                  </Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="tool-update-frequency" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select update frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual Trigger Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-test-tools" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Test New Tools</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Automatically test and validate discovered tools
                    </span>
                  </Label>
                  <Switch id="auto-test-tools" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="tool-compatibility" className="flex flex-col space-y-1">
                    <span className="font-semibold">Check Android Version Compatibility</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Verify tools work with target Android versions
                    </span>
                  </Label>
                  <Switch id="tool-compatibility" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Find New Tools Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coder Agent Settings */}
          <TabsContent value="coder" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Coder Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="preferred-language" className="font-semibold">
                    Preferred Language for Scripts
                  </Label>
                  <Select defaultValue="python">
                    <SelectTrigger id="preferred-language" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select preferred language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="bash">Bash Script</SelectItem>
                      <SelectItem value="kotlin">Kotlin Snippet</SelectItem>
                      <SelectItem value="java">Java Snippet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="code-generation-model" className="font-semibold">
                    Code Generation Model
                  </Label>
                  <Select defaultValue="inherit">
                    <SelectTrigger id="code-generation-model" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select code generation model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inherit">Use Main LLM Model</SelectItem>
                      <SelectItem value="codellama">CodeLlama (Specify Variant)</SelectItem>
                      <SelectItem value="gpt-code">GPT (Code Specialized)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="code-comments" className="flex flex-col space-y-1">
                    <span className="font-semibold">Include Code Comments</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Add explanatory comments to generated code
                    </span>
                  </Label>
                  <Switch id="code-comments" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="error-handling" className="flex flex-col space-y-1">
                    <span className="font-semibold">Add Basic Error Handling</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Include try/catch blocks and error checks
                    </span>
                  </Label>
                  <Switch id="error-handling" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="code-optimization" className="flex flex-col space-y-1">
                    <span className="font-semibold">Optimize Code for Performance</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Generate more efficient but potentially complex code
                    </span>
                  </Label>
                  <Switch id="code-optimization" className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GitHub Manager Agent Settings */}
          <TabsContent value="github" className="animate-slide-up">
            <Card className="border border-border/50">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  GitHub Manager Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="github-repo" className="font-semibold">
                    Target GitHub Repository URL
                  </Label>
                  <Input id="github-repo" placeholder="https://github.com/user/repo-name" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="github-pat" className="font-semibold">
                    GitHub Personal Access Token (PAT)
                  </Label>
                  <div className="flex gap-2">
                    <Input id="github-pat" type="password" placeholder="Enter GitHub PAT" className="flex-1" />
                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                      <Check className="h-4 w-4" />
                      Validate Token
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="publish-format" className="font-semibold">
                    Publish Format
                  </Label>
                  <Select defaultValue="markdown">
                    <SelectTrigger id="publish-format" className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Select publish format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markdown">Markdown File in Repo</SelectItem>
                      <SelectItem value="pages">Trigger GitHub Pages Build</SelectItem>
                      <SelectItem value="release">Create GitHub Release Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="target-branch" className="font-semibold">
                    Target Branch
                  </Label>
                  <Input id="target-branch" defaultValue="main" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-publish" className="flex flex-col space-y-1">
                    <span className="font-semibold">Auto-Publish Approved Analysis Reports</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Automatically publish reports to GitHub
                    </span>
                  </Label>
                  <Switch id="auto-publish" className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="commit-template" className="font-semibold">
                    Commit Message Template
                  </Label>
                  <Input id="commit-template" defaultValue="chore: Automated security report [date]" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="include-metadata" className="flex flex-col space-y-1">
                    <span className="font-semibold">Include Report Metadata</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      Add generation date, agent version, and data sources
                    </span>
                  </Label>
                  <Switch id="include-metadata" defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="fixed bottom-6 right-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Save className="mr-2 h-5 w-5" />
            Save All Settings
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
