#!/usr/bin/env node
// Smoke check for the public Storybook deployment.
//
// Usage: node scripts/check-deployed-storybook.mjs [url]
// The URL defaults to $STORYBOOK_URL, then to https://sorbet-ui.vercel.app.
//
// It passes when the deployment serves iframe.html and an index.json that
// lists at least one story for every *.stories.tsx file in packages/react/src.
// It needs no install step: only Node 18+ (global fetch) and the checkout.

import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = (
  process.argv[2] ||
  process.env.STORYBOOK_URL ||
  'https://sorbet-ui.vercel.app'
).replace(/\/+$/, '');
const attempts = Number(process.env.ATTEMPTS || 5);
const delayMs = Number(process.env.DELAY_MS || 20000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchOk(url) {
  const res = await fetch(url, { redirect: 'manual' });
  if (res.status !== 200) {
    throw new Error(`${url} answered ${res.status} (expected 200)`);
  }
  return res;
}

function localStoryFiles() {
  const dir = path.join(root, 'packages/react/src');
  return readdirSync(dir).filter((name) => name.endsWith('.stories.tsx'));
}

async function check() {
  await fetchOk(`${baseUrl}/iframe.html`);
  const index = await (await fetchOk(`${baseUrl}/index.json`)).json();
  const stories = Object.values(index.entries ?? {}).filter((entry) => entry.type === 'story');
  const components = new Set(stories.map((entry) => entry.title));
  const expected = localStoryFiles().length;

  if (stories.length === 0) {
    throw new Error('index.json lists no stories');
  }
  if (components.size < expected) {
    throw new Error(
      `index.json lists ${components.size} components, but packages/react/src has ${expected} story files`
    );
  }
  return { stories: stories.length, components: components.size, expected };
}

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const result = await check();
    console.log(
      `OK ${baseUrl}: ${result.stories} stories across ${result.components} components ` +
        `(${result.expected} story files in packages/react/src)`
    );
    process.exit(0);
  } catch (error) {
    console.error(`Attempt ${attempt}/${attempts}: ${error.message}`);
    if (attempt < attempts) await sleep(delayMs);
  }
}

console.error(`FAIL ${baseUrl} did not pass the Storybook smoke check`);
process.exit(1);
