import { siteConfig as config, pages } from './site-config.mjs';
import { features, steps, faqs } from './site-content.mjs';
import { icon, brandMark } from './site-icons.mjs';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function destination(value) {
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:') throw new Error('Published Doxibox destinations must use HTTPS.');
  return escapeHtml(url.href);
}

function appAction(label = 'Get Started', className = 'button primary', url = config.appUrl) {
  const href = destination(url);
  return href ? `<a class="${className}" href="${href}">${label}${icon('arrow')}</a>`
    : `<span class="unavailable-action"><button class="${className}" type="button" disabled>${label}<span class="soon">Coming soon</span></button></span>`;
}

function logo() {
  return `<a href="/" class="brand" aria-label="Doxibox home"><span class="brand-mark">${brandMark()}</span><span>doxibox<span class="brand-dot">.</span></span></a>`;
}

function header(page) {
  const links = Object.entries(pages).map(([key, item]) => `<a href="${item.path}"${page === key ? ' aria-current="page"' : ''}>${key === 'home' ? 'Home' : key === 'faq' ? 'FAQ' : key[0].toUpperCase() + key.slice(1)}</a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-bar">${logo()}<nav class="desktop-nav" aria-label="Main navigation">${links}</nav><details class="mobile-menu"><summary aria-label="Toggle navigation"><span class="menu-lines" aria-hidden="true"></span><span>Menu</span></summary><nav aria-label="Mobile navigation">${links}</nav></details></div></header>`;
}

function footer() {
  const legal = (url, label) => destination(url) ? `<a href="${destination(url)}">${label}</a>` : `<span class="unpublished">${label}<small>Not yet published</small></span>`;
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-intro">${logo()}<p>Your files. Your cloud.<br>Your control.</p><a class="company-credit" href="${config.companyUrl}">A product of Navoja Technologies ${icon('external')}</a></div><div><h2>Product</h2><a href="/">Home</a><a href="/features">Features</a><a href="/about">About</a><a href="/faq">FAQ</a></div><div><h2>Legal</h2><a href="${config.origin}/policy">Privacy Policy</a>${legal(config.termsUrl, 'Terms and Conditions')}</div><div><h2>Support</h2><a href="/contact">Contact</a><a href="mailto:${config.privacyEmail}">Privacy inquiries ${icon('external')}</a><a href="mailto:${config.supportEmail}">Technical support ${icon('external')}</a></div></div><div class="footer-bottom"><p>© 2026 Navoja Technologies. All Rights Reserved.</p><span>Made for your digital world.</span></div></div></footer>`;
}

function art() {
  return `<figure class="cloud-art" aria-label="Illustration of documents, photos, videos and folders gathered around a cloud. Marketing illustration, not an app interface."><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><span class="art-dot dot-one"></span><span class="art-dot dot-two"></span><span class="art-cross">+</span><div class="file-tile document-tile"><span class="file-type blue">${icon('file')}</span><span><b>Project notes</b><small>Everything in its place</small></span><span class="file-extension">DOC</span></div><div class="photo-tile"><svg viewBox="0 0 180 125" aria-hidden="true"><defs><linearGradient id="photo-sky" x2="0" y2="1"><stop stop-color="#a6d9ec"/><stop offset="1" stop-color="#e5f2ef"/></linearGradient></defs><rect width="180" height="125" fill="url(#photo-sky)"/><circle cx="133" cy="31" r="13" fill="#fff7d5"/><path d="m0 112 64-87 73 100H0" fill="#91b4ad"/><path d="m40 125 80-75 60 63v12" fill="#658e86"/><path d="m39 60 25-35 29 40-28-11Z" fill="#f0f4ef"/><path d="M0 112c46-22 100 0 180-12v25H0" fill="#d0e5da"/></svg><span>${icon('image')} Weekend memories</span></div><div class="cloud-center"><svg viewBox="0 0 260 190" aria-hidden="true"><defs><linearGradient id="cloud-fill" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#7f9cff"/><stop offset=".4" stop-color="#4f77fb"/><stop offset="1" stop-color="#264ee1"/></linearGradient><linearGradient id="cloud-edge" x2="0" y2="1"><stop stop-color="#c2d1ff"/><stop offset="1" stop-color="#446cf3"/></linearGradient></defs><path d="M66 158C-4 158 0 70 59 65 66 2 155-3 178 56c66-6 85 102 14 102Z" fill="url(#cloud-fill)" stroke="url(#cloud-edge)" stroke-width="2"/><path d="M103 100h46m-23-23v47m-13-13 13 13 13-13" fill="none" stroke="#fff" stroke-opacity=".94" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Your little corner of the cloud.</span></div><div class="file-tile video-tile"><span class="file-type pink">${icon('play')}</span><span><b>The good moments</b><small>Videos, close at hand</small></span></div><div class="folder-tile">${icon('folder')}<span>A place for it all</span></div><div class="transfer transfer-up">${icon('upload')}</div><div class="transfer transfer-down">${icon('download')}</div><figcaption>YOUR FILES, BROUGHT TOGETHER · ILLUSTRATION</figcaption></figure>`;
}

function hero() {
  return `<section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> A LITTLE SPACE. A WORLD OF POSSIBILITIES.</p><h1>Your digital world,<br>all in <span>one cloud.</span></h1><p class="hero-description">Store, organize, access and share your digital files with Doxibox. A simpler way to manage your files from one cloud platform.</p><div class="hero-actions">${appAction()}<a class="button secondary" href="/features">Explore Features ${icon('arrow')}</a></div>${!config.appUrl ? '<p class="availability">Public app access is coming soon. Good things are taking shape.</p>' : ''}<div class="hero-notes"><span>${icon('lock')} Private by default</span><span>${icon('share')} Shared by choice</span></div></div>${art()}</div><div class="container hero-foot"><span>A home for your digital everyday.</span><div><span>${icon('file')} Documents</span><span>${icon('image')} Photos</span><span>${icon('play')} Videos</span><span>${icon('music')} & more</span></div></div></section>`;
}

function featureSection(detailed = false) {
  return `<section class="section features" id="features"><div class="container"><div class="section-heading"><div><p class="eyebrow">LESS CLUTTER. MORE POSSIBILITY.</p><h2>Everything you need<br>to manage your files.</h2></div><p>From the everyday essentials to the things<br class="desktop-break"> you want to keep. Make room for it all.</p></div><div class="feature-grid">${features.map((feature, index) => `<article class="feature-card"><div class="feature-top"><span class="feature-icon ${feature.color}">${icon(feature.icon)}</span><span class="feature-index">0${index + 1}</span></div><h3>${feature.title}</h3><p>${feature.text}</p>${detailed ? `<p class="feature-detail">${feature.detail}</p>` : ''}</article>`).join('')}</div>${detailed ? '<p class="section-note">Features, supported formats and interfaces depend on the current app version. Public channels are available only where implemented. Contact support for current availability.</p>' : '<a class="text-link feature-link" href="/features">Get to know the features '+icon('arrow')+'</a>'}</div></section>`;
}

function howItWorks() {
  return `<section class="section how-it-works"><div class="container"><div class="center-heading"><p class="eyebrow">A SIMPLE START</p><h2>Get started in four simple steps.</h2><p>A little organization goes a long way.</p></div><ol class="steps">${steps.map(([symbol, title, text], index) => `<li><div class="step-symbol">${icon(symbol)}<span>${index + 1}</span></div><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol>${!config.appUrl ? '<p class="section-note">An introduction to the product journey. Public app access from this website is coming soon.</p>' : ''}</div></section>`;
}

function benefits() {
  return `<section class="section benefits"><div class="container split-layout"><div class="organization-art" role="img" aria-label="Illustrated folders for work, personal files and inspiration"><div class="organization-top"><span class="tiny-mark">${brandMark()}</span><span>A little more organized.</span></div><div class="folder-row"><span class="folder-symbol amber">${icon('folder')}</span><div><b>Work & ideas</b><span>Make space for your next big thing.</span></div>${icon('check')}</div><div class="folder-row"><span class="folder-symbol blue">${icon('folder')}</span><div><b>Life & memories</b><span>The moments worth keeping.</span></div>${icon('check')}</div><div class="folder-row"><span class="folder-symbol purple">${icon('folder')}</span><div><b>A little inspiration</b><span>Everything that sparks an idea.</span></div>${icon('check')}</div><div class="private-label">${icon('lock')} Personal storage. Private by default.</div><span class="illustration-label">ILLUSTRATIVE FOLDERS</span></div><div class="benefits-copy"><p class="eyebrow">A PLACE FOR WHAT MATTERS</p><h2>Your files,<br>organized your way.</h2><p>Less time looking. More room for doing. Bring a little order to your digital everyday with Doxibox.</p><ul class="benefit-list">${['Convenient cloud-based storage', 'Simple file organization', 'Private storage by default', 'User-controlled sharing options', 'Support for multiple file formats', 'Easy access to stored content'].map(text => `<li>${icon('check')}${text}</li>`).join('')}</ul></div></div></section>`;
}

function privacy() {
  return `<section class="privacy-section"><div class="container privacy-grid"><div class="privacy-copy"><p class="eyebrow">THOUGHTFUL ABOUT PRIVACY</p><h2>Your files.<br><span>Your control.</span></h2><p>Some things are just for you. Others are meant to be shared. With Doxibox, you choose.</p><a class="button light" href="${config.origin}/policy">Read Our Privacy Policy ${icon('external')}</a></div><div class="privacy-points"><article><span>${icon('lock')}</span><div><h3>Private starts here.</h3><p>Personal storage is private by default. You decide which files to share.</p></div></article><article><span>${icon('share')}</span><div><h3>Share with intention.</h3><p>Public links may let others access selected content. Manage supported sharing permissions and check who can access your files.</p></div></article><article><span>${icon('globe')}</span><div><h3>Public means visible.</h3><p>Content you publish to public channels may be visible to other users. Check visibility before publishing.</p></div></article></div></div></section>`;
}

function about(full = false) {
  return `<section class="section about-section"><div class="container ${full ? 'about-full' : 'about-grid'}"><div><p class="eyebrow">HELLO, WE’RE DOXIBOX</p><h2>Introducing Doxibox.</h2></div><div><p class="about-lead">A little less scattered.<br>A lot more together.</p><p>Doxibox is a cloud storage and file-sharing platform designed to make managing digital content simpler and more convenient. From documents and photos to videos and other supported files, Doxibox brings your digital content together in one place.</p><p>Doxibox is developed and operated by <a class="inline-link" href="${config.companyUrl}">Navoja Technologies</a>.</p><a class="text-link" href="${full ? config.companyUrl : '/about'}">${full ? 'Visit Navoja Technologies' : 'The story behind Doxibox'} ${icon('external')}</a></div></div></section>`;
}

function faqSection(full = false) {
  return `<section class="section faq-section"><div class="container faq-grid"><div class="faq-intro"><p class="eyebrow">A LITTLE CLARITY</p><h2>Good questions.<br>Clear answers.</h2><p>Get to know your corner of the cloud.</p><a class="text-link" href="${full ? '/contact' : '/faq'}">${full ? 'Talk to our team' : 'Explore all FAQs'} ${icon('arrow')}</a></div><div class="faq-list">${(full ? faqs : faqs.filter((_, index) => [0, 2, 3, 4, 7].includes(index))).map(([question, answer], index) => `<details class="faq-item"><summary><span class="faq-number">${String(index + 1).padStart(2, '0')}</span><span>${question}</span><span class="faq-toggle" aria-hidden="true">+</span></summary><div class="faq-answer">${answer}</div></details>`).join('')}</div></div></section>`;
}

function contact(full = false) {
  return `<section class="section contact-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">REAL PEOPLE, HERE TO HELP</p><h2>Let’s get in touch.</h2></div><p>Questions about Doxibox?<br>Find the right inbox below.</p></div><div class="contact-grid"><a class="contact-card" href="mailto:${config.supportEmail}"><span class="feature-icon blue">${icon('mail')}</span><h3>Technical support</h3><p>For product questions, account help<br>and technical assistance.</p><span class="contact-email">${config.supportEmail} ${icon('external')}</span></a><a class="contact-card" href="mailto:${config.privacyEmail}"><span class="feature-icon purple">${icon('lock')}</span><h3>Privacy & general inquiries</h3><p>For privacy questions and information<br>about Doxibox.</p><span class="contact-email">${config.privacyEmail} ${icon('external')}</span></a></div>${full ? '<div class="contact-note"><p><strong>Doxibox</strong> is developed and operated by Navoja Technologies.</p><p>For account deletion assistance, contact technical support. Please do not include passwords or sensitive files in your email.</p></div>' : ''}</div></section>`;
}

function cta() {
  return `<section class="cta-section"><div class="container cta-inner"><span class="cta-mark" aria-hidden="true">${brandMark()}</span><div><p class="eyebrow">YOUR FILES. YOUR CLOUD. YOUR CONTROL.</p><h2>Ready to bring your files together?</h2><p>Discover a simpler way to store, organize and share your digital content with Doxibox.</p></div><div class="cta-actions">${appAction('Get Started', 'button light')}${!config.appUrl ? '<small>Public app access is coming soon.</small>' : ''}</div></div></section>`;
}

function pageIntro(label, heading, text) {
  return `<section class="page-intro"><div class="container"><p class="eyebrow">${label}</p><h1>${heading}</h1><p>${text}</p></div></section>`;
}

const content = {
  home: () => hero() + featureSection() + howItWorks() + benefits() + privacy() + about() + faqSection(true) + contact() + cta(),
  features: () => pageIntro('A HOME FOR YOUR DIGITAL WORLD', 'A little space.<br><span>So many possibilities.</span>', 'Explore a simpler way to store, organize, access and share your digital files.') + featureSection(true) + howItWorks() + benefits() + privacy() + cta(),
  about: () => pageIntro('A PRODUCT OF NAVOJA TECHNOLOGIES', 'Your files deserve<br><span>a place to belong.</span>', 'Meet Doxibox. Your files. Your cloud. Your control.') + about(true) + benefits() + privacy() + cta(),
  faq: () => pageIntro('LET’S MAKE THINGS CLEAR', 'A few things you<br><span>might be wondering.</span>', 'Answers about Doxibox, from your first file to your sharing choices.') + faqSection(true) + contact(),
  contact: () => pageIntro('DOXIBOX SUPPORT', 'A conversation<br><span>starts here.</span>', 'Product questions, privacy inquiries or a little help along the way. We’re here to listen.') + contact(true) + `<section class="contact-policy container"><h2>Your privacy matters.</h2><p>Learn how Doxibox handles your information and the choices available to you.</p><a class="text-link" href="${config.origin}/policy">Read our Privacy Policy ${icon('arrow')}</a></section>`,
};

export function renderSite(page = 'home') {
  if (!pages[page]) throw new Error(`Unknown Doxibox page: ${page}`);
  const meta = pages[page];
  const canonical = config.origin + meta.path;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(meta.title)}</title><meta name="description" content="${escapeHtml(meta.description)}"><meta name="robots" content="index, follow"><meta name="theme-color" content="#315cf5"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Doxibox"><meta property="og:title" content="${escapeHtml(meta.title)}"><meta property="og:description" content="${escapeHtml(meta.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${config.origin}/doxibox/social-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Doxibox — Your files. Your cloud. Your control."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(meta.title)}"><meta name="twitter:description" content="${escapeHtml(meta.description)}"><meta name="twitter:image" content="${config.origin}/doxibox/social-card.png"><link rel="icon" type="image/svg+xml" href="/doxibox/favicon.svg"><link rel="stylesheet" href="/doxibox/site.css"><script src="/doxibox/site.js" defer></script></head><body>${header(page)}<main id="main" tabindex="-1">${content[page]()}</main>${footer()}</body></html>`;
}

export function siteResponse(page) {
  return new Response(renderSite(page), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
