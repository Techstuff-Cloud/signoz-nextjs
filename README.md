# @your-org/telemetry

Shared OpenTelemetry logging for **Next.js (App Router)** projects.  
Ships structured logs to SigNoz — browser info, user ID, page URL and error tracking included out of the box.

---

## Installation

```bash
npm install git+https://github.com/your-org/telemetry.git
```

---

## Setup

**Step 1 — Add env vars** to `.env.local`:
```bash
NEXT_PUBLIC_OTEL_SERVICE_NAME=your-app-name   # shown in SigNoz to identify your project
OTEL_EXPORTER_OTLP_ENDPOINT=http://your-signoz-collector:4318
```

**Step 2 — Create the proxy route** at `app/api/telemetry/logs/route.ts`:

> The browser cannot POST directly to the SigNoz collector due to CORS. This Next.js route receives the payload on the same origin and forwards it server-side.

```ts
export { POST } from '@your-org/telemetry/next';
```

**Step 3 — Mount the provider** in `app/layout.tsx`:
```tsx
import { TelemetryProvider } from '@your-org/telemetry/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TelemetryProvider config={{ serviceName: 'your-app-name' }}>
          {children}
        </TelemetryProvider>
      </body>
    </html>
  );
}
```

**Step 4 — Log anywhere:**
```ts
import { logInfo, logWarn, logError, logDebug } from '@your-org/telemetry';

logInfo('User signed in', { 'user.plan': 'pro' });
logWarn('Slow query detected', { 'query.ms': 1200 });
logError('Payment failed', { 'payment.gateway': 'stripe', 'error.code': '402' });
```

Done. All logs appear in SigNoz under the service name you set.

---

## What's included automatically

Every log record is enriched with:

| Attribute | Value |
|---|---|
| `service.name` | Your `serviceName` config — identifies the project in SigNoz |
| `browser.name` | Chrome, Firefox, Safari, etc. |
| `browser.version` | Browser version string |
| `os.name` | Windows, macOS, Linux, iOS, Android, etc. |
| `user_agent` | Full UA string |
| `user.id` | From `localStorage.getItem('userId')`, or `'anonymous'` |
| `page.url` | Full URL at time of log |
| `page.path` | Pathname only |

Error tracking is set up automatically (no extra code needed):
- Unhandled JS errors (`window.onerror`)
- Unhandled Promise rejections
- `console.error(...)` calls

---

## Config reference

```ts
interface TelemetryConfig {
  serviceName?: string;   // falls back to NEXT_PUBLIC_OTEL_SERVICE_NAME, then 'unknown-service'
  collectorUrl?: string;  // falls back to NEXT_PUBLIC_OTEL_COLLECTOR_URL, then '/api/telemetry/logs'
}
```

---

## Updating the package

After merging changes to this repo, bump the version in `package.json` and run in each consuming project:
```bash
npm update @your-org/telemetry
# or pin to a specific commit/tag:
npm install git+https://github.com/your-org/telemetry.git#v1.2.0
```
