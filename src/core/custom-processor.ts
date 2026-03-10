import { SdkLogRecord, LogRecordProcessor } from '@opentelemetry/sdk-logs';
import { UAParser } from 'ua-parser-js';

function getBrowserInfo(): Record<string, string> {
  const parser = new UAParser();
  const result = parser.getResult();
  return {
    'browser.name': result.browser.name ?? 'unknown',
    'browser.version': result.browser.version ?? 'unknown',
    'os.name': result.os.name ?? 'unknown',
    'user_agent': result.ua,
  };
}

function getUserInfo(): Record<string, string> {
  try {
    const userId = localStorage.getItem('userId') ?? 'anonymous';
    return { 'user.id': userId };
  } catch {
    return { 'user.id': 'anonymous' };
  }
}

/**
 * Enriches every log record with browser, OS, user, and page attributes.
 * Runs synchronously on every emit — no async overhead.
 */
export class CustomAttributesProcessor implements LogRecordProcessor {
  onEmit(logRecord: SdkLogRecord): void {
    const attributes = {
      ...getBrowserInfo(),
      ...getUserInfo(),
      'page.url': window.location.href,
      'page.path': window.location.pathname,
    };
    Object.entries(attributes).forEach(([key, value]) => {
      logRecord.setAttribute(key, value);
    });
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}