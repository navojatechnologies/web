# Doxibox public website

Implemented locally in the existing Navoja repository. No deployment, new project, repository, DNS change or domain configuration change was performed.

## Design and implementation

Doxibox's app-matched dark-green identity uses the supplied app palette in `public/doxibox/theme.css`, shared by marketing, Privacy Policy, Terms and 404 pages. The existing layered-storage logo motif, responsive sticky header, original SVG cloud/file artwork, six feature cards, four product steps, illustrated folder organization, privacy section, company information, nine native FAQ accordions, email contact cards and multi-column footer remain. Product visuals are explicitly labeled illustrations and have no simulated upload or dashboard controls.

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
| `/policy` | `/doxibox/policy` | Complete existing privacy policy with app theme; legal text unchanged |
| `/terms` | `/doxibox/terms` | Full 26-section Terms and Conditions |
| `/sitemap.xml` | `/doxibox/sitemap.xml` | Seven public content URLs |
| `/robots.txt` | `/doxibox/robots.txt` | Allow crawling and declare sitemap |

Non-root content routes also accept a trailing slash. Canonicals use the exact public paths above, with a slash only for the root. `/account-deletion`, corporate-only routes and other unknown Doxibox paths return a branded HTTP 404 with `noindex, follow`. Terms and Conditions is linked in the shared marketing footer. Account Deletion is omitted from the footer; assistance remains available through the actual support email in the FAQ, consistent with the existing policy.

Ordered `vercel.json` rules match **only** the exact Doxibox hostname. The existing corporate domains and Vercel preview hostnames fall through to their existing routes. Static export does not support hostname middleware; the established host-scoped Vercel routing remains the selection mechanism. The allowlist includes only the actual marketing/policy CSS, enhancement script, favicon and PNG social image; there is no broad Doxibox filesystem fallback that exposes corporate pages.

The policy Markdown, Route Handler and SEO configuration remain unchanged. It retains all 23 sections and its original canonical URL. The renderer now loads the shared app palette and advertises the dark browser theme color; its existing CSS uses those palette variables. All body markup and legal wording remain unchanged.

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
| `termsUrl` | `https://doxibox.navojatech.com/terms` | Working Terms and Conditions footer link |

The product-specific Terms page is implemented in this checkout and becomes public through the existing project's normal release. The grievance officer name and registered business address remain clearly identified placeholders in section 25. The desktop and mobile headers contain only the logo and navigation. The homepage hero offers working Explore Features and Contact Support links; the final call to action on Home, Features and About links to Contact Support. Disabled Get Started buttons and Coming soon messaging have been removed. No account deletion webpage is linked in the footer. Rebuild after changing any configuration. Publishing these URLs does not implement their backend behavior.

Support links are actual `mailto:support@navojatech.com` and `mailto:info@navojatech.com` links. They open the visitor's configured email client; no form submission or ticket creation is simulated. Company links use `https://navojatech.com`.

## Local preview and validation

```powershell
npm run build
node --test scripts/test-doxibox.mjs
node scripts/preview-doxibox.mjs
```

Open **http://localhost:4173/**. The preview serves the `out` directory and maps plain localhost to the Doxibox hostname. Rebuild after editing source. `DOXIBOX_PREVIEW_PORT` optionally selects another port; the older `POLICY_PREVIEW_PORT` remains supported. Stop with Ctrl+C.

The normal Next development server does not apply Vercel host rules. With `npm run dev`, inspect internal paths such as `/doxibox/home`, `/doxibox/features`, `/doxibox/policy` and `/doxibox/terms`. Public navigation should be reviewed using the export preview above.

Initial marketing implementation validation on 8 November 2026 (before the app-theme update documented below):

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
4. Verify HTTP 200 and correct branding on `/`, `/features`, `/about`, `/faq`, `/contact`, `/policy` and `/terms` under `https://doxibox.navojatech.com`. Check optional trailing slashes, preserved policy content, all styles/scripts/images and the page-specific canonicals.
5. Check `/sitemap.xml`, `/robots.txt`, `/doxibox/favicon.svg`, `/doxibox/social-card.png` and `/doxibox/terms.css`. Verify `/services/` and `/account-deletion` return 404 on the Doxibox hostname, and that `https://navojatech.com` and `https://www.navojatech.com` retain their prior behavior and redirects.
6. Verify mobile navigation, FAQ toggles, email links, Explore Features and Contact Support actions in the released site.

No DNS work or new hosting setup is needed for this change. Live edge verification remains pending the explicitly approved release.

## Terms implementation — 8 November 2026

Added `/terms` within the existing hostname-scoped static routing. No deployment, repository, Vercel project or DNS changes were made. The Terms page shares the marketing site's actual header, mobile navigation, footer, stylesheet, theme variables and favicon. Its own stylesheet adds a responsive document layout, sticky desktop table of contents, all 26 section anchors, readable 16px body text and print styles. The document remains readable and navigable without JavaScript.

The complete supplied document is stored in `content/doxibox/terms-and-conditions.md`. All 26 sections and all subsections are preserved. The only source adjustments are date spacing, valid `mailto:` links, and replacing the supplied grievance name/address values with explicit placeholders as requested. Effective Date and Last Updated both remain **7 November 2026**. Section 25 placeholders are `[Grievance Officer name — to be provided]` and `[Registered business address — to be provided]`. No account deletion or reporting functionality was created.

Created files:

- `content/doxibox/terms-and-conditions.md` — complete legal source.
- `app/doxibox/terms-config.mjs` — requested SEO title, description and canonical URL.
- `app/doxibox/terms-document.mjs` — semantic HTML renderer, dates, links and table of contents; rejects missing sections/dates and unsupported link schemes.
- `app/doxibox/terms/route.js` — public document's force-static HTML handler.
- `public/doxibox/terms.css` — document-only responsive and print styling.

Modified files:

- `app/doxibox/site-document.mjs` — exports the existing header and footer for reuse.
- `app/doxibox/site-config.mjs` — activates the shared footer Terms destination.
- `app/doxibox/sitemap.xml/route.js` — adds `/terms`.
- `vercel.json` — adds hostname-scoped Terms routing and stylesheet allowlist entry; preserves existing policy rules.
- `scripts/preview-doxibox.mjs` — recognizes the extensionless Terms export as HTML.
- `scripts/test-doxibox.mjs` — adds complete Terms content, metadata, links, anchor, public route, validation and hostname-isolation checks; retains policy coverage.
- `docs/doxibox-website.md` — updates this routing and implementation guide.

Terms validation:

- `npm run build` passes, including the existing TypeScript check and Terms static export.
- `node --test scripts/test-doxibox.mjs`: **13 tests pass**.
- Compared the entire document with the supplied attachment after only the stated source adjustments: exact match.
- Existing policy export is byte-for-byte unchanged. The homepage renderer differs only in the required footer Terms link. All 62 corporate HTML documents remain unchanged after excluding generated scripts/preloads.
- Installed Chrome checked all seven public content routes at **320, 390, 768, 1024 and 1440px**, with no horizontal overflow. All 26 desktop Terms anchors, mobile section navigation, native mobile menu, Escape dismissal, keyboard skip link, no-JavaScript document and print visibility checks pass. No browser script or resource errors occurred.
- Browser QA used temporary Playwright tooling and screenshots outside the checkout; package manifests and lockfiles are unchanged. Actual Vercel edge behavior and the production `/terms` URL remain unverified until release through the existing project.

## App theme update — 8 November 2026

Applied the app palette supplied by the owner across all seven Doxibox content pages and the branded 404 page. Dark is the default even when the visitor's device prefers light mode. No theme toggle, application behavior, legal wording or routing destination was added or changed. The registered-address and grievance-officer placeholders remain in Terms section 25.

| Role | Default dark color |
| --- | --- |
| Page | `#101413` |
| Cards / surfaces | `#191E1C` |
| Secondary surfaces | `#222925` |
| Links / primary highlights | `#00A976` |
| Primary background | `#103E30` |
| Main text | `#F1F6F3` |
| Secondary text | `#A4B2AA` |
| Borders | `#2D3731` |
| Error token | `#F58C86` |
| Green button text | `#03271B` |
| Optional decorative gold | `#D8A44D` |

The shared stylesheet defines all colors in one place and uses the supplied light palette for print. Marketing and policy layout styles reference these shared variables instead of the previous blue/purple/light colors. Existing typography and responsive layouts remain. Green buttons use the requested dark foreground. The small CTA label uses main text to keep sufficient contrast on the tinted green background. The cloud illustration, icon accents, favicon, and both SVG/PNG social previews use the new palette. The PNG was rendered from the existing SVG at 1200×630; no image-generation dependency was introduced.

Created: `public/doxibox/theme.css`.

Modified for this theme update:

- `public/doxibox/site.css` and `public/doxibox/policy.css` — use app palette for backgrounds, text, cards, links, borders, buttons, menus and decorative elements.
- `app/doxibox/site-document.mjs`, `app/doxibox/policy-document.mjs` and `app/doxibox/terms-document.mjs` — load shared theme stylesheet and set browser theme color; recolor the homepage's existing inline SVG cloud.
- `public/doxibox/favicon.svg`, `public/doxibox/social-card.svg` and `public/doxibox/social-card.png` — matching brand assets.
- `public/doxibox/404.html` — shared palette and browser theme color.
- `vercel.json` — allow the shared theme stylesheet on the existing Doxibox hostname.
- `scripts/test-doxibox.mjs` — include the new stylesheet in existing legal-link and public-asset checks.
- `docs/doxibox-website.md` — current design and verification notes.

Validation: production build and all 13 Node tests pass. Chrome checked all seven public routes at 320, 390, 768, 1024 and 1440px with no horizontal overflow. Default dark mode was verified with device light preference, along with exact palette tokens, card/button/menu colors, mobile navigation, Escape handling, section anchors, no-JavaScript behavior, print palette and branded 404. Automated axe WCAG A/AA checks found zero violations on all seven pages at desktop and 320px widths, with FAQ content expanded. No browser script/resource errors occurred. Both legal Markdown files and rendered HTML bodies match their pre-theme baselines exactly; all 62 corporate HTML documents retain their rendered markup after excluding generated scripts/preloads. Temporary QA tooling did not change package manifests or the lockfile. No deployment or DNS changes were performed.
