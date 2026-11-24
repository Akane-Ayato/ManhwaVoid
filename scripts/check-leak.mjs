// Runs after `npm run build`. Fails the build if the real API address ended up in the shipped files.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const secret = (process.env.BACKEND_URL || '').trim().replace(/\/+$/, '');
const directBase = (process.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
const directOrigin = /^https?:\/\//i.test(directBase) ? new URL(directBase).origin : '';
const directMode = Boolean(directOrigin);
const forbidden = [];

if (secret && !directMode) {
  forbidden.push(secret);
  try {
    forbidden.push(new URL(secret).host);
  } catch {
    // not a URL
  }
}

if (process.env.BACKEND_PROXY_SECRET) {
  forbidden.push(process.env.BACKEND_PROXY_SECRET);
}

// Direct API mode intentionally exposes the public API hostname to browsers.
// Keep proxy credentials and other secrets out of VITE_* variables.

const hits = [];

const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);

    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (/\.(js|css|html|json|webmanifest|txt|map)$/.test(f)) {
      const t = readFileSync(p, 'utf8');

      for (const s of forbidden) {
        if (s && t.includes(s)) {
          hits.push(
            `${p}  contains  ${
              s === process.env.BACKEND_PROXY_SECRET
                ? '[proxy secret]'
                : s
            }`
          );
        }
      }
    }
  }
};

walk('dist');

if (hits.length) {
  console.error('✖ Backend address leaked into the build:\n' + hits.join('\n'));
  process.exit(1);
}

console.log(
  directMode
    ? '✔ Direct API mode: public API hostname is allowed; proxy secrets checked.'
    : secret
      ? '✔ Proxy mode leak check passed.'
      : '✔ Leak check passed.'
);
