# Google measurement blocked by Content-Security-Policy

- **Date closed:** 2026-09-17
- **Status:** CLOSED — fix deployed and validated in Production
- **Severity:** High — GA4 conversion data was being lost silently
- **Patch commit:** `173dcce497358fa71dbca276f74754e5fe4d4fa8`
- **Area:** `vercel.json` → `Content-Security-Policy` → `connect-src`

---

## Symptom

After the booking form was submitted successfully, GA4 reporting did not
reliably show `generate_lead`, even though the tag chain appeared healthy:

1. Form submitted successfully.
2. `dataLayer` received `lead_form_success`.
3. GTM tag **EV - Generate Lead** showed as **Completed** in Tag Assistant.
4. GA4 reporting was nonetheless incomplete and inconsistent.

Because every visible GTM signal looked correct, the fault was initially
attributed to GA4 configuration. It was not a GA4 problem.

## Investigation

Browser DevTools revealed Content-Security-Policy violations on production:

```
Refused to connect because it violates the document's Content Security Policy.
Fetch API cannot load ... Refused to connect ...
```

The blocked destinations were:

```
https://analytics.google.com/g/collect
https://stats.g.doubleclick.net/g/collect
https://www.google.com/g/collect
```

At the same time, some requests to the one permitted Google endpoint were
returning HTTP 204 — which is a *success* response, since GA4 always answers
`204 No Content`. That mixture of successes and refusals is the signature of a
**partial `connect-src` allowlist**.

The CSP is delivered as an HTTP response header from `vercel.json`
(`source: "/(.*)"`). There is no `headers()` in `next.config.js`, no
middleware, and no `<meta http-equiv>` anywhere, so that header is the single
place the policy is defined.

## Root cause

`connect-src` permitted `https://www.google-analytics.com` but **not** the
other Google measurement endpoints the browser actually used. Hits routed to
those endpoints never left the browser.

**Before**

```
connect-src 'self' https://formspree.io https://www.google-analytics.com
            https://*.tawk.to wss://*.tawk.to;
```

**After (approved minimal fix)**

```
connect-src 'self' https://formspree.io https://www.google-analytics.com
            https://analytics.google.com https://stats.g.doubleclick.net
            https://www.google.com https://*.tawk.to wss://*.tawk.to;
```

Exactly three origins were added. Nothing was removed, no wildcard was
introduced, and no other directive was touched.

| Origin | Why it is needed |
| --- | --- |
| `https://analytics.google.com` | GA4 alternate `/g/collect` host; used for certain routing and Google signals configurations |
| `https://stats.g.doubleclick.net` | Pinged when Google signals / ads personalization is active |
| `https://www.google.com` | `/g/collect` and `/ads/ga-audiences`, used for Google Ads conversion linking and audience building |

### Deliberately excluded

- `https://vercel.live` — a CSP error involving this domain still appears in
  **Preview**. It belongs to Vercel's Preview feedback widget
  (`/_next-live/feedback/feedback.js`), not to production analytics. It must
  **not** be added to the production CSP.
- Wildcards (`*`, `*.google.com`, `*.google-analytics.com`), plus
  `www.googleadservices.com`, `googleads.g.doubleclick.net` and
  `region1.google-analytics.com` — none were required by observed traffic.

## The distinction that caused the misdiagnosis

**A GTM tag showing "Completed" does NOT prove GA4 network delivery.**

Three independent layers must be separated:

| Layer | What it proves | What it does not prove |
| --- | --- | --- |
| **Tag execution** — GTM runs the tag's JavaScript | The trigger fired and the tag code ran without throwing | That any request left the browser |
| **Network delivery** — governed by CSP `connect-src` | The request was permitted and reached Google | That GA4 accepted or processed it |
| **GA4 processing / reporting** | The hit was ingested and is queryable | — |

CSP is enforced *after* the tag executes, on the resulting request. A tag can
therefore report "Completed" while every measurement request it produced is
refused. **Browser network evidence must always be checked.**

## Consent Mode consideration

The site implements Google Consent Mode, and the default in
`src/app/layout.tsx` is **denied** for `analytics_storage`, `ad_storage`,
`ad_user_data` and `ad_personalization` until the visitor accepts the banner
(stored under `limotech-consent-v1`).

Under denied consent GA4 sends cookieless pings that do not populate standard
reports as ordinary events. This can look identical to the CSP failure.

**Consent was explicitly accepted before the controlled conversion test**, so
it was ruled out as a cause. Any future analytics QA must accept consent first,
or the results are not interpretable.

## Validation

### Preview — conversion path

- Branch `fix/csp-google-measurement`, commit `173dcce`
- Consent explicitly accepted before testing
- One controlled booking form submission
- No Google measurement CSP refusals
- GA4 request inspected directly in DevTools:

```
tid          = G-SJDLVF94SL
en           = generate_lead
ep.form_name = booking_request
HTTP         = 204
```

No customer PII was observed in the inspected GA4 parameters.

### Production — after promotion

- Vercel: Environment **Production**, Status **Ready**, Commit **173dcce**
- Domain tested: `https://www.limotech.ca/`
- No Google measurement CSP refusal observed
- GA4 request observed:

```
tid          = G-SJDLVF94SL
en           = book_ride_click
dl           = https://www.limotech.ca/
ep.link_text = Book Your Ride
HTTP         = 204
```

**GA4 Measurement ID:** `G-SJDLVF94SL` · **GTM container:** `GTM-MKCT2XCV`

## Operational lesson — LIMOTECH analytics QA order

Validate in this order. Stopping early produces false confidence:

```
1. Consent          accept the banner; confirm localStorage limotech-consent-v1 = granted
2. dataLayer / GTM  confirm the event and that the tag fires
3. GA4 request      confirm a /collect request actually leaves the browser (no CSP refusal)
4. tid / en         confirm the Measurement ID and event name on that request
5. HTTP response    confirm 204
6. GA4 reporting    confirm receipt later (Realtime, then standard reports)
```

Step 3 is the one that was missing during the original diagnosis.

A fast, no-interaction production check of the header itself:

```
curl -sI https://limotech.ca | grep -i content-security-policy
```

## Follow-up observations (no action taken)

- Production was tested on `https://www.limotech.ca/` while every canonical in
  the build points at the apex `https://limotech.ca/`. Worth confirming which
  host is authoritative and that the other redirects to it.
- `connect-src`, `script-src`, `style-src`, `font-src` and `frame-src` all
  allowlist Tawk.to, but Tawk.to has **no references** in `src/` and appears in
  **none** of the built HTML files. Removing it would tighten the policy.
- `@emailjs/browser` is in `package.json` with zero references in `src/`.
