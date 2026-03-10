/**
 * Next.js App Router proxy handler for OTLP log payloads.
 *
 * The browser OTLPLogExporter cannot POST directly to the collector (CORS).
 * This handler receives the payload on the same origin and forwards it
 * server-side — no CORS restrictions apply.
 *
 * Usage — create this file in your project:
 *   app/api/telemetry/route.ts
 *
 * @example
 * export { POST } from '@your-org/telemetry/next';
 */
export declare function POST(request: Request): Promise<Response>;
//# sourceMappingURL=route-handler.d.ts.map