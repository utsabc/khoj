import * as cheerio from "cheerio";
import { BaseSearchEngine } from "./base";
import { SearchResult } from "../types";
import { SEARCH_URLS } from "../config";

export class GoogleSearchEngine extends BaseSearchEngine {
  protected searchUrl = SEARCH_URLS.google;

  protected parseResults(html: string, limit: number): SearchResult[] {
    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    let titles = [];
    let links = [];
    let snippets = [];
    let displayedLinks = [];

    $(".g .yuRUbf h3").each((i, el) => {
      titles[i] = $(el).text();
    });
    $(".yuRUbf a").each((i, el) => {
      links[i] = $(el).attr("href");
    });
    $(".g .VwiC3b ").each((i, el) => {
      snippets[i] = $(el).text();
    });
    $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
      displayedLinks[i] = $(el).text();
    });

    for (let i = 0; i < limit; i++) {
      results[i] = {
        title: titles[i],
        link: links[i],
        snippet: snippets[i],
        displayedLink: displayedLinks[i],
      };
    }

    return results;
  }
}
