import axios from "axios";
import { BaseSearchEngine } from "./base";
import { SearchOptions } from "../types";

jest.mock("axios");

class TestSearchEngine extends BaseSearchEngine {
  protected searchUrl = "https://test.com/search";
  protected parseResults(html: string, limit: number) {
    return [
      {
        title: "Test",
        link: "http://test.com",
        snippet: "Test snippet",
        displayedLink: "test.com",
      },
    ];
  }
}

describe("BaseSearchEngine", () => {
  let searchEngine: TestSearchEngine;

  beforeEach(() => {
    searchEngine = new TestSearchEngine();
  });

  it("should fetch results correctly", async () => {
    const mockResponse = { data: "<html></html>" };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const options: SearchOptions = { query: "test query" };
    const result = await searchEngine["fetchResults"](options);

    expect(axios.get).toHaveBeenCalledWith(
      "https://test.com/search",
      expect.any(Object)
    );
    expect(result).toBe("<html></html>");
  });

  it("should handle errors when fetching results", async () => {
    const mockError = new Error("Network error");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const options: SearchOptions = { query: "test query" };
    await expect(searchEngine["fetchResults"](options)).rejects.toThrow(
      "Network error"
    );
  });

  it("should search and parse results", async () => {
    const mockHtml = "<html></html>";
    searchEngine["fetchResults"] = jest.fn().mockResolvedValue(mockHtml);
    searchEngine["parseResults"] = jest.fn().mockReturnValue([
      {
        title: "Test",
        link: "http://test.com",
        snippet: "Test snippet",
        displayedLink: "test.com",
      },
    ]);

    const options: SearchOptions = { query: "test query", limit: 10 };
    const results = await searchEngine.search(options);

    expect(searchEngine["fetchResults"]).toHaveBeenCalledWith(options);
    expect(searchEngine["parseResults"]).toHaveBeenCalledWith(mockHtml, 10);
    expect(results).toEqual([
      {
        title: "Test",
        link: "http://test.com",
        snippet: "Test snippet",
        displayedLink: "test.com",
      },
    ]);
  });
});
