-- Waterdrop '88 D1 Database Schema
-- Real-time event data for Hurricane Melissa relief

-- RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT,
    name TEXT,
    email TEXT,
    donation_amount REAL DEFAULT 0,
    get_wristband BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT,
    amount REAL NOT NULL,
    donation_type TEXT DEFAULT 'hurricane_relief', -- hurricane_relief, reef_building, general
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Organizations table (Jamaica Relief Network)
CREATE TABLE IF NOT EXISTS organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    focus_area TEXT NOT NULL,
    website TEXT,
    contact_email TEXT,
    wallet_address TEXT,
    status TEXT DEFAULT 'pending', -- pending, verified, rejected
    impact_description TEXT,
    proof_links TEXT, -- JSON array of proof links
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME
);

-- Event statistics table
CREATE TABLE IF NOT EXISTS event_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stat_key TEXT UNIQUE NOT NULL,
    stat_value REAL NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT OR IGNORE INTO event_stats (stat_key, stat_value) VALUES 
    ('total_rsvps', 0),
    ('total_donations', 0),
    ('total_donors', 0),
    ('verified_organizations', 0),
    ('reefs_built', 0),
    ('reef_goal', 100);

-- Insert sample verified organizations
INSERT OR IGNORE INTO organizations (name, focus_area, website, contact_email, wallet_address, status, impact_description) VALUES 
    ('Jamaica Disaster Relief Foundation', 'Emergency Shelter & Food', 'https://jdrf.org', 'contact@jdrf.org', 'JD1...xyz', 'verified', '2,500 families served'),
    ('Caribbean Climate Resilience Initiative', 'Infrastructure Rebuilding', 'https://ccri.org', 'info@ccri.org', 'CC2...abc', 'verified', '15 communities restored'),
    ('Jamaica Healthcare Collective', 'Medical Aid & Supplies', 'https://jhc.org', 'help@jhc.org', 'JH3...def', 'verified', '8 clinics supported');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_event_stats_key ON event_stats(stat_key);
