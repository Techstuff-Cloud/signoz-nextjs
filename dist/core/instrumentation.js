import { LoggerProvider, BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { logs } from '@opentelemetry/api-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { CustomAttributesProcessor } from './custom-processor';
let initialized = false;
/**
 * Initialises the OTel LoggerProvider and registers it globally.
 * Safe to call multiple times — only initialises once.
 * Must only run in the browser (no-ops on the server).
 */
export function initializeTelemetry(config = {}) {
    if (initialized || typeof window === 'undefined')
        return;
    initialized = true;
    const serviceName = config.serviceName ??
        (typeof process !== 'undefined'
            ? process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME
            : undefined) ??
        'unknown-service';
    const collectorUrl = config.collectorUrl ??
        (typeof process !== 'undefined'
            ? process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL
            : undefined) ??
        '/api/telemetry/logs';
    const loggerProvider = new LoggerProvider({
        resource: resourceFromAttributes({ 'service.name': serviceName }),
        processors: [
            new CustomAttributesProcessor(),
            new BatchLogRecordProcessor(new OTLPLogExporter({ url: collectorUrl })),
        ],
    });
    logs.setGlobalLoggerProvider(loggerProvider);
}
//# sourceMappingURL=instrumentation.js.map