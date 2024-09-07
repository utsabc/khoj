import { search, SearchEngine, SearchOptions } from "./index";
import { getSearchEngine } from "./engines";
import { formatResults } from "./utils/formatResults";

jest.mock("./engines");
jest.mock("./utils/formatResults");

describe("search function", () => {
  const mockSearchEngine = {
    search: jest.fn(),
  };

  beforeEach(() => {
    (getSearchEngine as jest.Mock).mockReturnValue(mockSearchEngine);
    (formatResults as jest.Mock).mockReturnValue("Formatted results");
  });

  it("should call the correct search engine and return results", async () => {
    const options: SearchOptions = { query: "test query" };
    const mockResults = [
      {
        title: "Test",
        link: "http://test.com",
        snippet: "Test snippet",
        displayedLink: "test.com",
      },
    ];
    mockSearchEngine.search.mockResolvedValue(mockResults);

    const results = await search(options);

    expect(getSearchEngine).toHaveBeenCalledWith(SearchEngine.Google);
    expect(mockSearchEngine.search).toHaveBeenCalledWith(options);
    expect(results).toEqual(mockResults);
  });

  it("should log formatted results when verbose option is true", async () => {
    const options: SearchOptions = { query: "test query", verbose: true };
    const mockResults = [
      {
        title: "Test",
        link: "http://test.com",
        snippet: "Test snippet",
        displayedLink: "test.com",
      },
    ];
    mockSearchEngine.search.mockResolvedValue(mockResults);

    console.log = jest.fn();

    await search(options);

    expect(formatResults).toHaveBeenCalledWith(mockResults);
    expect(console.log).toHaveBeenCalledWith("Formatted results");
  });
});
