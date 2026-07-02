<div align="center">

# 🌍 AstraLife
### AI Life Simulator — A world where agents think, live, and evolve.

[![MIT License](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org)
[![Powered by Claude](https://img.shields.io/badge/powered%20by-Claude%20AI-blueviolet.svg)](https://anthropic.com)
[![Deploy on Railway](https://img.shields.io/badge/deploy-Railway-black.svg)](https://railway.app)

**AstraLife** is an open-source AI civilization simulator where autonomous agents live, work, and interact in a persistent village. Each AI villager has their own memory, goals, personality, and relationships — creating a dynamic mini-world that evolves over time.

[🚀 Live Demo](#) · [📖 Docs](#how-it-works) · [🐛 Report Bug](https://github.com/marky1flag/AstraLife/issues)

</div>

---

## ✨ Features

- 🧠 **Real AI reasoning** — Each villager's decisions are powered by Claude (Anthropic), not random scripts
- 💾 **Memory** — Villagers remember past events and interactions
- 🎯 **Goals** — They have ambitions that evolve over time
- 🤝 **Relationships** — Bonds, friendships, and rivalries form naturally
- ⚡ **Inject world events** — Throw a flood, festival, or stranger into the village and watch them react
- 🗺️ **Live map** — See agents move across the village in real time
- 📊 **Dashboard** — Track resources, happiness, relationships, and event logs

---

## 🎮 How It Works

```
Perceive World → Think (Claude AI) → Decide → Act → Remember → Repeat
```

Every "tick", each villager receives:
- Their current **goal** and **mood**
- Their **recent memory** (last 3 events)
- Their **relationships** with other villagers
- Any **world event** you injected

Claude then decides what they do — move, trade, argue, help, or set a new goal.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- An [Anthropic API key](https://console.anthropic.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/marky1flag/AstraLife.git
cd AstraLife

# Install dependencies
npm install

# Set up your API key
cp .env.example .env
# Edit .env and add: ANTHROPIC_API_KEY=sk-ant-...

# Start the server
npm start
```

Open `http://localhost:3000` in your browser. 🎉

---

## 🧑‍🤝‍🧑 Meet the Villagers

| Agent | Role | Goal |
|-------|------|------|
| 🌾 Lina | Farmer | Grow crops and feed the village |
| 🔨 Borin | Blacksmith | Forge tools for the village |
| 💰 Milo | Merchant | Maximize profit and expand trade |
| 🏗️ Tara | Builder | Build and upgrade structures |
| 👑 Eldric | Mayor | Grow the village and keep citizens happy |

---

## 🌐 Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

1. Fork this repo
2. Connect to [Railway](https://railway.app)
3. Add `ANTHROPIC_API_KEY` as an environment variable
4. Done — your village is live! 🚂

---

## 📁 Project Structure

```
AstraLife/
├── server.js          # Express backend, proxies to Anthropic API
├── package.json
├── .env.example       # API key template
└── public/
    └── index.html     # Full frontend (map, agents, dashboard)
```

---

## 🛠️ Tech Stack

- **Frontend** — Vanilla JS, SVG, CSS (no frameworks)
- **Backend** — Node.js + Express
- **AI** — Claude Sonnet (Anthropic)
- **Deploy** — Railway

---

## 🗺️ Roadmap

- [ ] More agent roles (Priest, Thief, Doctor)
- [ ] Persistent world (save/load village state)
- [ ] Agent-to-agent dialogue (visible conversations)
- [ ] Mobile-friendly UI
- [ ] Multi-village support

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
git checkout -b feature/your-feature
git commit -m "add: your feature"
git push origin feature/your-feature
```

---

## 🎨 Art Credits

Interior & character pixel art by [LimeZu](https://limezu.itch.io/) — *Modern Interiors* (free pack). Huge thanks! If you like the assets, consider supporting them on itch.io.

## 📄 License

Code: MIT — free to use, modify, and share.
Art assets: see LimeZu's license terms included in the asset pack.

---

<div align="center">
Made with ❤️ and Claude AI · <a href="https://github.com/marky1flag/AstraLife">github.com/marky1flag/AstraLife</a>
</div>
