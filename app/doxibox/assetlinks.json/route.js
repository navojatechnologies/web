export const dynamic = 'force-static';

// The fingerprint is public, but it must belong to the app-signing key used
// by the installed build. Supply it at build time; never use an upload-key
// fingerprint in place of the Play app-signing fingerprint.
export function GET() {
  const fingerprints = (process.env.DOXIBOX_APP_LINK_SHA256 || '')
    .split(',').map(value => value.trim().toUpperCase()).filter(Boolean);
  const validFingerprint = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;
  if (fingerprints.some(value => !validFingerprint.test(value))) {
    throw new Error('DOXIBOX_APP_LINK_SHA256 must contain comma-separated SHA-256 certificate fingerprints.');
  }
  const statements = fingerprints.length ? [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: { namespace: 'android_app', package_name: 'com.doxibox', sha256_cert_fingerprints: [...new Set(fingerprints)] },
  }] : [];
  return new Response(JSON.stringify(statements), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
