# Khoj

A typed library for search and parsing search engine results as JSON

## Installation

Install the package using npm:

```
npm install khoj
```

## Usage

Here's a basic example of how to use Khoj:

```
import { search, SearchEngine, SearchOptions } from 'khoj';

const options: SearchOptions = {
  query: 'TypeScript libraries',
  limit: 10
};

search(options, SearchEngine.Google)
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error('Error:', error);
  });

```

## API

### search(options: SearchOptions, engine?: SearchEngine): Promise<SearchResult[]>

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

Parameters:

- `options`: SearchOptions object (required)

- `engine`: SearchEngine enum (optional, defaults to Google)

### SearchOptions

An object with the following properties:

```
import { SearchOptions, SearchResult, SearchEngine } from "./types";
```

- `query`: string (required) - The search query

- `limit`: number (optional) - Maximum number of results to return

- `userAgent`: string (optional) - Custom user agent string

- `start`: number (optional) - Starting position for results

- `includeSites`: string (optional) - Comma-separated list of sites to include in the search

- `excludeSites`: string (optional) - Comma-separated list of sites to exclude from the search

- `verbose`: boolean (optional) - Logs Results if enabled

### SearchEngine

An enum with the following values:

- `Google` (default)

- `Bing`

### SearchResult

An object representing a single search result. The exact structure may vary depending on the search engine used.

## Development

To set up the project for development:

1. Clone the repository

2. Install dependencies: `npm install`

3. Build the project: `npm run build`

4. Run tests: `npm test`

## License

This project is licensed under the MIT License.
