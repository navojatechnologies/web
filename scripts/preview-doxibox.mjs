import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));

// Local approximation of this project's ordered Vercel rules, not a Vercel
// emulator. Actual edge routing still needs verification on a deployment.
export function matchRoute(pathname, hostname) {
  return config.routes.find(route => new RegExp(route.src).test(pathname)
    && route.has.every(condition => condition.type === 'host' && condition.value === hostname));
}

export function createPreviewServer() {
  const directory = path.join(root, 'out');
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const host = (request.headers.host || '').split(':')[0].toLowerCase();
      // Plain localhost previews the Doxibox hostname; explicit Host headers
      // let verification cover corporate and other hostnames too.
      const hostname = ['localhost', '127.0.0.1'].includes(host) ? 'doxibox.navojatech.com' : host;
      const route = matchRoute(url.pathname, hostname);
      const destination = route
        ? url.pathname.replace(new RegExp(route.src), route.dest)
        : decodeURIComponent(url.pathname);
      let file = path.resolve(directory, `.${destination}`);
      if (file !== directory && !file.startsWith(directory + path.sep)) {
        response.writeHead(404).end();
        return;
      }
      let status = route?.status || 200;
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
        await stat(file);
      } catch {
        file = path.join(directory, '404.html');
        status = 404;
      }
      const contentTypes = {
        '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
        '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png',
        '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
      };
      const contentType = /^\/doxibox\/(home|features|about|faq|contact|policy)$/.test(destination)
        ? 'text/html; charset=utf-8' : contentTypes[path.extname(file)] || (path.extname(file) === '.xml' ? 'application/xml; charset=utf-8' : 'application/octet-stream');
      const content = await readFile(file);
      response.writeHead(status, { 'Content-Type': contentType, ...route?.headers });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch {
      response.writeHead(500, { 'Content-Type': 'text/plain' }).end('Preview failed. Run npm run build first.');
    }
  });
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const port = Number(process.env.DOXIBOX_PREVIEW_PORT || process.env.POLICY_PREVIEW_PORT || 4173);
  createPreviewServer().listen(port, '127.0.0.1', () => {
    console.log(`Doxibox website preview: http://localhost:${port}`);
    console.log('Local hostname-rule approximation; no production services are changed.');
  });
}
