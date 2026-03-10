export interface TelemetryConfig {
    /**
     * Identifies this project in SigNoz (e.g. "crm-frontend", "billing-app").
     * Falls back to NEXT_PUBLIC_OTEL_SERVICE_NAME env var, then 'unknown-service'.
     */
    serviceName?: string;
    /**
     * URL that receives OTLP log payloads.
     *
     * - Next.js projects: use '/api/telemetry' (same-origin proxy route)
     * - Other frameworks: point to your own proxy endpoint, or directly to the
     *   collector if CORS is configured (e.g. 'http://collector:4318/v1/logs')
     *
     * Falls back to NEXT_PUBLIC_OTEL_COLLECTOR_URL env var, then '/api/telemetry'.
     */
    collectorUrl?: string;
}
/**
 * Initialises the OTel LoggerProvider and registers it globally.
 * Safe to call multiple times — only initialises once.
 * Must only run in the browser (no-ops on the server).
 */
export declare function initializeTelemetry(config?: TelemetryConfig): void;
//# sourceMappingURL=instrumentation.d.ts.map