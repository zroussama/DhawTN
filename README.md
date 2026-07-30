# ⚡ DhawTN

> **Community-powered real-time electricity outage tracker for Tunisia.**

DhawTN is an open-source Progressive Web App (PWA) that enables Tunisian citizens to report, monitor, and receive real-time notifications about electricity outages across the country.

Instead of relying solely on official communication, DhawTN aggregates community reports, applies a spatial consensus algorithm, and displays verified outages on an interactive map.

## 📷 Preview


<p align="center">
<img width="640" height="360" alt="demo " src="https://github.com/user-attachments/assets/b2c3efc0-8736-46d0-b909-e0689de2124a" />
</p>

---

## 🌍 Why DhawTN?

Power outages affect thousands of homes and businesses every year in Tunisia.

Unfortunately, there is no public real-time outage map.

**DhawTN aims to solve this by:**

- ⚡ Crowdsourcing outage reports
- 🗺️ Visualizing outages on a live interactive map
- 📍 Detecting affected neighborhoods automatically
- 🔔 Notifying users when power is restored
- 📱 Working even during poor network conditions (PWA + Offline Mode)

---

## ✨ Features

- 🗺️ Live outage map
- 📍 Automatic GPS location
- ⚡ One-click outage reporting
- 🤝 Community consensus validation
- 🔴 Live outage status
- 🟢 Power restoration detection
- 🔔 Push Notifications
- 🌐 Progressive Web App (Installable)
- 📶 Offline support
- 🌙 Mobile-first dark interface
- 🚀 Real-time updates
- 🔒 Anonymous reporting

---

## 🏗 Tech Stack

### Frontend

- Next.js 15
- TypeScript
- TailwindCSS
- Leaflet
- React Leaflet
- GSAP
- React Query

### Backend

- Supabase
- PostgreSQL
- PostGIS
- Redis (Upstash)
- Edge Functions

### GIS

- OpenStreetMap
- GADM Administrative Boundaries
- Turf.js

### Deployment

- Vercel
- Netlify

---



## 🧠 How it Works

```text
Citizen reports outage
            │
            ▼
 Location is verified
            │
            ▼
Spatial Consensus Engine
(PostGIS + Turf)
            │
            ▼
 Outage Confirmed
            │
            ▼
 Live Map Updated
            │
            ▼
 Push Notification
```
<p align="center">
<img width="2518" height="3408" alt="mobile zone " src="https://github.com/user-attachments/assets/6810eaae-ead4-438c-b0f5-700ed932c68f" />
</p>
---

## 📍 Outage Consensus

To reduce spam and false reports, DhawTN validates reports using a consensus algorithm.

A zone becomes **Confirmed Outage** when:

- at least **3 different users**
- report a power outage
- within **1 km**
- during the last **15 minutes**

---

## 📱 Progressive Web App

DhawTN is installable directly from the browser.

Features include:

- Offline mode
- Cached maps
- Push notifications
- Background synchronization
- Fast loading

No App Store required.

---

## 🔒 Privacy

DhawTN never stores personal identities.

Reports are anonymous.

Only generalized spatial information is stored.

No precise GPS history is retained.

---

## 🚀 Roadmap

### Phase 1

- [x] Interactive map
- [x] User geolocation
- [x] Outage reports

### Phase 2

- [x] Real-time updates
- [x] Spatial consensus
- [x] Push notifications

### Phase 3

- [x] Analytics Dashboard
- [ ] Heatmaps
- [ ] Historical statistics

### Phase 4

- [ ] AI outage prediction
- [ ] Public API
- [ ] Mobile app

---

## 🤝 Contributing

Contributions are welcome.

If you would like to improve DhawTN, feel free to:

- Fork the repository
- Create a feature branch
- Submit a Pull Request

---

## 💡 Vision

DhawTN is more than an outage tracker.

It is a community-driven platform that increases transparency around the electrical network and helps citizens, businesses, and emergency services better understand power availability across Tunisia.

---

## 📄 License

MIT License

---

## ❤️ Built for Tunisia  -  Made with ❤️ 

> **DhawTN — The community knows first.**
