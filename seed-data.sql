-- Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Idle',
    last_run TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create vulnerabilities table
CREATE TABLE IF NOT EXISTS public.vulnerabilities (
    id SERIAL PRIMARY KEY,
    source_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date_found TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    severity VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    setting_key VARCHAR(255) NOT NULL,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, setting_key)
);

-- Insert sample data for agents
INSERT INTO public.agents (name, status, summary) VALUES
('Scraper Agent', 'Completed', 'Found 5 new potential vulnerabilities'),
('Analyzer Agent', 'Running', 'Analyzing CVE-2024-12345 and 3 other vulnerabilities'),
('Researcher Agent', 'Idle', 'Last added 12 new knowledge items'),
('Solution Architect Agent', 'Idle', 'Generated 3 mitigation strategies for recent vulnerabilities'),
('Toolsmith Agent', 'Error', 'Failed to compile latest detection tool - dependency issue')
ON CONFLICT DO NOTHING;

-- Insert sample data for vulnerabilities
INSERT INTO public.vulnerabilities (source_url, title, description, status, severity) VALUES
('https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12345', 'Buffer Overflow in Android System Component', 'A buffer overflow vulnerability in the Android System Component allows attackers to execute arbitrary code.', 'New', 'Critical'),
('https://android-developers.googleblog.com/security/update-april-2024', 'April 2024 Android Security Bulletin', 'Google has released the April 2024 Android Security Bulletin, addressing multiple vulnerabilities.', 'New', 'High')
ON CONFLICT DO NOTHING;

-- Insert sample data for chat_messages
INSERT INTO public.chat_messages (role, content) VALUES
('assistant', 'Welcome to the Android Security Assistant! How can I help you analyze threats today?')
ON CONFLICT DO NOTHING;
