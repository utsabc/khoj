import { BingSearchEngine } from "./bingEngine";
import { SEARCH_URLS } from "../config";

describe("BingSearchEngine", () => {
  let bingEngine: BingSearchEngine;

  beforeEach(() => {
    bingEngine = new BingSearchEngine();
  });

  it("should have the correct search URL", () => {
    expect(bingEngine["searchUrl"]).toBe(SEARCH_URLS.bing);
  });

  it("should parse results correctly", () => {
    const mockHtml = `
      <div class="b_algo">
        <h2><a href="http://test.com">Test Title</a></h2>
        <div class="b_caption"><p>Test Snippet</p></div>
        <div class="b_attribution">test.com</div>
      </div>
    `;

    const results = bingEngine["parseResults"](mockHtml, 1);

    expect(results).toEqual([
      {
        title: "Test Title",
        link: "http://test.com",
        snippet: "Test Snippet",
        displayedLink: "test.com",
      },
    ]);
  });

  it("should limit the number of results", () => {
    const mockHtml = `
      <div class="b_algo">
        <h2><a href="http://test1.com">Test Title 1</a></h2>
        <div class="b_caption"><p>Test Snippet 1</p></div>
        <div class="b_attribution">test1.com</div>
      </div>
      <div class="b_algo">
        <h2><a href="http://test2.com">Test Title 2</a></h2>
        <div class="b_caption"><p>Test Snippet 2</p></div>
        <div class="b_attribution">test2.com</div>
      </div>
    `;

    const results = bingEngine["parseResults"](mockHtml, 1);

    expect(results.length).toBe(1);
    expect(results[0].title).toBe("Test Title 1");
  });

  it("should handle empty results", () => {
    const mockHtml = "<div></div>";

    const results = bingEngine["parseResults"](mockHtml, 1);

    expect(results).toEqual([]);
  });
});
