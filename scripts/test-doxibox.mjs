import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { after, before, test } from 'node:test';
import { createPreviewServer } from './preview-doxibox.mjs';
import { renderPolicy } from '../app/doxibox/policy-document.mjs';
import { policyConfig } from '../app/doxibox/policy-config.mjs';

const content = await readFile(new URL('../content/doxibox/privacy-policy.md', import.meta.url), 'utf8');
const html = await readFile(new URL('../out/doxibox/policy', import.meta.url), 'utf8');
const server = createPreviewServer();
let origin;
before(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));

function request(pathname, hostname = 'doxibox.navojatech.com', method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = httpRequest(origin + pathname, { headers: { Host: hostname }, method }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve({
        status: response.statusCode,
        headers: { get: name => response.headers[name.toLowerCase()] ?? null },
        text: async () => Buffer.concat(chunks).toString('utf8'),
      }));
      response.on('error', reject);
    });
    req.on('error', reject);
    req.end();
  });
}

function plainText(value) {
  return value.replace(/<(?:br\s*\/?|\/(?:p|h[1-6]|li|section|div))>/g, ' ').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

test('export contains the complete approved policy, all sections and subsections', () => {
  assert.equal(html, renderPolicy(content));
  assert.equal((html.match(/<section id="section-/g) || []).length, 23);
  assert.equal((html.match(/<h3>/g) || []).length, (content.match(/^### /gm) || []).length);
  const text = plainText(html);
  for (const line of content.split('\n')) {
    if (!line.trim() || /^#/.test(line) || line.includes('[INSERT') || /^\*\*(Effective Date|Last Updated)/.test(line)) continue;
    const expected = line.replace(/^(?:- |\d+\. )/, '').replace(/\*\*/g, '').trim();
    assert.ok(text.includes(expected), `Missing policy content: ${expected}`);
  }
});

test('HTML metadata, emails, anchors and account deletion contact are correct', () => {
  assert.ok(html.includes(`<title>${policyConfig.title}</title>`));
  assert.ok(html.includes(`<link rel="canonical" href="${policyConfig.canonicalUrl}">`));
  assert.ok(html.includes('<meta name="robots" content="index, follow">'));
  assert.ok(html.includes(`content="${policyConfig.description}"`));
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(!/<script\b|<form\b|\[INSERT/.test(html));
  assert.ok(!/account-deletion|account deletion webpage|Webpage not yet available|Planned webpage/i.test(html));
  for (const number of [13, 22]) {
    const section = html.match(new RegExp(`<section id="section-${number}"[\\s\\S]*?</section>`))?.[0];
    assert.ok(section?.includes(`href="mailto:${policyConfig.supportEmail}"`), `Section ${number} must link to support for deletion requests`);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `Broken anchor: ${href}`);
    else assert.ok([
      '/doxibox/policy.css', policyConfig.canonicalUrl, policyConfig.companyUrl,
      'https://policies.google.com/privacy', `mailto:${policyConfig.privacyEmail}`,
      `mailto:${policyConfig.supportEmail}`, 'data:,',
    ].includes(href), `Unexpected link: ${href}`);
  }
});

test('Doxibox policy serves HTML without login, redirects or JavaScript', async () => {
  for (const pathname of ['/policy', '/policy/', '/policy?review=google-play']) {
    const response = await request(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.equal(response.headers.get('location'), null);
    assert.equal(await response.text(), html);
  }
  const head = await request('/policy', 'doxibox.navojatech.com', 'HEAD');
  assert.equal(head.status, 200);
});

test('Doxibox unknown paths return real 404s even when corporate routes exist', async () => {
  for (const pathname of ['/', '/about', '/services/', '/contact', '/account-deletion', '/doxibox/policy', '/not-found', '/policy/missing']) {
    const response = await request(pathname);
    assert.equal(response.status, 404, pathname);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    assert.ok((await response.text()).includes('Page not found'));
  }
});

test('corporate hosts retain their exported routes and original missing policy path', async () => {
  for (const hostname of ['navojatech.com', 'www.navojatech.com', 'preview.vercel.app']) {
    for (const pathname of ['/', '/about/', '/services/', '/contact/', '/resources/privacy/']) {
      const response = await request(pathname, hostname);
      assert.equal(response.status, 200, `${hostname}${pathname}`);
      const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}index.html`;
      assert.equal(await response.text(), await readFile(new URL(`../out/${file}`, import.meta.url), 'utf8'));
    }
    assert.equal((await request('/policy', hostname)).status, 404);
  }
});

test('Doxibox stylesheet and robots are publicly accessible', async () => {
  const css = await request('/doxibox/policy.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /^text\/css/);
  const robots = await request('/robots.txt');
  assert.equal(robots.status, 200);
  assert.equal((await robots.text()).trim(), 'User-agent: *\nAllow: /');
});

test('an incomplete document fails instead of publishing a shortened policy', () => {
  assert.throws(() => renderPolicy(content.replace('## 23. Disclaimer', '## 24. Disclaimer')), /all 23 sections/);
});
