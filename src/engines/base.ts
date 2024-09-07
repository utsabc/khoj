import axios from "axios";
import { SearchOptions, SearchResult } from "../types";
import { DEFAULT_USER_AGENT, DEFAULT_LIMIT, DEFAULT_START } from "../config";

export abstract class BaseSearchEngine {
  protected abstract searchUrl: string;
  protected abstract parseResults(html: string, limit: number): SearchResult[];

  protected async fetchResults(options: SearchOptions): Promise<string> {
    const {
      query,
      limit = DEFAULT_LIMIT,
      userAgent = DEFAULT_USER_AGENT,
      start = DEFAULT_START,
      includeSites,
      excludeSites,
    } = options;

    const params = new URLSearchParams({
      q: query,
      num: limit.toString(),
      first: start.toString(),
    });

    if (includeSites) {
      params.append("site", includeSites);
    }

    if (excludeSites) {
      params.append("-site", excludeSites);
    }

    try {
      const response = await axios.get(this.searchUrl, {
        params,
        headers: {
          "User-Agent": userAgent,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error making search request: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  public async search(options: SearchOptions): Promise<SearchResult[]> {
    const html = await this.fetchResults(options);
    return this.parseResults(html, options.limit);
  }
}
