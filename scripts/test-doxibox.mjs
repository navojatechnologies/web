import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { after, before, test } from 'node:test';
import { createPreviewServer } from './preview-doxibox.mjs';
import { renderPolicy } from '../app/doxibox/policy-document.mjs';
import { policyConfig } from '../app/doxibox/policy-config.mjs';
import { pages, siteConfig } from '../app/doxibox/site-config.mjs';
import { renderTerms } from '../app/doxibox/terms-document.mjs';
import { termsConfig } from '../app/doxibox/terms-config.mjs';

const content = await readFile(new URL('../content/doxibox/privacy-policy.md', import.meta.url), 'utf8');
const html = await readFile(new URL('../out/doxibox/policy', import.meta.url), 'utf8');
const termsContent = await readFile(new URL('../content/doxibox/terms-and-conditions.md', import.meta.url), 'utf8');
const termsHtml = await readFile(new URL('../out/doxibox/terms', import.meta.url), 'utf8');
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
      '/doxibox/theme.css', '/doxibox/policy.css', policyConfig.canonicalUrl, policyConfig.companyUrl,
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
  for (const pathname of ['/services/', '/account-deletion', '/doxibox/policy', '/doxibox/terms', '/not-found', '/policy/missing', '/terms/missing', '/features/missing', '/doxibox/robots.txt', '/doxibox/site.css/missing']) {
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
    assert.equal((await request('/terms', hostname)).status, 404);
  }
});

test('Doxibox stylesheet and robots are publicly accessible', async () => {
  const css = await request('/doxibox/policy.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /^text\/css/);
  const robots = await request('/robots.txt');
  assert.equal(robots.status, 200);
  assert.equal((await robots.text()).trim(), 'User-agent: *\nAllow: /\nSitemap: https://doxibox.navojatech.com/sitemap.xml');
});

test('an incomplete document fails instead of publishing a shortened policy', () => {
  assert.throws(() => renderPolicy(content.replace('## 23. Disclaimer', '## 24. Disclaimer')), /all 23 sections/);
});

test('all marketing routes serve distinct complete documents on the Doxibox hostname', async () => {
  const titles = new Set();
  for (const [key, page] of Object.entries(pages)) {
    for (const pathname of new Set([page.path, page.path === '/' ? '/' : page.path + '/'])) {
      const response = await request(pathname);
      assert.equal(response.status, 200, pathname);
      assert.match(response.headers.get('content-type'), /^text\/html/);
      const document = await response.text();
      const exported = key === 'home' ? 'home' : key;
      assert.equal(document, await readFile(new URL(`../out/doxibox/${exported}`, import.meta.url), 'utf8'));
      assert.equal((document.match(/<h1[ >]/g) || []).length, 1);
      assert.ok(document.includes(`<link rel="canonical" href="${siteConfig.origin}${page.path}">`));
      assert.ok(document.includes(`<meta property="og:url" content="${siteConfig.origin}${page.path}">`));
      assert.ok(document.includes('name="twitter:card" content="summary_large_image"'));
      assert.ok(document.includes('href="https://doxibox.navojatech.com/policy"'));
      assert.ok(document.includes(`href="${termsConfig.canonicalUrl}">Terms and Conditions</a>`));
      assert.ok(!/<form\b|href="(?:#|javascript:|\/login|\/signup|\/terms|\/account-deletion)"/.test(document));
      assert.ok(!document.includes('/_next/'), 'Marketing pages must not load corporate React bundles');
      if (['home', 'features', 'about'].includes(key)) {
        assert.ok(document.includes('class="button light" href="/contact">Contact Support'));
      }
      assert.ok(!/Coming soon|coming soon|<button\b/.test(document), 'Marketing actions must use working links');
      titles.add(document.match(/<title>(.*?)<\/title>/)[1]);
      const ids = [...document.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
      assert.equal(new Set(ids).size, ids.length, 'Element IDs must be unique');
      for (const [, href] of document.matchAll(/(?:href|src)="([^"]+)"/g)) {
        if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `Missing anchor ${href}`);
        else if (href.startsWith('/') || href.startsWith(siteConfig.origin)) {
          const target = new URL(href, siteConfig.origin);
          assert.equal((await request(target.pathname)).status, 200, `${pathname}: broken destination ${href}`);
          if (target.hash) {
            assert.ok((await (await request(target.pathname)).text()).includes(`id="${target.hash.slice(1)}"`), `Broken cross-page anchor ${href}`);
          }
        } else {
          assert.ok([siteConfig.companyUrl, `mailto:${siteConfig.supportEmail}`, `mailto:${siteConfig.privacyEmail}`].includes(href), `Unexpected external destination ${href}`);
        }
      }
    }
  }
  assert.equal(titles.size, 5, 'Each page needs its own title');
});

test('sitemap, branded assets and native FAQ content are available', async () => {
  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /^application\/xml/);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<loc>/g) || []).length, 7);
  for (const pathname of [...Object.values(pages).map(page => page.path), '/policy', '/terms']) {
    assert.ok(xml.includes(`<loc>${siteConfig.origin}${pathname}</loc>`));
  }
  for (const [asset, type] of [['theme.css','text/css'], ['site.css','text/css'], ['terms.css','text/css'], ['site.js','text/javascript'], ['favicon.svg','image/svg+xml'], ['social-card.png','image/png']]) {
    const response = await request(`/doxibox/${asset}`);
    assert.equal(response.status, 200, asset);
    assert.ok(response.headers.get('content-type').startsWith(type));
  }
  const faq = await (await request('/faq')).text();
  assert.equal((faq.match(/class="faq-item"/g) || []).length, 9);
  const home = await (await request('/')).text();
  assert.equal((home.match(/class="feature-card"/g) || []).length, 6);
  assert.equal((home.match(/class="faq-item"/g) || []).length, 9);
});

test('Terms export preserves every source line, all 26 sections and all subsections', () => {
  assert.equal(termsHtml, renderTerms(termsContent));
  assert.equal((termsHtml.match(/<section id="section-/g) || []).length, 26);
  assert.equal((termsHtml.match(/<h3>/g) || []).length, (termsContent.match(/^### /gm) || []).length);
  const text = plainText(termsHtml);
  for (const line of termsContent.split('\n')) {
    if (!line.trim() || /^# Terms/.test(line) || /^(Effective Date|Last Updated):/.test(line)) continue;
    const expected = line.replace(/^#{2,3} (?:\d+\. )?/, '').replace(/^(?:- |\d+\. )/, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
    assert.ok(text.includes(expected), `Missing Terms content: ${expected}`);
  }
  assert.ok(text.includes('Grievance Officer name — to be provided'));
  assert.ok(text.includes('Registered business address — to be provided'));
  assert.ok(!/JB Vanani|Platinum Heights|<form\b|account-deletion|mailto\\:/.test(termsHtml));
  assert.ok(text.includes('Doxibox is a product of Navoja Technologies.'));
  assert.equal((termsHtml.match(/7 November 2026/g) || []).length, 2);
});

test('Terms SEO, heading hierarchy, section navigation and destinations are correct', async () => {
  assert.ok(termsHtml.includes(`<title>${termsConfig.title}</title>`));
  assert.ok(termsHtml.includes(`<meta name="description" content="${termsConfig.description}">`));
  assert.ok(termsHtml.includes(`<link rel="canonical" href="${termsConfig.canonicalUrl}">`));
  assert.ok(termsHtml.includes(`<meta property="og:url" content="${termsConfig.canonicalUrl}">`));
  assert.equal((termsHtml.match(/<h1[ >]/g) || []).length, 1);
  assert.equal((termsHtml.match(/<li><a href="#section-/g) || []).length, 26);
  const ids = [...termsHtml.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, href] of termsHtml.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), `Broken Terms anchor ${href}`);
    else {
      const url = new URL(href, siteConfig.origin);
      if (url.origin === siteConfig.origin) assert.equal((await request(url.pathname)).status, 200, href);
      else assert.ok([siteConfig.companyUrl, `mailto:${siteConfig.privacyEmail}`, `mailto:${siteConfig.supportEmail}`].includes(href), `Unexpected Terms link ${href}`);
    }
  }
  for (const email of [siteConfig.privacyEmail, siteConfig.supportEmail]) assert.ok(termsHtml.includes(`href="mailto:${email}"`));
  assert.ok(termsHtml.includes('href="https://doxibox.navojatech.com/policy"'));
});

test('Terms is public HTML on both URL forms, including HEAD and query requests', async () => {
  for (const pathname of ['/terms', '/terms/', '/terms?review=legal']) {
    const response = await request(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.equal(response.headers.get('location'), null);
    assert.equal(await response.text(), termsHtml);
  }
  assert.equal((await request('/terms', 'doxibox.navojatech.com', 'HEAD')).status, 200);
});

test('Terms refuses missing sections, missing dates and unsafe links', () => {
  assert.throws(() => renderTerms(termsContent.replace('## 26.', '## 27.')), /all 26 sections/);
  assert.throws(() => renderTerms(termsContent.replace('Last Updated:', 'Updated:')), /both dates/);
  assert.throws(() => renderTerms(termsContent.replace('mailto:info@navojatech.com', 'javascript:alert')), /Unsupported Terms link protocol/);
});

test('Android association file is JSON with no redirect on the Doxibox host', async () => {
  const response = await request('/.well-known/assetlinks.json');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/json/);
  assert.equal(response.headers.get('location'), null);
  const statements = JSON.parse(await response.text());
  assert.ok(Array.isArray(statements));
  for (const statement of statements) {
    assert.equal(statement.target.package_name, 'com.doxibox');
    assert.ok(statement.target.sha256_cert_fingerprints.every(value => /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value)));
  }
});

test('only Doxibox file and drama share URLs redirect browsers to Play Store', async () => {
  const id = '6aec817275a0cec922cd8d49';
  for (const pathname of [`/${id}`, `/${id}/`, `/drama/${id}`, `/drama/${id}/My%20Series`]) {
    const response = await request(pathname);
    assert.equal(response.status, 302, pathname);
    assert.equal(response.headers.get('location'), 'https://play.google.com/store/apps/details?id=com.doxibox');
  }
  for (const pathname of ['/abc', '/drama/not-an-id/title', `/${id}/extra`, `/drama/${id}/title/extra`]) {
    assert.equal((await request(pathname)).status, 404, pathname);
  }
  const corporate = await request(`/${id}`, 'navojatech.com');
  assert.notEqual(corporate.status, 302);
});
