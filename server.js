const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname + '/public'));

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-sonnet-4-6';

if (!API_KEY) {
  console.warn('Warning: ANTHROPIC_API_KEY is not set. Create a .env file (see .env.example).');
}

function buildPrompt(agents, locations, day, worldEvent) {
  const state = agents.map(a => ({
    name: a.name,
    role: a.role,
    location: a.loc,
    goal: a.goal,
    mood: a.mood,
    resources: a.resources,
    relationships: a.relationships,
    recent_memory: a.memory.slice(-3)
  }));

  const eventLine = worldEvent
    ? `\nWorld event today, injected by an outside observer: "${worldEvent}". All villagers should react to this in character, based on their role.\n`
    : '';

  return `You are the simulation engine for a small persistent village of AI villagers in a sim called AstraLife. Each villager has their own personality based on their role, goals, memory, mood and relationships. Locations available: ${locations.join(', ')}.

Current state (day ${day}):
${JSON.stringify(state, null, 2)}
${eventLine}
Decide what each villager does today, in character, based on their role, goal, memory, mood, relationships${worldEvent ? ', and the world event above' : ''}. Villagers can move to a new location, talk to or trade with another villager, work toward their goal, or occasionally set a new goal if their current one feels done or stale${worldEvent ? ' or if the world event demands it' : ''}.

Respond with ONLY valid JSON, no markdown fences, no preamble, in this exact shape:
{
  "events": [
    {"actor": "Name", "target": "Name or null", "location": "one of the location names", "action": "short present-tense description, max 14 words", "relationship_delta": -3 to 3 or 0, "mood_delta_actor": -10 to 10, "resource_changes": {"gold": integer, "wood": integer, "stone": integer, "food": integer}, "new_goal": "string or null"}
  ]
}
Produce 3 to 6 events total covering all villagers across the day. Keep actions varied, grounded in role, memory${worldEvent ? ' and the world event' : ''}, sentence case, no quotes inside strings. resource_changes only needs keys that actually changed.`;
}

app.post('/api/tick', async (req, res) => {
  try {
    const { agents, locations, day, worldEvent } = req.body;
    if (!agents || !locations) {
      return res.status(400).json({ error: 'Missing agents or locations in request body.' });
    }
    if (!API_KEY) {
      return res.status(500).json({ error: 'Server has no ANTHROPIC_API_KEY configured.' });
    }

    const prompt = buildPrompt(agents, locations, day, worldEvent);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: `Anthropic API error (${response.status}): ${errText.slice(0, 300)}` });
    }

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      return res.status(502).json({ error: 'Model did not return valid JSON.', raw: clean.slice(0, 500) });
    }

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AstraLife server running at http://localhost:${PORT}`);
});
