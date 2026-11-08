import { siteResponse } from '../site-document.mjs';
export const dynamic = 'force-static';
export function GET() { return siteResponse('about'); }
