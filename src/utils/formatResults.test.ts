import { formatResults } from "./formatResults";
import { SearchResult } from "../types";

describe("formatResults", () => {
  it("should format search results correctly", () => {
    const mockResults: SearchResult[] = [
      {
        title: "Test Title 1",
        link: "http://test1.com",
        snippet: "Test Snippet 1",
        displayedLink: "test1.com",
      },
      {
        title: "Test Title 2",
        link: "http://test2.com",
        snippet: "Test Snippet 2",
        displayedLink: "test2.com",
      },
    ];

    const formattedResults = formatResults(mockResults);

    expect(formattedResults).toBe(
      "Title: Test Title 1\nLink: http://test1.com\nSnippet: Test Snippet 1\n\n" +
        "Title: Test Title 2\nLink: http://test2.com\nSnippet: Test Snippet 2\n\n"
    );
  });

  it("should return an empty string for empty results", () => {
    const formattedResults = formatResults([]);

    expect(formattedResults).toBe("");
  });
});
