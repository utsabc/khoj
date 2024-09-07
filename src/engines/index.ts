import { GoogleSearchEngine } from "./googleEngine";
import { BingSearchEngine } from "./bingEngine";
import { SearchEngine } from "../types";

export function getSearchEngine(engine: SearchEngine) {
  switch (engine) {
    case SearchEngine.Google:
      return new GoogleSearchEngine();
    case SearchEngine.Bing:
      return new BingSearchEngine();
    default:
      throw new Error(`Unsupported search engine: ${engine}`);
  }
}

export { GoogleSearchEngine, BingSearchEngine };
