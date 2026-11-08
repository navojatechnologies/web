import { escapeHtml, header, footer } from './site-document.mjs';
import { termsConfig as config } from './terms-config.mjs';

// Render only the Markdown used by the supplied, trusted local legal document.
// Escape raw HTML and allow only web and email destinations.
function inline(text) {
  const pattern = /\*\*(.+?)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  let html = '';
  let position = 0;
  for (const match of text.matchAll(pattern)) {
    html += escapeHtml(text.slice(position, match.index));
    if (match[1]) html += `<strong>${inline(match[1])}</strong>`;
    else {
      const url = new URL(match[3]);
      if (!['https:', 'http:', 'mailto:'].includes(url.protocol)) throw new Error('Unsupported Terms link protocol.');
      html += `<a href="${escapeHtml(url.href)}">${escapeHtml(match[2])}</a>`;
    }
    position = match.index + match[0].length;
  }
  return html + escapeHtml(text.slice(position));
}

function blocks(text) {
  return text.trim().split(/\n\s*\n/).map(block => {
    if (block.startsWith('### ')) return `<h3>${inline(block.slice(4))}</h3>`;
    const lines = block.split('\n');
    const unordered = lines.every(line => line.startsWith('- '));
    const ordered = lines.every(line => /^\d+\. /.test(line));
    if (unordered || ordered) {
      const tag = unordered ? 'ul' : 'ol';
      return `<${tag}>${lines.map(line => `<li>${inline(line.replace(/^(?:- |\d+\. )/, ''))}</li>`).join('')}</${tag}>`;
    }
    return `<p>${lines.map(inline).join('<br>')}</p>`;
  }).join('\n');
}

export function renderTerms(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const effectiveDate = normalized.match(/^Effective Date:\s*(.+)$/m)?.[1];
  const updatedDate = normalized.match(/^Last Updated:\s*(.+)$/m)?.[1];
  const sections = [...normalized.matchAll(/^## (\d+)\. (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)]
    .map(([, number, title, body]) => ({ number: Number(number), title, body, id: `section-${number}` }));
  if (!effectiveDate || !updatedDate || sections.length !== 26 || sections.some((section, index) => section.number !== index + 1)) {
    throw new Error('The Doxibox Terms must include both dates and all 26 sections in order.');
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
  <link rel="canonical" href="${config.canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Doxibox">
  <meta property="og:title" content="${escapeHtml(config.title)}">
  <meta property="og:description" content="${escapeHtml(config.description)}">
  <meta property="og:url" content="${config.canonicalUrl}">
  <meta property="og:image" content="https://doxibox.navojatech.com/doxibox/social-card.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/doxibox/favicon.svg">
  <link rel="stylesheet" href="/doxibox/theme.css">
  <link rel="stylesheet" href="/doxibox/site.css">
  <link rel="stylesheet" href="/doxibox/terms.css">
  <script src="/doxibox/site.js" defer></script>
</head>
<body id="top">
  ${header()}
  <main id="main" tabindex="-1">
    <div class="terms-hero">
      <div class="container">
        <p class="eyebrow">DOXIBOX · LEGAL</p>
        <h1>Terms and <span>Conditions.</span></h1>
        <p class="terms-lead">The terms governing your use of Doxibox cloud storage, file management, and file-sharing services.</p>
        <p class="terms-attribution">Doxibox is a product of <a href="https://navojatech.com">Navoja Technologies</a>.</p>
        <dl class="terms-dates" aria-label="Document dates">
          <div><dt>Effective Date</dt><dd>${escapeHtml(effectiveDate)}</dd></div>
          <div><dt>Last Updated</dt><dd>${escapeHtml(updatedDate)}</dd></div>
        </dl>
      </div>
    </div>
    <div class="container terms-layout">
      <aside class="terms-contents">
        <nav aria-label="Table of contents"><h2>On this page</h2><ol>${toc}</ol></nav>
        <a class="terms-policy-link" href="https://doxibox.navojatech.com/policy">Read our Privacy Policy ↗</a>
      </aside>
      <article class="terms-content" aria-label="Doxibox Terms and Conditions">
        ${sections.map(section => `<section id="${section.id}" aria-labelledby="heading-${section.number}" tabindex="-1"><h2 id="heading-${section.number}"><span>${String(section.number).padStart(2, '0')}</span>${escapeHtml(section.title)}</h2>${blocks(section.body)}</section>`).join('\n')}
        <a class="terms-back" href="#top">Back to top ↑</a>
      </article>
    </div>
  </main>
  ${footer()}
</body>
</html>`;
}
