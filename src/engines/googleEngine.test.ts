import { GoogleSearchEngine } from "./googleEngine";
import { SEARCH_URLS } from "../config";

describe("GoogleSearchEngine", () => {
  let googleEngine: GoogleSearchEngine;

  beforeEach(() => {
    googleEngine = new GoogleSearchEngine();
  });

  it("should have the correct search URL", () => {
    expect(googleEngine["searchUrl"]).toBe(SEARCH_URLS.google);
  });

  it("should parse results correctly", () => {
    const mockHtml = `
      <div class="g">
        <div class="yuRUbf">
          <h3>Test Title</h3>
          <a href="http://test.com"></a>
          <div class="NJjxre"><div class="tjvcx">test.com</div></div>
        </div>
        <div class="VwiC3b">Test Snippet</div>
      </div>
    `;

    const results = googleEngine["parseResults"](mockHtml, 1);

    expect(results).toEqual([
      {
        title: "Test Title",
        link: "http://test.com",
        snippet: "Test Snippet",
        displayedLink: "test.com",
      },
    ]);
  });
});
