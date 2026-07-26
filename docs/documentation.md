⚡ dar Dhaw (دار الضو) - Project Architecture & Documentation

Version: 2.0

Type: Real-Time Spatial Crowdsourcing & Official Data Platform (PWA)

Region: Tunisia

📖 1. Project Overview & Philosophy

dar Dhaw (Translates to "House of Light") is a hybrid platform that merges community-driven crowdsourcing with automated official data (STEG) to provide real-time, accurate visibility over the Tunisian power grid. In the absence of real-time public APIs, this platform empowers the community to report outages and restores visibility over local neighborhoods.

🌟 Design Philosophy: "The Energy Pulse"

Core Concept: "The grid is alive. Every pulse tells a story of power, community, and resilience."

Visual Identity: A high-end experience rivaling top-tier products like Google Maps and Uber, but distinctly Tunisian.

Aesthetics: Glowing neon visuals, flowing gradients, and dynamic pulses on a dark map.

Data Trust: Clear visual distinction between Official STEG Data (Red) and Community Data (Amber).

🗺️ 2. Core Map & Spatial Architecture

A. The Hexagonal Grid System

To provide granular, privacy-preserving outage data without exposing exact user locations, the map utilizes a dynamic hexagonal grid:

Generation: 2km² hexagons are generated over the map using Turf.js.

Rendering: Optimized WebGL rendering for 60fps mobile performance.

Status Calculation: Hexagon colors (neon red/amber) are computed dynamically based on the density of outage reports within their boundaries.

B. Dynamic Governorate Bounding

To reduce cognitive load and improve performance, users can focus on specific regions:

Interaction: Selecting a governorate (e.g., "Sfax") triggers Map.fitBounds(sfaxBounds).

Visual Focus: The selected governorate remains clearly visible while other regions are dimmed via opacity filters.

🔒 3. Zone Control & Consensus Engine

To ensure data integrity, prevent abuse, and build a trusted crowd-sourced model, the platform implements a robust Zone Control Architecture:

Feature

Description

Location Detection

Auto-detects user's delegation via GPS + PostGIS point-in-polygon.

Manual Selection

Fallback for users who deny location permissions.

Vote Restriction

Users can only vote (report) within their assigned/detected zone.

Session Persistence

User's zone is cached in localStorage for quick re-entry.

Zone Lock (Anti-Spam)

10-minute lock applied per zone after state changes to prevent flip-flopping.

User Lock (Rate Limiting)

10-minute lock per user preventing rapid consecutive voting.

Admin Override

Admins bypass restrictions to moderate or correct zones.

Visual Indicators

A distinct "VOTRE ZONE" badge highlights the user's current delegation.

Offline Resilience (PWA)

If a user tries to report an outage but their 3G/4G is down (common during blackouts), the report is staged in the browser's IndexedDB. Once navigator.onLine fires (connection restored), a background Service Worker sync pushes the data to Supabase.

🤖 4. STEG Facebook Post Automation (The Game Changer)

dar Dhaw acts as the single source of truth by autonomously scraping, parsing, and mapping official STEG (Société Tunisienne de l'Électricité et du Gaz) announcements.

The Automation Workflow:

Detection: A background worker monitors STEG's official Facebook page for outage announcements.

Parsing: NLP parses Arabic text to extract dates, times, and affected areas (e.g., قفصة الشمالية).

Fuzzy Matching: Extracted area names are transliterated and matched to internal delegation IDs (tunisia_delegations).

Display: Official outages are rendered on the map as pulsing red polygons, fully aware of the time range (only displayed when active).

Database Schema (Supabase PostgreSQL)

CREATE TABLE steg_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facebook_post_id VARCHAR(255) UNIQUE,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    raw_text TEXT NOT NULL,
    parsed_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE steg_affected_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID REFERENCES steg_announcements(id) ON DELETE CASCADE,
    area_name VARCHAR(255) NOT NULL,
    transliterated_name VARCHAR(255),
    delegation_id INTEGER REFERENCES tunisia_delegations(id),
    geometry GEOMETRY(Polygon, 4326),
    coordinates GEOMETRY(Point, 4326)
);

CREATE INDEX idx_steg_announcements_date ON steg_announcements(date);
CREATE INDEX idx_steg_areas_geometry ON steg_affected_areas USING GIST(geometry);


🏆 5. Gamification & User Habits

To encourage rapid reporting, the platform uses a habit-forming loop:

Audio Notifications: When power returns, users receive a push notification with a custom audio chime: "الضو رجع! الحمد لله. رجع التيار الكهربائي" (The light is back!).

Grid Guardian Badges: Users earn points and badges (e.g., Sentinelle Locale, Capitaine du Réseau) for accurate and fast reporting.

Community Trust: High-accuracy users gain more weight in the Consensus Engine.

🚀 6. Implementation Priorities (Roadmap)

The development roadmap is strictly prioritized to deliver core value rapidly:

[P0 - Critical] GPS auto-focus on user delegation.

[P0 - Critical] 2km² hexagon generation & WebGL rendering.

[P1 - High] Hexagon status calculation algorithm & Supabase Realtime WS integration.

[P1 - High] Governorate bounds filtering & dimming.

[P2 - Medium] UI additions: MobileZoneList badge & GSAP animation transitions.

[P3 - Future] STEG Facebook Automation pipeline (Python Scraper + Supabase Edge Functions).