# Doxibox public website

Implemented locally in the existing Navoja repository. No deployment, new project, repository, DNS change or domain configuration change was performed.

## Design and implementation

Original blue Doxibox identity using the existing policy's layered-storage logo motif, with CSS theme variables, a responsive sticky header, original SVG cloud/file artwork, six feature cards, four product steps, illustrated folder organization, a privacy section, company information, nine native FAQ accordions, email contact cards and a multi-column footer. Product visuals are explicitly labeled illustrations and have no simulated upload or dashboard controls.

Next.js 16.4.3 App Router and React 19 remain installed. The existing `output: 'export'`, `trailingSlash: true` configuration is unchanged. As with the policy, marketing pages use force-static HTML Route Handlers to avoid inheriting corporate layouts, fonts, CSS and React bundles. Shared document, content, icon and configuration modules keep pages consistent. A small progressive-enhancement script dismisses the native mobile navigation with Escape, outside clicks and viewport changes. Navigation and FAQ accordions also work without JavaScript. There are no runtime third-party requests or new project dependencies. Typography uses Inter when installed, then Segoe UI/Arial/system fallbacks; no external font download is needed.

The site includes distinct titles, descriptions, canonical URLs, Open Graph/Twitter metadata, a real 1200×630 PNG preview, SVG favicon, sitemap, robots directives, heading hierarchy, skip navigation, keyboard focus styles and reduced-motion support. SVG illustrations are inline, so no image loading shifts or non-critical external images are introduced.

## Public routes and hosting

All routes below are for **https://doxibox.navojatech.com**:

| Public path | Static export destination | Behavior |
| --- | --- | --- |
| `/` | `/doxibox/home` | Complete Doxibox homepage |
| `/features` | `/doxibox/features` | Six detailed features, steps, benefits and privacy |
| `/about` | `/doxibox/about` | Doxibox and Navoja Technologies |
| `/faq` | `/doxibox/faq` | All nine questions and support contacts |
| `/contact` | `/doxibox/contact` | Technical support, privacy and general inquiries |
| `/policy` | `/doxibox/policy` | Existing, unchanged full privacy policy |
| `/sitemap.xml` | `/doxibox/sitemap.xml` | Six public content URLs |
| `/robots.txt` | `/doxibox/robots.txt` | Allow crawling and declare sitemap |

Non-root content routes also accept a trailing slash. Canonicals use the exact public paths above, with a slash only for the root. `/terms`, `/account-deletion`, corporate-only routes and other unknown Doxibox paths return a branded HTTP 404 with `noindex, follow`. Unpublished terms appear as text in the footer, without a placeholder link. Account Deletion is omitted from the footer; assistance remains available through the actual support email in the FAQ, consistent with the existing policy.

Ordered `vercel.json` rules match **only** the exact Doxibox hostname. The existing corporate domains and Vercel preview hostnames fall through to their existing routes. Static export does not support hostname middleware; the established host-scoped Vercel routing remains the selection mechanism. The allowlist includes only the actual marketing/policy CSS, enhancement script, favicon and PNG social image; there is no broad Doxibox filesystem fallback that exposes corporate pages.

The existing policy Markdown, renderer, Route Handler, metadata configuration and CSS were not changed. The policy retains all 23 sections and its original canonical URL. Its pre-existing visual styling is deliberately preserved.

Framework references: [Next.js static exports and Route Handlers](https://nextjs.org/docs/app/guides/static-exports), [Vercel ordered routing configuration](https://vercel.com/docs/project-configuration/vercel-json#routes).

## Complete file inventory

Created (16 files):

- `app/doxibox/site-config.mjs` — URL configuration and per-page SEO data.
- `app/doxibox/site-content.mjs` — feature, step and FAQ copy.
- `app/doxibox/site-icons.mjs` — original SVG mark and icons.
- `app/doxibox/site-document.mjs` — shared chrome, illustrations, sections and HTML renderer.
- `app/doxibox/home/route.js` — statically rendered homepage.
- `app/doxibox/features/route.js` — statically rendered features page.
- `app/doxibox/about/route.js` — statically rendered about page.
- `app/doxibox/faq/route.js` — statically rendered FAQ page.
- `app/doxibox/contact/route.js` — statically rendered contact page.
- `app/doxibox/sitemap.xml/route.js` — static sitemap.
- `public/doxibox/site.css` — isolated responsive marketing styles.
- `public/doxibox/site.js` — small mobile-navigation enhancement.
- `public/doxibox/favicon.svg` — Doxibox browser icon.
- `public/doxibox/social-card.svg` — editable original social image source.
- `public/doxibox/social-card.png` — generated social-sharing preview.
- `docs/doxibox-website.md` — this implementation and release guide.

Modified (6 files):

- `vercel.json` — extend existing hostname-scoped routes for marketing pages, assets and sitemap; preserve policy routing.
- `scripts/preview-doxibox.mjs` — support captured destinations, extensionless HTML responses and the website preview URL.
- `scripts/test-doxibox.mjs` — retain policy tests and add marketing route, metadata, links, assets, sitemap and corporate isolation checks.
- `public/doxibox/robots.txt` — add Doxibox sitemap declaration.
- `public/doxibox/404.html` — use the marketing favicon/styles and add a homepage link.
- `docs/doxibox-policy.md` — identify the previous policy-only implementation guide as historical and point here for current routing and release steps.

No corporate page, component, stylesheet, root layout, package manifest, lockfile, Next.js configuration, existing legal source or hosting integration manifest was modified. Generated `.next` and `out` files are ignored build artifacts.

## App and legal destination configuration

Set only real published HTTPS destinations in `app/doxibox/site-config.mjs`:

| Setting | Current value | Rendered behavior |
| --- | --- | --- |
| `appUrl` | Empty | Disabled Get Started button with Coming soon label and explanation |
| `termsUrl` | Empty | Terms and Conditions text labeled Not yet published |

No app destination or published product-specific terms webpage was supplied. These are the only missing configuration items; no assets are missing and there are no fake or placeholder navigation links. The desktop and mobile headers contain only the logo and navigation; Sign In and Get Started actions have been removed from the header. Get Started remains in the homepage hero and final call to action. No account deletion webpage is linked in the footer. Do not substitute corporate legal pages without confirming that they apply to Doxibox. Rebuild after changing any configuration. Publishing these URLs does not implement their backend behavior.

Support links are actual `mailto:support@navojatech.com` and `mailto:info@navojatech.com` links. They open the visitor's configured email client; no form submission or ticket creation is simulated. Company links use `https://navojatech.com`.

## Local preview and validation

```powershell
npm run build
node --test scripts/test-doxibox.mjs
node scripts/preview-doxibox.mjs
```

Open **http://localhost:4173/**. The preview serves the `out` directory and maps plain localhost to the Doxibox hostname. Rebuild after editing source. `DOXIBOX_PREVIEW_PORT` optionally selects another port; the older `POLICY_PREVIEW_PORT` remains supported. Stop with Ctrl+C.

The normal Next development server does not apply Vercel host rules. With `npm run dev`, inspect internal paths such as `/doxibox/home`, `/doxibox/features` and `/doxibox/policy`. Public navigation should be reviewed using the export preview above.

Validation performed on 8 November 2026:

- Production build passed, including the configured Next TypeScript check. No lint script/ESLint configuration exists, so no lint dependency was introduced.
- All nine Node tests passed: full policy preservation, 23 sections and subsections, metadata, anchors, every marketing link and asset, mailto destinations, distinct canonicals, nine FAQs, six feature cards, sitemap, robots, slash variants, genuine missing-page statuses, and hostname isolation.
- Compared the before/after exports: all 62 pre-existing corporate HTML documents were unchanged after excluding generated script/preload tags. The existing policy export was byte-for-byte unchanged, including metadata and all legal content.
- Headless installed Chrome checked all six content routes at 320, 375, 390, 768, 900, 1024 and 1440px with no horizontal overflow. Keyboard and pointer checks covered mobile navigation, Escape dismissal/focus restoration and FAQ opening/closing. Native navigation/FAQ behavior was also checked with JavaScript disabled.
- Browser console, script exception and failed-resource checks were clear. Automated axe WCAG A/AA checks reported zero violations across all six content routes at desktop and 320px mobile sizes with FAQ answers open. Low-contrast labels discovered in the initial scan were darkened before final verification.

Playwright/axe were used from a temporary QA directory with the installed Chrome executable; they are not project dependencies. No Lighthouse score is claimed. The local helper approximates this project's ordered rules; real Vercel edge behavior still requires post-release verification.

## Existing Vercel project release instructions

1. Review the diff and obtain the owner's approval to deploy. This implementation has not been committed, pushed or deployed. A push to a Vercel-connected production branch may deploy automatically, so do not push before that approval.
2. Use the **existing Vercel project** and its current repository/root/build settings. Keep `npm run build`, static output `out` and the root `vercel.json`. Do not create a project or separate deployment target.
3. Release through that project's normal approved workflow. The Doxibox subdomain is already connected; leave production DNS, Cloudflare records, corporate domain configuration and existing domain assignments unchanged.
4. Verify HTTP 200 and correct branding on `/`, `/features`, `/about`, `/faq`, `/contact` and `/policy` under `https://doxibox.navojatech.com`. Check optional trailing slashes, preserved policy content, all styles/scripts/images and the page-specific canonicals.
5. Check `/sitemap.xml`, `/robots.txt`, `/doxibox/favicon.svg` and `/doxibox/social-card.png`. Verify `/services/`, `/terms` and `/account-deletion` return 404 on the Doxibox hostname, and that `https://navojatech.com` and `https://www.navojatech.com` retain their prior behavior and redirects.
6. Verify mobile navigation, FAQ toggles, email links and Coming soon states in the released site. Do not announce the app as live until the real app URL has been configured and independently verified.

No DNS work or new hosting setup is needed for this change. Live edge verification remains pending the explicitly approved release.
