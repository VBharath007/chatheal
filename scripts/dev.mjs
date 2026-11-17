import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const value = (key, fallback) => (args.includes(key) ? args[args.indexOf(key) + 1] : fallback);

const host = value('--host', '0.0.0.0');
const requestedPort = args.includes('--port')
  ? parseInt(value('--port'), 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 3000;

function isPortAvailable(port, hostname) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, hostname);
  });
}

async function resolvePort(startPort, hostname) {
  if (args.includes('--port')) {
    return startPort;
  }
  let port = startPort;
  while (!(await isPortAvailable(port, hostname))) {
    console.warn(`\x1b[33m[dev] Port ${port} is in use, trying ${port + 1}...\x1b[0m`);
    port++;
  }
  return port;
}

const chosenPort = await resolvePort(requestedPort, host);
const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(
  process.execPath,
  [nextBin, 'dev', '--hostname', host, '--port', String(chosenPort)],
  { stdio: 'inherit' }
);

for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code || 0));
