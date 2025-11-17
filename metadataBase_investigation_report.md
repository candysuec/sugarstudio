# metadataBase Investigation Report

## Problem
The `website` app is showing a `metadata.metadataBase is not set for resolving social open graph or twitter images, using "http://localhost:3000"` warning during build, despite `metadataBase` being explicitly set in `apps/website/app/layout.tsx`.

## Current State
The file `apps/website/app/layout.tsx` contains the following line within the `metadata` export:
```typescript
metadataBase: new URL("https://candystudio.ai"),
```

## Analysis
While `metadataBase` is present and correctly formatted as a `URL` object, Next.js often expects this value to be dynamically set, typically via an environment variable, especially in build environments like Vercel. Hardcoding the URL can lead to this warning if Next.js's internal checks are looking for a specific pattern or if the build environment's URL differs from the hardcoded value. The warning explicitly states it's falling back to `http://localhost:3000`, which indicates that the hardcoded `https://candystudio.ai` is not being correctly recognized or utilized as the base URL for metadata resolution.

## Recommended Fix
Modify `apps/website/app/layout.tsx` to use an environment variable for `metadataBase`, with a fallback for local development. This is a more robust and standard approach for Next.js applications, ensuring the correct base URL is used across different deployment environments.

**Proposed Change to `apps/website/app/layout.tsx`:**

```typescript
// Before:
// metadataBase: new URL("https://candystudio.ai"),

// After:
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : 'http://localhost:3000'; // Fallback for local development

export const metadata: Metadata = {
  metadataBase: BASE_URL, // Use the dynamically determined base URL
  // ... other metadata fields
};
```

Additionally, ensure that `NEXT_PUBLIC_SITE_URL` is set in the appropriate `.env` files (e.g., `.env.local` for local development, and in the Vercel project settings for deployment). For Vercel, `process.env.VERCEL_URL` can often be used to derive this.

---

# Updated Phase 9 Status Summary

*   **Build Status**: ✅ **PASSED**
*   **Critical Build Blockers**: All critical build blockers identified in Phase 8 and subsequent fixes have been successfully resolved.
*   **Remaining Non-Critical Warnings**:
    *   The `metadataBase` warning in the `website` app (addressed by the recommended fix above).
    *   Recurring `TypeScript project references are not fully supported` warning (non-blocking).
    *   Minor webpack cache serialization warnings (non-blocking).
    *   Supabase Node.js API in Edge Runtime warning (non-blocking for Node.js environments, but requires attention for Edge deployments).

---

**Waiting for confirmation before applying any changes.**
