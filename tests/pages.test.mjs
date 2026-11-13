import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exists, readPage } from './helpers.mjs';

test('about page', () => {
  assert.match(readPage('about/'), /Hi, I(’|'|&#39;)m Paul\./);
});

test('privacy page', () => {
  assert.match(readPage('privacy/'), /doesn(’|'|&#39;)t collect/);
});

test('404 page', () => {
  assert.ok(exists('404.html'));
  assert.match(readPage('404.html'), /href="\/"/);
});

test('social preview', () => {
  assert.match(readPage('/'), /<meta property="og:image" content="https:\/\/sillywillyapps\.com\/og\.png"/);
  assert.ok(exists('og.png'));
});
