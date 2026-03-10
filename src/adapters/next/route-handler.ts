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

// Note: NextRequest is used via the global Request type so this file
// has no direct Next.js import — keeping the package dependency-free.
export async function POST(request: Request): Promise<Response> {
  const collectorBase =
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318';

  const body = await request.arrayBuffer();
  const contentType = request.headers.get('content-type') ?? 'application/json';

  try {
    const response = await fetch(`${collectorBase}/v1/logs`, {
      method: 'POST',
      headers: { 'content-type': contentType },
      body,
    });

    return new Response(null, { status: response.status });
  } catch {
    return new Response(null, { status: 502 });
  }
}
