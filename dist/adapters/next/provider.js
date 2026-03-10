'use client';
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { initializeTelemetry, setupErrorTracking } from '../../core/index';
/**
 * Next.js App Router provider.
 * Mount once in your root layout — handles init + error tracking automatically.
 *
 * @example
 * // app/layout.tsx
 * import { TelemetryProvider } from '@your-org/telemetry/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <TelemetryProvider config={{ serviceName: 'my-app' }}>
 *           {children}
 *         </TelemetryProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */
export function TelemetryProvider({ children, config = {} }) {
    // initializeTelemetry is idempotent — safe to call on every render,
    // but only actually initialises once.
    initializeTelemetry(config);
    useEffect(() => {
        setupErrorTracking();
    }, []);
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=provider.js.map