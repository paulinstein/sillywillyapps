import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allFiles, exists, readPage } from './helpers.mjs';

const WELCOME = 'blog/2026-11-13-hello-from-silly-willy/';
const WELCOME_TITLE = 'Hello from Silly Willy';

test('post page exists', () => {
  assert.ok(exists(WELCOME), 'welcome post page missing');
  assert.match(readPage(WELCOME), new RegExp(WELCOME_TITLE));
});

test('drafts never publish', () => {
  for (const f of allFiles()) {
    assert.doesNotMatch(f, /draft-check|secret-test-tag/, `draft file ${f} was built`);
    if (/\.(html|xml|txt|json)$/.test(f)) {
      assert.doesNotMatch(readFileSync(join(DIST, f), 'utf8'), /draft-check|Draft check|secret-test-tag/i, `${f} mentions the draft`);
    }
  }
});

test('rss lists posts', () => {
  const rss = readPage('rss.xml');
  assert.match(rss, new RegExp(WELCOME_TITLE));
  assert.match(rss, /https:\/\/sillywillyapps\.com\/blog\/2026-11-13-hello-from-silly-willy\//);
});

test('blog index lists the welcome post', () => {
  assert.match(readPage('blog/'), new RegExp(`href="/${WELCOME}"`));
});

test('tag page exists', () => {
  assert.ok(exists('blog/tags/announcement/'), 'announcement tag page missing');
  assert.match(readPage('blog/tags/announcement/'), new RegExp(`href="/${WELCOME}"`));
});

test('post without cover renders', () => {
  const header = readPage(WELCOME).match(/<article[^>]*>\s*<header[^>]*>([\s\S]*?)<\/header>/);
  assert.ok(header, 'post has an article header');
  assert.doesNotMatch(header[1], /<img/);
});
