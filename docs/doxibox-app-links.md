# Doxibox Android App Links

The Doxibox domain is routed by `vercel.json`. These routes apply only to `doxibox.navojatech.com`:

- `/.well-known/assetlinks.json` serves the Android association file, with HTTP 200 and `application/json`.
- `/<24-character MongoDB ObjectId>` redirects web browsers to the Doxibox Play Store listing.
- `/drama/<24-character MongoDB ObjectId>/<optional-title>` does the same for a drama.
- Other website routes continue to use their existing routing.

When Android App Links are verified and the app is installed, Android opens a matching link in the app before it reaches the website redirect. If the app is not installed, the browser follows the redirect. The listing must be published or accessible to the intended testers. The original content does not automatically open after installation; a deferred deep-link mechanism would be needed for that, or the user can tap the original link again.

## Set the signing fingerprint before deployment

This project uses Next.js static export, so the association file is generated **at build time**. Set `DOXIBOX_APP_LINK_SHA256` in the Vercel project environment for the intended deployment, then redeploy. Its value is the colon-separated SHA-256 **app signing certificate** fingerprint shown in Google Play Console → App integrity. When Play App Signing is enabled, use the Play app-signing fingerprint, not the upload-key fingerprint. Multiple fingerprints may be comma-separated when needed.

If the variable is missing, the exported file is `[]`: this serves a valid empty association file but intentionally does not authorize any app. If a value is malformed, the build fails instead of publishing an invalid fingerprint. The fingerprint is public certificate information; do not put a keystore or its password in the website configuration.

For a temporary local build test only, obtain the debug fingerprint with:

```sh
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android
```

Pass the resulting `SHA256` value at build time. Do not add a personal debug certificate to the production environment unless its trust implications are understood and it is removed after testing. A static local preview cannot prove Android verification of the live domain: the correct file must be deployed to the actual HTTPS domain without redirects first.

## Verify after deploying

```sh
curl -i https://doxibox.navojatech.com/.well-known/assetlinks.json
curl -I https://doxibox.navojatech.com/6aec817275a0cec922cd8d49
adb shell pm verify-app-links --re-verify com.doxibox
adb shell pm get-app-links com.doxibox
```

Then open actual file and drama share links from WhatsApp with the app installed. Test the Play Store fallback separately without the app. Check that unrelated website and legal pages still work. A local approximation is available after `npm run build` using `node scripts/preview-doxibox.mjs`; run `node --test scripts/test-doxibox.mjs` for routing checks.
