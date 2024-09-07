export interface SearchOptions {
  query: string;
  limit?: number;
  userAgent?: string;
  start?: number;
  includeSites?: string;
  excludeSites?: string;
  verbose?: boolean;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayedLink: string;
}

export enum SearchEngine {
  Google = "google",
  Bing = "bing",
}
