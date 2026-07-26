-- Enable PostGIS extension if not enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Table des annonces STEG
CREATE TABLE IF NOT EXISTS steg_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facebook_post_id VARCHAR(255) UNIQUE,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    raw_text TEXT NOT NULL,
    parsed_data JSONB,
    source VARCHAR(50) DEFAULT 'MANUAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    restoration_status VARCHAR(50) DEFAULT 'ACTIVE' -- 'ACTIVE', 'RESTORED_PENDING', 'CONFIRMED_RESTORED', 'EXPIRED'
);

-- 2. Table des zones affectées
CREATE TABLE IF NOT EXISTS steg_affected_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID REFERENCES steg_announcements(id) ON DELETE CASCADE,
    area_name VARCHAR(255) NOT NULL,
    transliterated_name VARCHAR(255),
    delegation_id INTEGER,
    geometry GEOMETRY(Polygon, 4326),
    coordinates GEOMETRY(Point, 4326)
);

-- 3. Table des votes citoyens de rétablissement (الضو رجع / مزال)
CREATE TABLE IF NOT EXISTS steg_restoration_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID REFERENCES steg_announcements(id) ON DELETE CASCADE,
    delegation_id INTEGER NOT NULL,
    device_hash VARCHAR(255) NOT NULL,
    vote VARCHAR(10) NOT NULL CHECK (vote IN ('RESTORED', 'STILL_OFF')), -- 'RESTORED' (الضو رجع) or 'STILL_OFF' (مزال)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(announcement_id, device_hash)
);

-- Index pour requêtes rapides
CREATE INDEX IF NOT EXISTS idx_steg_announcements_date ON steg_announcements(date);
CREATE INDEX IF NOT EXISTS idx_steg_announcements_active ON steg_announcements(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_steg_announcements_restoration ON steg_announcements(restoration_status);
CREATE INDEX IF NOT EXISTS idx_steg_areas_announcement ON steg_affected_areas(announcement_id);
CREATE INDEX IF NOT EXISTS idx_steg_areas_delegation ON steg_affected_areas(delegation_id);
CREATE INDEX IF NOT EXISTS idx_steg_votes_announcement ON steg_restoration_votes(announcement_id);
