# AstraLife — village simulator with real Claude agents

This is a small local server that lets the AstraLife village run on real Claude reasoning instead of the built-in rule-based engine. The server keeps your API key on the backend — the browser never sees it.

## Setup

1. Make sure you have Node.js installed (v18 or newer).
2. Open a terminal in this folder and install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and paste in your Anthropic API key:
   ```
   cp .env.example .env
   ```
   Then edit `.env` and set `ANTHROPIC_API_KEY=sk-ant-...` (get a key at console.anthropic.com).
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## Using it

- The page works immediately with the offline rule-based engine (no key needed).
- Click "Use real AI" to switch to real Claude reasoning. From then on, each tick sends the village's current state (agents, goals, memory, relationships, mood, resources) to your local server, which calls Claude and applies the villagers' decisions.
- Real AI ticks are throttled to at least every 4 seconds since each one is a real API call.
- Type something into the event box and click "Inject event" to throw a world event (a flood, a festival, a stranger arriving) at the village — it gets included in the next AI tick so all villagers react to it in character.
- Switch back to offline mode anytime by clicking the button again.

## Files

- `server.js` — Express server, holds the prompt logic and proxies to the Anthropic API.
- `public/index.html` — the whole frontend (map, agent cards, relationship graph, event log).
- `.env` — your API key (not committed, keep this private).

## Notes

- This is a simple rule-based world + an LLM "brain" layered on top — the map movement, resource bars, and visuals are deterministic JS; only the villagers' decisions (what they do, say, and how relationships shift) come from Claude.
- If you want all 12+ population slots filled, duplicate an entry in `agentDefs` near the top of the `<script>` in `index.html` and add a matching spot in `spots`.
