/**
 * Google Analytics 4 (GA4) & UTM Telemetry Integration
 *
 * Automatically:
 * - Injects Google Tag Manager (gtag.js) script dynamically if Measurement ID is set
 * - Tracks pageviews with UTM parameters (?utm_source, ?utm_medium, ?utm_campaign)
 * - Captures outbound clicks (LinkedIn, GitHub, Resume, Email)
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Parses query params to capture incoming UTM parameters
 */
export function getUtmParameters(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utmParams: Record<string, string> = {};

  utmKeys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) utmParams[key] = val;
  });

  return utmParams;
}

/**
 * Initializes Google Analytics 4 (GA4)
 */
export function initGoogleAnalytics(customMeasurementId?: string) {
  if (typeof window === "undefined") return;

  const measurementId =
    customMeasurementId ||
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GA_MEASUREMENT_ID ||
    "G-PYBX8HKN2B";

  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    return;
  }

  // Prevent multiple script injections
  if (document.getElementById("ga4-script")) return;

  // 1. Inject gtag.js script
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // 2. Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());

  // 3. Configure GA4 with UTM campaign data & clean anonymized telemetry
  const utmParams = getUtmParameters();
  window.gtag("config", measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    anonymize_ip: true,
    ...utmParams,
  });

  console.log(`%c✦ GA4 Initialized [${measurementId}]`, "color: #5FA8FF; font-weight: bold;");
}

/**
 * Track custom interactive events to GA4 (e.g. resume download, github click, project inspect)
 */
export function trackEvent(eventName: string, eventParams?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, eventParams);
}
