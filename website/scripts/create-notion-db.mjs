#!/usr/bin/env node
/**
 * Create the AI Potenzial-Check leads database under a shared Notion page.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_... node scripts/create-notion-db.mjs <page_id_or_url>
 *
 * Connect the "uberagent website" integration to the page first
 * (Share → Connections → uberagent website).
 */
const token = process.env.NOTION_TOKEN;
const rawParent = process.argv[2];

if (!token || !rawParent) {
  console.error("Usage: NOTION_TOKEN=... node scripts/create-notion-db.mjs <page_id_or_url>");
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

const pageId = extractPageId(rawParent);

const res = await fetch("https://api.notion.com/v1/databases", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    parent: { type: "page_id", page_id: pageId },
    icon: { type: "emoji", emoji: "⚡" },
    title: [{ type: "text", text: { content: "AI Potenzial-Check Leads" } }],
    properties: {
      Name: { title: {} },
      "E-Mail": { email: {} },
      Telefon: { phone_number: {} },
      Website: { url: {} },
      Status: {
        select: {
          options: [
            { name: "Neu", color: "blue" },
            { name: "Kontaktiert", color: "yellow" },
            { name: "Erledigt", color: "green" },
          ],
        },
      },
      Eingegangen: { created_time: {} },
    },
  }),
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
console.log(`  printf '%s' '${data.id}' | npx wrangler secret put NOTION_DATABASE_ID`);
