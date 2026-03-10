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
}

export function logWarn(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.WARN,
    severityText: 'WARN',
    attributes: attrs,
  });
}

export function logError(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    attributes: attrs,
  });
}

export function logDebug(body: string, attrs: Attributes = {}): void {
  getLogger().emit({
    body,
    severityNumber: SeverityNumber.DEBUG,
    severityText: 'DEBUG',
    attributes: attrs,
  });
}
