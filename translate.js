const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const CACHE_FILE = path.join(__dirname, "translation-cache.json");
const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION;
const AZURE_ENDPOINT = "https://api.cognitive.microsofttranslator.com/translate";

function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function hashKey(text, targetLang) {
  return crypto.createHash("sha256").update(`${targetLang}:${text}`).digest("hex");
}

async function translateText(text, targetLang) {
  const res = await fetch(
    `${AZURE_ENDPOINT}?api-version=3.0&to=${targetLang}`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
        "Ocp-Apim-Subscription-Region": AZURE_REGION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ text }]),
    }
  );

  if (!res.ok) {
    throw new Error(`Azure Translator error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data[0].translations[0].text;
}

// Main entry point: translate with caching
async function translateCached(text, targetLang) {
  const cache = loadCache();
  const key = hashKey(text, targetLang);

  if (cache[key]) {
    return cache[key].translated;
  }

  const translated = await translateText(text, targetLang);
  console.log(text);

  cache[key] = {
    source: text,
    targetLang,
    translated,
    cachedAt: new Date().toISOString(),
  };
  saveCache(cache);

  return translated;
}

module.exports = { translateCached, loadCache, saveCache };