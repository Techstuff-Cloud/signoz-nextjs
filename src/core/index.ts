// ── Logging API ──────────────────────────────────────────────────────────────
export { logInfo, logWarn, logError, logDebug } from './logger';
export type { Attributes } from './logger';

// ── Initialisation ───────────────────────────────────────────────────────────
export { initializeTelemetry } from './instrumentation';
export type { TelemetryConfig } from './instrumentation';

// ── Error tracking (optional manual usage) ───────────────────────────────────
export { setupErrorTracking } from './error-tracking';
