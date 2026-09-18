# LIMOTECH documentation

Operational and analytics notes for the LIMOTECH site, kept so that findings
do not have to be rediscovered.

## Operations

| Date | Document | Status |
| --- | --- | --- |
| 2026-09-17 | [Google measurement blocked by Content-Security-Policy](operations/2026-09-17-measurement-csp-incident.md) | CLOSED |

## Key references

- **GA4 Measurement ID:** `G-SJDLVF94SL`
- **GTM container:** `GTM-MKCT2XCV`
- **Content-Security-Policy:** defined only in `vercel.json` as an HTTP
  response header. There is no `headers()` in `next.config.js`, no middleware
  and no `<meta http-equiv>`, so that is the single place to change it.
- **Consent Mode:** defaults to `denied` in `src/app/layout.tsx` until the
  visitor accepts the banner (`localStorage` key `limotech-consent-v1`).
  Accept consent before any analytics QA, or results are not interpretable.

## Analytics QA order

```
Consent → dataLayer / GTM → GA4 request → correct tid / en → HTTP response
```

A GTM tag reporting "Completed" does not prove GA4 network delivery. CSP is
enforced on the request *after* the tag executes, so the browser network log
must always be checked. See the incident above.

## Conventions

- Operational and incident notes live in `docs/operations/`, named
  `YYYY-MM-DD-short-slug.md`.
- Never record customer names, email addresses, phone numbers, addresses or
  any other lead PII in this directory.
