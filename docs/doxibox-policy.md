# Doxibox privacy policy: implementation and deployment

> Historical policy-only implementation record. The current marketing website adds the homepage, features, about, FAQ, contact and sitemap routes while preserving this policy. Follow [Doxibox website](doxibox-website.md) for the current file inventory, routing, tests and release instructions. The subdomain is already connected; the domain/DNS setup steps below describe the earlier setup and are not required for this update.

Target public URL: **https://doxibox.navojatech.com/policy**.

The implementation is complete locally. No deployment, Vercel domain settings, DNS records, or production resources have been changed. Production changes require the owner's approval.

## Existing project

- Next.js **16.4.3** (locked version), React 19, JavaScript, App Router.
- Existing `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, unoptimized images. These settings are unchanged.
- Existing global corporate CSS uses DM Sans/Manrope, neutral backgrounds and purple/red accents. The policy uses separate CSS, a purple Doxibox identity, system-font fallbacks, a white background, and a comfortable reading width. It makes no external font requests.
- Corporate header/footer remain in `app/layout.js`. The policy is a static HTML Route Handler, which does not inherit page layouts, so none of the corporate routes or layouts needed modification.
- No middleware, hostname routing, `vercel.json`, authentication layer, robots file, lint script, or Vercel project-link directory existed in this checkout.
- Existing `.openai/hosting.json` identifies a separate hosting integration and the `out` directory; it is untouched. Vercel dashboard build/domain settings are not available in this checkout and must be confirmed by the project owner.
- No package manifest, lockfile, dependency, existing route, or existing design file was changed.

## Files added

| File | Purpose |
| --- | --- |
| `content/doxibox/privacy-policy.md` | Policy content, all 23 sections and subsections; deletion-webpage references removed at the owner's request. Edit legal content here. |
| `app/doxibox/policy/route.js` | Statically renders a complete HTML document with `dynamic = 'force-static'`. |
| `app/doxibox/policy-config.mjs` | Metadata, canonical URL, contacts and company URL. |
| `app/doxibox/policy-document.mjs` | Document layout, navigation and limited Markdown rendering; fails the build if either date or any section is missing. |
| `public/doxibox/policy.css` | Responsive styles, keyboard focus, skip link, reduced-motion and print styles. |
| `public/doxibox/404.html` | Doxibox missing-page document. |
| `public/doxibox/robots.txt` | Public crawling instructions for the Doxibox hostname. |
| `vercel.json` | Ordered, hostname-scoped routing rules. |
| `scripts/preview-doxibox.mjs` | Local preview of the production export and hostname-rule approximation. |
| `scripts/test-doxibox.mjs` | Content, metadata, link and hostname-routing verification using Node's built-in test runner. |
| `docs/doxibox-policy.md` | This guide. |

No existing tracked files were modified.

## Hostname routing

`vercel.json` uses ordered routes with `has: [{ "type": "host", "value": "doxibox.navojatech.com" }]`:

1. `/policy` and `/policy/` internally serve `/doxibox/policy`, with an explicit HTML content type. This is a rewrite, so the requested browser URL remains visible.
2. `/doxibox/policy.css` serves the policy stylesheet.
3. `/robots.txt` internally serves `/doxibox/robots.txt`.
4. Every other Doxibox pathname serves the branded missing-page document with **HTTP 404** and `X-Robots-Tag: noindex, follow`. This includes `/`, corporate routes such as `/services/`, and `/account-deletion`; no deletion webpage is offered.

All rules are scoped to the exact Doxibox hostname. Requests for `navojatech.com`, `www.navojatech.com`, and Vercel preview hostnames fall through to the existing framework/static routing. No corporate redirects or SEO settings are replaced. The internal route can also be inspected at `/doxibox/policy/` on the development server; its canonical URL always points to the Doxibox subdomain.

Ordered `routes` are intentional: a high-level fallback rewrite could otherwise allow an existing corporate filesystem route to resolve on the Doxibox hostname before the Doxibox 404 rule. Next.js Proxy/middleware is not compatible with the existing static export, so hostname selection belongs at the hosting layer.

References: [Vercel route configuration](https://vercel.com/docs/project-configuration/vercel-json#routes), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).

## Local verification

From this existing repository:

```powershell
npm ci
npm run build
node --test scripts/test-doxibox.mjs
node scripts/preview-doxibox.mjs
```

Open **http://localhost:4173/policy**. Plain localhost is treated as the Doxibox hostname by this preview helper only. The helper serves the built `out` directory, so rebuild after policy/content changes. For the normal Next.js development server, run `npm run dev` and open `http://localhost:3000/doxibox/policy/`; `next dev` does not apply `vercel.json` rules.

Test explicit hostname requests without editing DNS or the hosts file:

```powershell
curl.exe -i -H "Host: doxibox.navojatech.com" http://127.0.0.1:4173/policy
curl.exe -i -H "Host: doxibox.navojatech.com" http://127.0.0.1:4173/services/
curl.exe -i -H "Host: navojatech.com" http://127.0.0.1:4173/
curl.exe -i -H "Host: www.navojatech.com" http://127.0.0.1:4173/
```

Expected statuses: **200, 404, 200, 200**. The local helper approximates this project's route rules; it is not a Vercel edge emulator. Actual hostname routing remains a deployment verification item. Vercel also documents limitations for local `has` matching in `vercel dev`.

Validation performed:

- Original and updated `npm run build` passed on the locked Next.js 16.4.3 release.
- All seven Node tests cover the current policy content, 23 sections, all subsections, metadata, canonical URL, anchors, allowed URLs, mailto links for deletion requests, absence of deletion-webpage references, public HTML, robots/CSS, hostname rules, and real 404 statuses in local preview.
- Compared all **62 pre-existing exported HTML documents** with the original build: rendered markup unchanged, excluding generated script tags/preloads. Existing corporate source files are untouched.
- Verified the actual Next.js development route returns HTTP 200 with `text/html; charset=utf-8`.
- Headless Chrome checked widths **320, 375, 390, 768, 1024 and 1440px** with JavaScript disabled: all 23 sections present, no horizontal overflow, no scripts required, correct canonical, and no empty links.
- Smooth section navigation worked with JavaScript disabled. Browser console and failed-resource checks were clear. Automated axe WCAG A/AA checks found no violations at desktop and 320px mobile sizes.
- The project has no lint script or ESLint dependency. The Next.js production build's TypeScript check passed; no lint setup or dependencies were added.

## Vercel and DNS: owner actions after approval

1. In Vercel, open the **existing project serving navojatech.com**. Do not create or import another project. Confirm its existing repository/root directory and build setup. The normal `npm run build` still produces `out`; retain working framework/build/output settings.
2. Review and deploy this change through the existing project's normal release workflow after approval. Ensure the root `vercel.json` is included. Do not publish these assets through another host that ignores that configuration.
3. In that same project, go to **Settings → Domains → Add Domain** and enter `doxibox.navojatech.com`. Assign it to the production deployment. Choose to serve the project, rather than redirecting the subdomain to another domain. Leave the existing apex and `www` entries intact.
4. Copy the **specific DNS record value displayed by Vercel**. At the DNS provider managing `navojatech.com`, add:

| Type | Name / host | Target / value | TTL |
| --- | --- | --- | --- |
| `CNAME` | `doxibox` (or `doxibox.navojatech.com` if the provider requires the full name) | **The exact CNAME target Vercel displays for this domain/project** | Provider default / Auto |

The CNAME target is deliberately unresolved here: the domain has not been added, and Vercel can assign project-specific targets. Do not guess an IP address or a generic Vercel hostname. If Vercel requests ownership verification, add the exact TXT name/value shown there too. Inspect any existing record at the `doxibox` label before replacing it; retain all unrelated DNS records.

5. Wait for Vercel to report a valid domain configuration and provision HTTPS. Confirm the public production policy is exempt from any deployment protection/login screen so reviewers can access it.
6. Verify the deployed **Doxibox hostname**, not just a `vercel.app` URL:

```powershell
curl.exe -I https://doxibox.navojatech.com/policy
curl.exe -I https://doxibox.navojatech.com/policy/
curl.exe -I https://doxibox.navojatech.com/robots.txt
curl.exe -I https://doxibox.navojatech.com/doxibox/policy.css
curl.exe -I https://doxibox.navojatech.com/services/
curl.exe -I https://doxibox.navojatech.com/account-deletion
curl.exe -I https://navojatech.com
curl.exe -I https://www.navojatech.com
```

The policy, robots and CSS must return 200; Doxibox `/services/` and `/account-deletion` must return 404. Confirm both corporate hosts retain their previous behavior, including any existing canonical-domain redirects. In an incognito browser, check that the policy URL remains `/policy`, HTML is readable without JavaScript or login, styling loads, and the canonical URL is `https://doxibox.navojatech.com/policy`.

Reference: [Vercel custom-domain setup and project-specific DNS targets](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## Remaining implementation requirements

- **Account deletion requests use support@navojatech.com.** At the owner's request, the deletion-webpage references, placeholder notices and future URL configuration have been removed. Sections 13 and 22 provide clickable support email links. No deletion page or form is published.
- Update the supplied policy if the supported in-app deletion flow differs from its wording.
- The official-website placeholder resolves to the provided `https://navojatech.com`. Apart from the requested deletion-webpage removal and contact update, the supplied policy wording is preserved. Both dates come from the Markdown source, so legal text and visible dates can be maintained together.
- The owner must ensure Doxibox's actual age/consent controls, advertising, retention, deletion and complaint-handling practices match the supplied policy. This website change implements the document; it does not implement those product controls.
- Production release, domain assignment, exact DNS target, HTTPS issuance, and live reviewer access remain unverified until the approved deployment/domain setup is completed.
