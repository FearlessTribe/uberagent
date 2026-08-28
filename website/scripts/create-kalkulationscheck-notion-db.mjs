#!/usr/bin/env node
/**
 * Create the Kalkulationscheck leads database in Notion.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_... node scripts/create-kalkulationscheck-notion-db.mjs [page_id_or_url]
 *
 * If page_id is omitted, the database is created at workspace level.
 * Connect the "uberagent website" integration to the database after creation.
 */
const token = process.env.NOTION_TOKEN;
const rawParent = process.argv[2];

if (!token) {
  console.error("Usage: NOTION_TOKEN=... node scripts/create-kalkulationscheck-notion-db.mjs [page_id_or_url]");
  process.exit(1);
}

function extractPageId(input) {
  const cleaned = input.trim();
  const fromPath = cleaned.match(/([a-f0-9]{32})(?:\?|$)/i)?.[1]
    || cleaned.match(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i)?.[1];
  if (!fromPath) throw new Error("Could not parse Notion page id from input");
  if (fromPath.includes("-")) return fromPath;
  return `${fromPath.slice(0, 8)}-${fromPath.slice(8, 12)}-${fromPath.slice(12, 16)}-${fromPath.slice(16, 20)}-${fromPath.slice(20)}`;
}

const body = {
  icon: { type: "emoji", emoji: "📊" },
  title: [{ type: "text", text: { content: "Kalkulationscheck Leads" } }],
  properties: {
    Name: { title: {} },
    "E-Mail": { email: {} },
    Telefon: { phone_number: {} },
    Website: { url: {} },
    "Kontakt erlaubt": { checkbox: {} },
    Status: {
      select: {
        options: [
          { name: "Neu", color: "blue" },
          { name: "Metriken erfasst", color: "purple" },
          { name: "Kontaktiert", color: "yellow" },
          { name: "Erledigt", color: "green" },
        ],
      },
    },
    "Std./Tag Angebote": { number: { format: "number" } },
    Arbeitstage: { number: { format: "number" } },
    Stundenwert: { number: { format: "number" } },
    "Extra Aufträge/Woche": { number: { format: "number" } },
    Deckungsbeitrag: { number: { format: "number" } },
    "Zeitwert/Jahr": { number: { format: "number" } },
    "Nutzen gesamt": { number: { format: "number" } },
    Eingegangen: { created_time: {} },
  },
};

if (rawParent) {
  body.parent = { type: "page_id", page_id: extractPageId(rawParent) };
}

const res = await fetch("https://api.notion.com/v1/databases", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const data = await res.json();
if (!res.ok) {
  console.error(data);
  process.exit(1);
}

console.log("Database created:");
console.log("  id: ", data.id);
console.log("  url:", data.url);
console.log("\nNext:");
console.log("  1. Share the database with the uberagent website integration");
console.log(`  2. printf '%s' '${data.id}' | npx wrangler secret put NOTION_KALKULATIONSCHECK_DATABASE_ID`);
console.log("     — or add to wrangler.toml [vars]");
