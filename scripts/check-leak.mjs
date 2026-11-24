// Runs after `npm run build`. Checks that private proxy credentials never ship.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const proxySecret = (process.env.BACKEND_PROXY_SECRET || '').trim();
const hits = [];

const walk = (directory) => {
  for (const file of readdirSync(directory)) {
    const path = join(directory, file);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }

    if (!/\.(js|css|html|json|webmanifest|txt|map)$/.test(file)) continue;
    const contents = readFileSync(path, 'utf8');
    if (proxySecret && contents.includes(proxySecret)) {
      hits.push(`${path} contains [BACKEND_PROXY_SECRET]`);
    }
  }
};

walk('dist');

if (hits.length) {
  console.error('✖ Private proxy secret leaked into the build:\n' + hits.join('\n'));
  process.exit(1);
}

console.log('✔ Build leak check passed. The public API URL may appear in browser assets; private proxy secrets may not.');
