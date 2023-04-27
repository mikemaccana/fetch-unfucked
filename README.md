# fetch-unfucked

## You know how you always have to write a wrapper around fetch to have sensible defaults, for every new project? This is that wrapper.

 - **get()**, **post()**, maybe other verbs if you or I add them.
 - **Uses HTTP content types**, so JSON responses are decoded as JS objects, HTML and text are returned as text.
 - **Returns a plain JS object** with `headers`, `body`, and `status` (as text, not magic numbers).
 - **TypeScript**
 - **ESM**, plus CommonJS is included for **unattractive people**.
 - **0 dependencies**.

It's 60 lines of code, but who wants to write or maintain something that should have been baked in, and that we already had in a billion libraries before `fetch` decided to come along and have the dumbest defaults since `querySelectorAll` returned `NodeList`s? God why can't we have nice things? 🤦🏻‍♂️ 

## Usage:

```
import * as http from "./http-client";

const { body } = await http.get(
  `https://someUrl.com/some/endpoint`
);
const dataICareAbout = body?.info?.resolved || null;
```

## Changes welcomed

We should probably auto encode query strings too. Whatever. Send me a PR.
