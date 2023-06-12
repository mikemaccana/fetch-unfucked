# fetch-unfucked

## You know how you always have to write a wrapper around fetch to have sensible defaults, for every new project? This is that wrapper.

 - **get()**, **post()**, maybe other verbs if you or I add them.
 - **Returns a plain JS object** with `headers`, `body`, and `status` (as text, not magic numbers).
 - **Automatically decodes bodies based on HTTP content types**, so JSON response bodies are JS objects, HTML and text bodies are strings.
 - **Encodes query strings** - instead of a url string, provide an object of the format `{ url: string; params: Record<string, string>; }` and the query pamarameters will be encoded for your
 - **Sensible defaults** - sets `Accept` header to use JSON if unspecified, assumes `Content-Type` header to use JSON if unspecified.
 - **TypeScript**
 - **ESM**.
 - **Zero dependencies**. No unnecessary `fetch` polyfills. Just use node 18 or newer.

It's 100 lines of code, but who wants to write or maintain something that should have been baked in, and that we already had in a billion libraries before `fetch` decided to come along and have the dumbest defaults since `querySelectorAll` returned `NodeList`s? God why can't we have nice things? 🤦🏻‍♂️ 

## Usage:

```
npm i fetch-unfucked
```

Then just GET:

 - Function `get`
 - Type: `(urlOrURLWithParams: string or UrlWithParams, headers?: Record<string, string>, forceResponseContentType?: string) => Promise<UnfuckedResponse>` |


For example:

```js
import * as http from "fetch-unfucked";

const { body } = await http.get(
  `https://someUrl.com/some/endpoint`
);
const dataICareAbout = body?.info?.resolved || null;
```

or POST:

 - Function `post`
 - Type `(uri: string or UrlWithParams, headers?: Record<string, string>, body?: Record<string, unknown>, forceResponseContentType?: string) => Promise<UnfuckedResponse>` 


For example, with query string encoding: 

```js
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

 - Provide a { url, params } instead of a a string to encode query params
 - Set default values if `Accept` header isn't specified
 - Remove CommonJS

### 1.0

Initial release
## Changes welcomed

Whatever. Send me a PR.
