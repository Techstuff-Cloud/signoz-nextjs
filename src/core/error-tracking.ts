import { logError } from './logger';

/**
 * Registers global error handlers to capture unhandled errors and ship them
 * to SigNoz as structured log records.
 *
 * Called automatically by the framework adapters (TelemetryProvider).
 * If you're not using a provider, call this once manually after initializeTelemetry().
 */
export function setupErrorTracking(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    logError('window.error', {
      'exception.message': event.message,
      'exception.type': event.error?.name ?? 'Error',
      'exception.stacktrace': event.error?.stack ?? '',
      'exception.source': event.filename,
      'exception.lineno': event.lineno,
      'exception.colno': event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason ?? {};
    logError('unhandledrejection', {
      'exception.message': reason.message ?? String(reason),
      'exception.stacktrace': reason.stack ?? '',
      'exception.type': reason.name ?? 'UnhandledRejection',
    });
  });

  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const message = args.map(String).join(' ');
    logError(message, {
      'exception.message': message,
      'exception.type': 'ConsoleError',
      'exception.stacktrace': new Error().stack ?? '',
    });
    originalConsoleError(...args);
  };
}
