# Malla Prashanth — Engineering Portfolio

> **Professional Electrical & Electronics Engineering Portfolio** showcasing Embedded Systems, EV Technology, Industrial Automation, and AI-Based Transportation Projects.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🔗 Live Demo

**[https://malla-prashanth-portfolio.pages.dev](https://malla-prashanth-portfolio.pages.dev)**

---

## Overview

A premium, recruiter-focused engineering portfolio designed to the standard of engineers at Tesla, Siemens, ABB, Bosch, and NVIDIA Automotive. Built with a dark/light theme, Framer Motion animations, interactive project simulations, and full mobile responsiveness.

---

## Features

- **Animated Hero** — Live V2V intersection simulation with typing effect
- **Skills Section** — Evidence-based skill chips with project associations (no arbitrary percentages)
- **Project Showcases** — 3 real projects with animated engineering visualizations
  - AI-Based V2V Negotiation System *(Flagship)*
  - SmartEV Charging System with Battery Management
  - Smart Parking System Using Proximity Sensors
- **Industrial Experience** — ITC Limited internship timeline
- **Certifications** — Microchip Embedded + AI Internship
- **Achievements** — TCS NQT 89.65%, State-Level Presentation, NCC-A
- **Contact Section** — 4 premium cards (Email · LinkedIn · GitHub · Resume)
- **Dark / Light Theme Toggle**
- **Floating Social Sidebar** — Desktop quick-access bar
- **Toast Notifications** — Email copy confirmation
- **Resume Integration** — Inline preview + one-click download
- **Fully Responsive** — Mobile-first design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.4 |
| Build Tool | Vite 5.1 |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Fonts | Space Grotesk · Inter · JetBrains Mono |
| Deployment | Cloudflare Pages |

---

## Folder Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── resume_prashanth.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── TechnicalExpertise.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Certifications.tsx
│   │   ├── Achievements.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingSocialBar.tsx
│   │   └── Toast.tsx
│   ├── hooks/
│   │   └── useToast.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── tsconfig.node.json
```

---

## Local Development

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/prashanth-2369002/malla-prashanth-portfolio.git
cd malla-prashanth-portfolio

# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev
```

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Deployment — Cloudflare Pages

1. Push this repository to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Click **Create a project** → Connect to Git
4. Select this repository
5. Set build settings:

| Setting | Value |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `18` |

6. Click **Save and Deploy**

Every push to `main` auto-deploys.

---

## Contact

| | |
|---|---|
| **Email** | prashanthmalla920@gmail.com |
| **LinkedIn** | [linkedin.com/in/malla-prashanth-b30a93410](https://www.linkedin.com/in/malla-prashanth-b30a93410) |
| **GitHub** | [github.com/prashanth-2369002](https://github.com/prashanth-2369002) |
| **Location** | Vijayawada, Andhra Pradesh, India |

---

## License

This project is licensed under the [MIT License](LICENSE).
