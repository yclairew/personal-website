require("dotenv").config();

const { locales } = require("./lib/i18n/config.ts");
const { translateCached } = require("./translate");
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "locales");
const sourceStrings = JSON.parse(
  fs.readFileSync(path.join(LOCALES_DIR, "en.json"), "utf8")
);


async function buildAllTranslations() {
  for (const locale of locales) {
    if (locale === "en") continue; // skip re-translating the source

    const output = {};
    for (const [id, text] of Object.entries(sourceStrings)) {
      output[id] = await translateCached(text, locale);
      // console.log(`[${locale}] ${id} -> ${output[id]}`);
    }
    fs.writeFileSync(
      path.join(LOCALES_DIR, `${locale}.json`),
      JSON.stringify(output, null, 2)
    );
  }
  console.log("Done.");
}

buildAllTranslations().catch(console.error);