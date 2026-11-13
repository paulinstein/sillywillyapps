import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, allFiles, readPage, sizeOf } from './helpers.mjs';

const ALLOWED_HOSTS = ['sillywillyapps.com', 'dogstories.sillywillyapps.com', 'apps.apple.com', 'play.google.com'];

test('no third-party requests', () => {
  const textFiles = allFiles().filter((f) => /\.(html|css|js)$/.test(f));
  assert.ok(textFiles.length > 0);
  for (const f of textFiles) {
    const text = readFileSync(join(DIST, f), 'utf8');
    assert.doesNotMatch(text, /fonts\.(googleapis|gstatic)/, `${f} loads Google Fonts`);
    // Anything loaded by the page (src, srcset, CSS url()) must be local.
    for (const [, url] of text.matchAll(/(?:src|srcset)=["'](https?:\/\/[^"' ]+)/g)) {
      assert.fail(`${f} loads ${url}`);
    }
    for (const [, url] of text.matchAll(/url\(["']?(https?:\/\/[^"')]+)/g)) {
      assert.fail(`${f} loads ${url}`);
    }
    for (const [, host] of text.matchAll(/href=["']https?:\/\/([^/"']+)/g)) {
      assert.ok(ALLOWED_HOSTS.includes(host), `${f} links to ${host}`);
    }
  }
});

test('no logo master is shipped', () => {
  const images = allFiles().filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
  assert.ok(images.length > 0, 'expected some images');
  for (const f of images) {
    assert.ok(sizeOf(f) < 300 * 1024, `${f} is ${Math.round(sizeOf(f) / 1024)} KB`);
  }
});

test('dark header uses sticker', () => {
  const home = readPage('/');
  assert.match(home, /class="[^"]*logo-light[^"]*"[^>]*>\s*<img[^>]*alt="Silly Willy"/);
  assert.match(home, /class="[^"]*logo-dark[^"]*"[^>]*>\s*<img[^>]*alt="Silly Willy"/);
  const css = allFiles().filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(DIST, f), 'utf8')).join('\n') + home;
  assert.match(css, /prefers-color-scheme:\s*dark/);
});

test('nav links', () => {
  const home = readPage('/');
  for (const path of ['/apps/', '/blog/', '/about/']) {
    assert.match(home, new RegExp(`href="${path}"`), `missing link to ${path}`);
  }
});
