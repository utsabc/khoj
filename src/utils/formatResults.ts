import { SearchResult } from "../types";

export function formatResults(results: SearchResult[]): string {
  return results
    .map((result) => {
      return `Title: ${result.title}\nLink: ${result.link}\nSnippet: ${result.snippet}\n\n`;
    })
    .join("");
}
