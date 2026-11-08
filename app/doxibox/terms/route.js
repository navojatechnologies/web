import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { renderTerms } from '../terms-document.mjs';

export const dynamic = 'force-static';

export async function GET() {
  const content = await readFile(path.join(process.cwd(), 'content/doxibox/terms-and-conditions.md'), 'utf8');
  return new Response(renderTerms(content), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
