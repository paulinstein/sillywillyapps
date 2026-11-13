import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPage } from './helpers.mjs';

test('cname', () => {
  assert.equal(readPage('CNAME').trim(), 'sillywillyapps.com');
});
