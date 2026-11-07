import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { renderPolicy } from '../policy-document.mjs';

// Pre-render a complete HTML document without inheriting corporate site chrome.
// This remains compatible with the existing output: 'export' deployment.
export const dynamic = 'force-static';

export async function GET() {
  const content = await readFile(path.join(process.cwd(), 'content/doxibox/privacy-policy.md'), 'utf8');
  return new Response(renderPolicy(content), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
