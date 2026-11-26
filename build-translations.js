require("dotenv").config();

const { locales } = require("./lib/i18n/config.ts");
const { translateCached } = require("./translate");
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "locales");
const sourceStrings = JSON.parse(
  fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8")
);

// Hand-edited translations that win over machine translation.
// Shape: { "<locale>": { "<key>": { "source": "<en text it was written for>", "text": "<translation>" } } }
// If en.json's text for a key no longer matches "source", the override is skipped with a warning
// so an outdated hand edit never hides a changed English string.
const OVERRIDES_FILE = path.join(LOCALES_DIR, "overrides.json");
const overrides = fs.existsSync(OVERRIDES_FILE)
  ? JSON.parse(fs.readFileSync(OVERRIDES_FILE, "utf8"))
  : {};


async function buildAllTranslations() {
  for (const locale of locales) {
    if (locale === "en") continue; // skip re-translating the source

    const localeOverrides = overrides[locale] || {};
    const output = {};
    for (const [id, text] of Object.entries(sourceStrings)) {
      const override = localeOverrides[id];
      if (override && override.source === text) {
        output[id] = override.text;
        continue;
      }
      if (override) {
        console.warn(`[${locale}] override for "${id}" is stale (en.json text changed); using machine translation. Update locales/overrides.json.`);
      }
      output[id] = await translateCached(text, locale);
      // console.log(`[${locale}] ${id} -> ${output[id]}`);
    }
    for (const id of Object.keys(localeOverrides)) {
      if (!(id in sourceStrings)) {
        console.warn(`[${locale}] override for "${id}" has no matching key in en.json.`);
      }
    }
    fs.writeFileSync(
      path.join(LOCALES_DIR, `${locale}.json`),
      JSON.stringify(output, null, 2)
    );
  }
  console.log("Done.");
}

buildAllTranslations().catch(console.error);