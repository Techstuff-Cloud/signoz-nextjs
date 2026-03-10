import { SdkLogRecord, LogRecordProcessor } from '@opentelemetry/sdk-logs';
/**
 * Enriches every log record with browser, OS, user, and page attributes.
 * Runs synchronously on every emit — no async overhead.
 */
export declare class CustomAttributesProcessor implements LogRecordProcessor {
    onEmit(logRecord: SdkLogRecord): void;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
}
//# sourceMappingURL=custom-processor.d.ts.map