import { logs, SeverityNumber } from '@opentelemetry/api-logs';
const LOGGER_NAME = 'org-telemetry-logger';
function getLogger() {
    return logs.getLogger(LOGGER_NAME);
}
export function logInfo(body, attrs = {}) {
    getLogger().emit({
        body,
        severityNumber: SeverityNumber.INFO,
        severityText: 'INFO',
        attributes: attrs,
    });
}
export function logWarn(body, attrs = {}) {
    getLogger().emit({
        body,
        severityNumber: SeverityNumber.WARN,
        severityText: 'WARN',
        attributes: attrs,
    });
}
export function logError(body, attrs = {}) {
    getLogger().emit({
        body,
        severityNumber: SeverityNumber.ERROR,
        severityText: 'ERROR',
        attributes: attrs,
    });
}
export function logDebug(body, attrs = {}) {
    getLogger().emit({
        body,
        severityNumber: SeverityNumber.DEBUG,
        severityText: 'DEBUG',
        attributes: attrs,
    });
}
//# sourceMappingURL=logger.js.map