# fetch-unfucked

A zero dependencies, sensible defaults HTTP client based on `fetch()`.

> You know how you always have to write a wrapper around fetch to have sensible defaults, for every new project? This is that wrapper.

 - **Zero dependencies**. No unnecessary `fetch` polyfills. Just use node 18 or newer.
 - **TypeScript** and **ESM** obviously.
 - **Sensible defaults** - sets `Accept` to JSON by default, sets `Content-Type` header to use JSON by default.
 - **get()**, **post()**, maybe other verbs if you or I add them.
 - **Returns a plain JS object** with `headers`, `body`, and `status` (as text, not magic numbers).
 - **Automatically decodes bodies based on HTTP content types**, so JSON response bodies are JS objects, HTML and text bodies are strings.
 - **Encodes query strings** - instead of a url string, provide an object of the format `{ url: string; params: Record<string, string>; }` and the query parameters will be encoded for you.

It's 100 lines of code, but who wants to write or maintain something that should have been baked in to JavaScript, and that we already had in a billion libraries before `fetch` decided to come along and have the dumbest defaults since `querySelectorAll` returned `NodeList`s? God why can't we have nice things? 🤦🏻‍♂️ 

## Usage:

```
npm i fetch-unfucked
```

### Importing 

```typescript
import * as http from "fetch-unfucked";
```

###  **get()**

 - **urlOrURLWithParams** - required. Either a `string`, or a `{ string: someURL, params: { encode: me } }` if you want some URL parameters to be encoded. 
 - **headers** optional. An object of headers. The `Accept` header will be set to `application/json` by default.
 - **forceResponseContentType** optional. Ignores the content type used by the remote server when decoding the response. This only exists because [nftstorage.link](https://nftstorage.link) uses `text/plain` for JSON.

Returns a **Promise** of a **Response** object, with **status**, **headers**, and **body**

#### Example: basic get()

```typescript
import * as http from "fetch-unfucked";

const { body } = await http.get(
  `https://someUrl.com/some/endpoint`
);
const dataICareAbout = body?.info?.resolved || null;
```
## post() 

 - **urlOrURLWithParams** - required. Either a `string`, or a `{ string: someURL, params: { encode: me } }` if you want some URL parameters to be encoded. 
 - **headers** optional. An object of headers. The `Accept` header will be set to `application/json` by default.
 - **body** optional. The JS object you're posting.
 - **forceResponseContentType** optional. Ignores the content type used by the remote server when decoding the response. This only exists because [nftstorage.link](https://nftstorage.link) uses `text/plain` for JSON.

Returns a **Promise** of a **Response** object, with **status**, **headers**, and **body**

#### Example: post() ing to GitHub

```typescript
const response = await http.post(
  { 
    url: 'https://github.com/login/oauth/access_token',
    params: {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code,
    }
  }
);
```

You can add a POST body, set headers. Whatever. Look at the TypeScript types. It's exactly what you expect.
## Changelog

### 1.2 

 - Provide a `{ url, params }` object instead of a string to encode query params
 - Set default values if `Accept` header isn't specified
 - Remove CommonJS

### 1.0

Initial release
## Changes welcomed

Whatever. Send me a PR.
