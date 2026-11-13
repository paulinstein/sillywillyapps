import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPage } from './helpers.mjs';

test('apps page lists dog stories', () => {
  const apps = readPage('apps/');
  assert.match(apps, /Dog Stories/);
  assert.match(apps, /href="https:\/\/dogstories\.sillywillyapps\.com"/);
});

test('app without store links says coming soon', () => {
  const apps = readPage('apps/');
  assert.match(apps, /Coming soon to the App Store and Google Play/);
  assert.doesNotMatch(apps, /apps\.apple\.com|play\.google\.com/);
});

test('home has promise and tagline', () => {
  const home = readPage('/');
  assert.match(home, /No ads\. Just fun things I like making\./);
  assert.match(home, /Apps &amp; games, the way they used to be fun\./);
  assert.match(home, /Dog Stories/);
});

test('home lists only existing posts', () => {
  const home = readPage('/');
  const section = home.match(/<section[^>]*id="latest"[^>]*>([\s\S]*?)<\/section>/);
  assert.ok(section, 'home has a latest-posts section');
  const items = section[1].match(/<li[\s>]/g) ?? [];
  assert.equal(items.length, 1, 'one published post at launch');
  assert.doesNotMatch(section[1], /draft-check/i);
});
