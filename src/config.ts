/**
 * Central place for everything that is deployment- or brand-specific.
 * API_BASE_URL is supplied through Vercel's build environment.
 */
export const SITE = {
  name: import.meta.env.VITE_SITE_NAME || 'Manhwa Void',
  /** Circular emblem used in the header, footer and auth pages. */
  mark: '/logo-mark.png',
  tagline: 'Read your favorite Manga, Manhwa, Manhua and Webtoons online.',
};

/**
 * Production: direct browser-to-VPS API URL, e.g.
 * https://api.manhwavoid.space/api/v1
 * Local development: fall back to the Vite /api proxy.
 */
const RAW_BASE = (import.meta.env.API_BASE_URL || '/api/v1').trim().replace(/\/+$/, '');
export const API_BASE = RAW_BASE;

/** Origin used for API-relative assets such as avatars and other uploads. */
export const API_ORIGIN = /^https?:\/\//i.test(API_BASE) ? new URL(API_BASE).origin : '';

export const MANGA_TYPES = ['Manga', 'Manhwa', 'Manhua', 'Webtoon'] as const;

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'az', label: 'A–Z' },
] as const;

export const PAGE_SIZE = 24;

/** Canonical genre filters. Kept local because the site has a fixed supported list. */
export const GENRES = [
  'Action', 'Adult', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Harem', 'Horror',
  'Mature', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural',
] as const;

/** Backwards-compatible alias for components that still use the fallback name. */
export const FALLBACK_GENRES = GENRES;
