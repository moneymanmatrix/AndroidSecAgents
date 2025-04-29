// Mock data for development and fallback scenarios
export const mockData = {
  agents: [
    {
      id: 1,
      name: "Scraper Agent",
      status: "Completed",
      last_run: new Date().toISOString(),
      summary: "Found 5 new potential vulnerabilities",
    },
    {
      id: 2,
      name: "Analyzer Agent",
      status: "Running",
      last_run: new Date().toISOString(),
      summary: "Analyzing CVE-2024-12345 and 3 other vulnerabilities",
    },
    {
      id: 3,
      name: "Researcher Agent",
      status: "Idle",
      last_run: new Date().toISOString(),
      summary: "Last added 12 new knowledge items",
    },
    {
      id: 4,
      name: "Solution Architect Agent",
      status: "Idle",
      last_run: new Date().toISOString(),
      summary: "Generated 3 mitigation strategies for recent vulnerabilities",
    },
    {
      id: 5,
      name: "Toolsmith Agent",
      status: "Error",
      last_run: new Date().toISOString(),
      summary: "Failed to compile latest detection tool - dependency issue",
    },
  ],
  vulnerabilities: [
    {
      id: 1,
      source_url: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12345",
      title: "Buffer Overflow in Android System Component",
      description:
        "A buffer overflow vulnerability in the Android System Component allows attackers to execute arbitrary code.",
      date_found: new Date().toISOString(),
      status: "New",
      severity: "Critical",
    },
    {
      id: 2,
      source_url: "https://android-developers.googleblog.com/security/update-april-2024",
      title: "April 2024 Android Security Bulletin",
      description: "Google has released the April 2024 Android Security Bulletin, addressing multiple vulnerabilities.",
      date_found: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "New",
      severity: "High",
    },
    {
      id: 3,
      source_url: "https://example.com/android-security/vulnerability-123",
      title: "Remote Code Execution in WebView Component",
      description: "A vulnerability in the WebView component allows remote attackers to execute arbitrary code.",
      date_found: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "Analyzed",
      severity: "Critical",
    },
    {
      id: 4,
      source_url: "https://example.com/android-security/vulnerability-456",
      title: "Privilege Escalation in Android Bluetooth Stack",
      description: "A vulnerability in the Bluetooth stack allows local attackers to escalate privileges.",
      date_found: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      status: "New",
      severity: "High",
    },
  ],
  chat_messages: [
    {
      id: 1,
      role: "assistant",
      content: "Welcome to the Android Security Assistant! How can I help you analyze threats today?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      role: "user",
      content: "Can you tell me about the latest Android vulnerabilities?",
      timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    },
    {
      id: 3,
      role: "assistant",
      content:
        "I've identified several recent vulnerabilities in Android systems. The most critical ones include a buffer overflow in the media framework (CVE-2024-12345) and a privilege escalation issue in the Bluetooth stack (CVE-2024-23456). Would you like me to analyze these in more detail?",
      timestamp: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
    },
  ],
  user_settings: [
    {
      id: 1,
      setting_key: "dark_mode",
      setting_value: "true",
    },
    {
      id: 2,
      setting_key: "notification_enabled",
      setting_value: "true",
    },
  ],
}

// Helper function to get mock data for a specific table
export function getMockData(table: string) {
  return mockData[table as keyof typeof mockData] || []
}
