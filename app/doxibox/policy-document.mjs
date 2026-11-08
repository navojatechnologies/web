import { policyConfig as config } from './policy-config.mjs';

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

// A deliberately limited renderer for this trusted local document: paragraphs,
// headings, flat lists, bold text, URLs and email addresses. Raw HTML is escaped.
function inline(text) {
  const pattern = /\*\*(.+?)\*\*|https?:\/\/[^\s<>]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\[INSERT OFFICIAL NAVOJA TECHNOLOGIES OR DOXIBOX WEBSITE\]/gi;
  let html = '';
  let position = 0;
  for (const match of text.matchAll(pattern)) {
    html += escapeHtml(text.slice(position, match.index));
    const token = match[0];
    if (match[1]) html += `<strong>${inline(match[1])}</strong>`;
    else if (token.startsWith('[INSERT')) html += `<a href="${escapeHtml(config.companyUrl)}">${escapeHtml(config.companyUrl)}</a>`;
    else {
      const href = token.includes('@') && !token.startsWith('http') ? `mailto:${token}` : token;
      html += `<a href="${escapeHtml(href)}">${escapeHtml(token)}</a>`;
    }
    position = match.index + token.length;
  }
  return html + escapeHtml(text.slice(position));
}

function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map(block => {
    const lines = block.split('\n');
    if (block.startsWith('### ')) return `<h3>${inline(block.slice(4))}</h3>`;
    const unordered = lines.every(line => line.startsWith('- '));
    const ordered = lines.every(line => /^\d+\. /.test(line));
    if (unordered || ordered) {
      const tag = unordered ? 'ul' : 'ol';
      return `<${tag}>${lines.map(line => `<li>${inline(line.replace(/^(?:- |\d+\. )/, ''))}</li>`).join('')}</${tag}>`;
    }
    return `<p>${lines.map(inline).join('<br>')}</p>`;
  }).join('\n');
}

export function renderPolicy(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const effectiveDate = normalized.match(/^\*\*Effective Date:\*\* (.+)$/m)?.[1];
  const updatedDate = normalized.match(/^\*\*Last Updated:\*\* (.+)$/m)?.[1];
  const sections = [...normalized.matchAll(/^## (\d+)\. (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)]
    .map(([, number, title, body]) => ({ number: Number(number), title, body, id: `section-${number}` }));
  if (!effectiveDate || !updatedDate || sections.length !== 23 || sections.some((section, index) => section.number !== index + 1)) {
    throw new Error('The Doxibox policy must include both dates and all 23 sections in order.');
  }
  const toc = sections.map(section => `<li><a href="#${section.id}">${escapeHtml(section.title)}</a></li>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.title)}</title>
  <meta name="description" content="${escapeHtml(config.description)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#101413">
  <link rel="canonical" href="${escapeHtml(config.canonicalUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(config.title)}">
  <meta property="og:description" content="${escapeHtml(config.description)}">
  <meta property="og:url" content="${escapeHtml(config.canonicalUrl)}">
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="/doxibox/theme.css">
  <link rel="stylesheet" href="/doxibox/policy.css">
</head>
<body id="top">
  <a class="skip-link" href="#policy-content">Skip to privacy policy</a>
  <header class="product-header">
    <div class="shell product-bar">
      <a class="product-brand" href="${escapeHtml(config.canonicalUrl)}" aria-label="Doxibox privacy policy">
        <span class="product-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m16 4 12 7-12 7L4 11l12-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 16.5 16 24l12-7.5M4 22l12 7 12-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span><span class="product-name">DOXIBOX</span><span class="product-tagline">Cloud Storage &amp; File Sharing</span></span>
      </a>
      <a class="company-link" href="${escapeHtml(config.companyUrl)}"><span class="company-name"><span class="company-caption">A PRODUCT OF</span>Navoja Technologies</span><span class="company-arrow" aria-hidden="true">↗</span></a>
    </div>
  </header>
  <main class="shell">
    <div class="policy-hero policy-intro">
      <div class="hero-copy">
        <p class="eyebrow"><span aria-hidden="true"></span>DOXIBOX · LEGAL</p>
        <h1>Privacy <em>Policy</em><span aria-hidden="true">.</span></h1>
        <p class="hero-description">How we collect, use, store, and protect your information when you use Doxibox.</p>
        <p class="attribution">A product of <a href="${escapeHtml(config.companyUrl)}">Navoja Technologies</a>.</p>
      </div>
      <dl class="policy-dates" aria-label="Policy dates">
        <div class="date-card"><dt><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M4 11h16m-11 5h2"/></svg>Effective Date</dt><dd>${escapeHtml(effectiveDate)}</dd></div>
        <div class="date-card"><dt><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20 11a8 8 0 1 0-2.3 6.7M20 4v7h-7M12 8v4l-2 2"/></svg>Last Updated</dt><dd>${escapeHtml(updatedDate)}</dd></div>
      </dl>
    </div>
    <div class="policy-layout">
      <aside class="contents" aria-label="Policy navigation">
        <nav aria-label="Table of contents"><h2>On this page</h2><ol>${toc}</ol></nav>
        <a class="contents-contact" href="mailto:${escapeHtml(config.privacyEmail)}">Privacy questions? <span>${escapeHtml(config.privacyEmail)} ↗</span></a>
      </aside>
      <article id="policy-content" class="policy-content" aria-label="Doxibox Privacy Policy" tabindex="-1">
        ${sections.map(section => `<section id="${section.id}" aria-labelledby="heading-${section.number}"><h2 id="heading-${section.number}"><span class="section-number">${String(section.number).padStart(2, '0')}</span>${escapeHtml(section.title)}</h2>${renderBlocks(section.body)}</section>`).join('\n')}
      </article>
    </div>
    <section class="contact-card" aria-labelledby="contact-heading">
      <div><p class="eyebrow">WE’RE HERE TO HELP</p><h2 id="contact-heading">Let’s talk about privacy.</h2><p>Contact Navoja Technologies with questions about Doxibox or your information.</p></div>
      <dl><div><dt>Privacy and Legal Inquiries</dt><dd><a href="mailto:${escapeHtml(config.privacyEmail)}">${escapeHtml(config.privacyEmail)}</a></dd></div><div><dt>Customer Support</dt><dd><a href="mailto:${escapeHtml(config.supportEmail)}">${escapeHtml(config.supportEmail)}</a></dd></div><div><dt>Company</dt><dd>Navoja Technologies</dd></div><div><dt>Product</dt><dd>Doxibox</dd></div></dl>
    </section>
  </main>
  <footer class="shell product-footer"><div><p>© 2026 Navoja Technologies. All Rights Reserved.</p><p>Doxibox is a product of Navoja Technologies.</p></div><div><a href="${escapeHtml(config.companyUrl)}">Visit Navoja Technologies ↗</a><a href="#top">Back to top ↑</a></div></footer>
</body>
</html>`;
}
