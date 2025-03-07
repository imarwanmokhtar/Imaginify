import { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from 'web-vitals'

declare global {
  interface Window {
    gtag: (command: string, eventName: string, params: any) => void
  }
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

interface NetworkInformation extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

function getConnectionSpeed(): string {
  const nav = navigator as NavigatorWithConnection;
  if (!nav.connection) return '';
  
  const conn = nav.connection;
  if (!conn.effectiveType) return '';

  return conn.effectiveType; // 4g, 3g, 2g, slow-2g
}

export function sendToAnalytics(metric: CLSMetric | FCPMetric | FIDMetric | LCPMetric | TTFBMetric) {
  const analyticsId = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID

  if (!analyticsId) {
    return
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob)
  } else {
    fetch(vitalsUrl, {
      body: JSON.stringify(body),
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    })
  }

  // Also send to Google Analytics
  window.gtag?.('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  })
} 