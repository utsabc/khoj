import * as cheerio from "cheerio";
import { BaseSearchEngine } from "./base";
import { SearchResult } from "../types";
import { SEARCH_URLS } from "../config";

export class BingSearchEngine extends BaseSearchEngine {
  protected searchUrl = SEARCH_URLS.bing;

  protected parseResults(html: string, limit: number): SearchResult[] {
    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    $(".b_algo").each((index, element) => {
      if (index >= limit) return;
      const $element = $(element);
      const title = $element.find("h2").text().trim();
      const link = $element.find("h2 a").attr("href");
      const snippet = $element.find(".b_caption p").text().trim();
      const displayedLink = $element.find(".b_attribution").text().trim();

      results.push({
        title,
        link,
        snippet,
        displayedLink,
      });
    });

    return results;
  }
}
