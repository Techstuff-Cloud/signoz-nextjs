import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const LOGGER_NAME = 'org-telemetry-logger';

export type Attributes = Record<string, string | number | boolean | undefined>;
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function getLogger() {
  return logs.getLogger(LOGGER_NAME);
}

/**
 * Returns the set of enabled log levels from NEXT_PUBLIC_OTEL_LOG_LEVELS env var.
 * e.g. NEXT_PUBLIC_OTEL_LOG_LEVELS=error,warn → only error and warn go to SigNoz.
 * If the env var is not set, all levels are enabled.
 */
function getEnabledLevels(): Set<LogLevel> | null {
  const raw =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_OTEL_LOG_LEVELS
      : undefined;

  if (!raw) return null; // null means all levels enabled

  const levels = raw
    .split(',')
    .map((l) => l.trim().toLowerCase())
    .filter((l): l is LogLevel => ['debug', 'info', 'warn', 'error'].includes(l));

  return new Set(levels);
}

function shouldExport(level: LogLevel): boolean {
  const enabled = getEnabledLevels();
  if (!enabled) return true; // no filter set — export everything
  return enabled.has(level);
}

export function logInfo(body: string, attrs: Attributes = {}): void {
  console.info(`[INFO] ${body}`, Object.keys(attrs).length ? attrs : '');
  if (!shouldExport('info')) return;
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    attributes: attrs,
  });
}

export function logWarn(body: string, attrs: Attributes = {}): void {
  console.warn(`[WARN] ${body}`, Object.keys(attrs).length ? attrs : '');
  if (!shouldExport('warn')) return;
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.WARN,
    severityText: 'WARN',
    attributes: attrs,
  });
}

export function logError(body: string, attrs: Attributes = {}): void {
  console.error(`[ERROR] ${body}`, Object.keys(attrs).length ? attrs : '');
  if (!shouldExport('error')) return;
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    attributes: attrs,
  });
}

export function logDebug(body: string, attrs: Attributes = {}): void {
  console.debug(`[DEBUG] ${body}`, Object.keys(attrs).length ? attrs : '');
  if (!shouldExport('debug')) return;
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.DEBUG,
    severityText: 'DEBUG',
    attributes: attrs,
  });
}