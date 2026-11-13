import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const DIST = new URL('../dist/', import.meta.url).pathname;

/** Path inside dist/. A path ending in "/" means its index.html. */
function resolve(path) {
  const clean = path.replace(/^\//, '');
  return join(DIST, clean === '' || clean.endsWith('/') ? clean + 'index.html' : clean);
}

export function exists(path) {
  return existsSync(resolve(path));
}

export function readPage(path) {
  return readFileSync(resolve(path), 'utf8');
}

/** Every file in dist/, as paths relative to dist/. */
export function allFiles(dir = DIST, base = '') {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    return statSync(full).isDirectory() ? allFiles(full, rel) : [rel];
  });
}

export function sizeOf(rel) {
  return statSync(join(DIST, rel)).size;
}
