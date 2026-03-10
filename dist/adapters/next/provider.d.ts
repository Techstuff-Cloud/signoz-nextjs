import type { TelemetryConfig } from '../../core/index';
export interface TelemetryProviderProps {
    children: React.ReactNode;
    config?: TelemetryConfig;
}
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
export declare function TelemetryProvider({ children, config }: TelemetryProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=provider.d.ts.map