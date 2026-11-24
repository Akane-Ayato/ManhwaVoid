/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** Public API base URL injected by vite.config.ts at build time. */
  readonly API_BASE_URL?: string;
  readonly VITE_SITE_NAME?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
