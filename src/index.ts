import { getSearchEngine } from "./engines";
import { formatResults } from "./utils/formatResults";
import { SearchOptions, SearchResult, SearchEngine } from "./types";

export async function search(
  options: SearchOptions,
  engine: SearchEngine = SearchEngine.Google
): Promise<SearchResult[]> {
  const searchEngine = getSearchEngine(engine);
  const results = await searchEngine.search(options);

  if (options.verbose) {
    console.log(formatResults(results));
  }

  return results;
}

export { SearchOptions, SearchResult, SearchEngine };
