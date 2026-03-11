import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const LOGGER_NAME = 'org-telemetry-logger';

export type Attributes = Record<string, string | number | boolean | undefined>;

function getLogger() {
  return logs.getLogger(LOGGER_NAME);
}

export function logInfo(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    attributes: attrs,
  });
  console.info(`[INFO] ${body}`, Object.keys(attrs).length ? attrs : '');
}

export function logWarn(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.WARN,
    severityText: 'WARN',
    attributes: attrs,
  });
  console.warn(`[WARN] ${body}`, Object.keys(attrs).length ? attrs : '');
}

export function logError(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    attributes: attrs,
  });
  console.error(`[ERROR] ${body}`, Object.keys(attrs).length ? attrs : '');
}

export function logDebug(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.DEBUG,
    severityText: 'DEBUG',
    attributes: attrs,
  });
  console.debug(`[DEBUG] ${body}`, Object.keys(attrs).length ? attrs : '');
}
