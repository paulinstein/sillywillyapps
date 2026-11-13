import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exists, readPage } from './helpers.mjs';

test('home page builds', () => {
  assert.ok(exists('index.html'));
  assert.match(readPage('/'), /<title>/);
});
