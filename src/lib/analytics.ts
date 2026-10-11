import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export interface ReferralDetails {
  platform: string;
  isSocialMedia: boolean;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  timestamp: string;
}

/**
 * Detects the incoming traffic source (social media, search engine, or direct)
 * and logs custom Vercel Analytics events for recruiter & audience insight.
 */
export function detectReferralSource(): ReferralDetails {
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const utmSource = urlParams.get('utm_source') || urlParams.get('source') || urlParams.get('ref') || '';
  const utmMedium = urlParams.get('utm_medium') || '';
  const utmCampaign = urlParams.get('utm_campaign') || '';

  const refLower = referrer.toLowerCase();
  const utmLower = utmSource.toLowerCase();

  let platform = 'Direct / Portfolio Link';
  let isSocialMedia = false;

  // 1. Check for specific Social Media platforms
  if (refLower.includes('linkedin.com') || refLower.includes('lnkd.in') || utmLower.includes('linkedin')) {
    platform = 'LinkedIn';
    isSocialMedia = true;
  } else if (refLower.includes('github.com') || utmLower.includes('github')) {
    platform = 'GitHub';
    isSocialMedia = true;
  } else if (refLower.includes('twitter.com') || refLower.includes('x.com') || refLower.includes('t.co') || utmLower.includes('twitter') || utmLower.includes('x')) {
    platform = 'Twitter / X';
    isSocialMedia = true;
  } else if (refLower.includes('instagram.com') || utmLower.includes('instagram') || utmLower.includes('ig')) {
    platform = 'Instagram';
    isSocialMedia = true;
  } else if (refLower.includes('youtube.com') || refLower.includes('youtu.be') || utmLower.includes('youtube')) {
    platform = 'YouTube';
    isSocialMedia = true;
  } else if (refLower.includes('reddit.com') || utmLower.includes('reddit')) {
    platform = 'Reddit';
    isSocialMedia = true;
  } else if (refLower.includes('facebook.com') || refLower.includes('fb.com') || utmLower.includes('facebook')) {
    platform = 'Facebook';
    isSocialMedia = true;
  } else if (refLower.includes('whatsapp') || utmLower.includes('whatsapp')) {
    platform = 'WhatsApp';
    isSocialMedia = true;
  } else if (refLower.includes('t.me') || refLower.includes('telegram') || utmLower.includes('telegram')) {
    platform = 'Telegram';
    isSocialMedia = true;
  } else if (refLower.includes('discord') || utmLower.includes('discord')) {
    platform = 'Discord';
    isSocialMedia = true;
  } else if (refLower.includes('google.') || utmLower.includes('google')) {
    platform = 'Google Search';
    isSocialMedia = false;
  } else if (refLower.includes('bing.') || refLower.includes('duckduckgo.') || refLower.includes('yahoo.')) {
    platform = 'Other Search Engine';
    isSocialMedia = false;
  } else if (referrer) {
    try {
      const hostname = new URL(referrer).hostname;
      platform = hostname.replace(/^www\./, '');
    } catch {
      platform = referrer;
    }
  }

  return {
    platform,
    isSocialMedia,
    referrer: referrer || 'none',
    utmSource: utmSource || 'none',
    utmMedium: utmMedium || 'none',
    utmCampaign: utmCampaign || 'none',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Hook to automatically track social media & referral traffic once per session
 */
export function useReferralTracking() {
  useEffect(() => {
    try {
      // Guard against duplicate event dispatches within the same browser session
      const alreadyTracked = sessionStorage.getItem('aswin_referral_tracked');
      if (alreadyTracked) return;

      const details = detectReferralSource();

      // 1. Track general referral event in Vercel Analytics
      track('referral_source', {
        platform: details.platform,
        is_social_media: String(details.isSocialMedia),
        referrer: details.referrer,
        utm_source: details.utmSource,
        utm_campaign: details.utmCampaign,
      });

      // 2. If visitor came from social media, track dedicated social media event
      if (details.isSocialMedia) {
        track('social_media_visit', {
          social_platform: details.platform,
          landing_path: window.location.pathname + window.location.hash,
        });
      }

      sessionStorage.setItem('aswin_referral_tracked', details.platform);
    } catch (err) {
      // Silently fail if tracking is blocked by ad-blocker
      console.debug('Analytics tracking info:', err);
    }
  }, []);
}
