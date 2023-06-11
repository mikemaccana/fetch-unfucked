const log = console.log;

export const CONTENT_TYPES = {
  JSON: "application/json",
  TEXT: "text/plain",
  HTML: "text/html",
};

interface UnfuckedResponse {
  status: string;
  headers: Record<string, unknown>;
  // Yes really 'any' - unknown cannot have arbitrary sub keys.
  body: any;
}

interface UrlWithParams {
  url: string;
  params: Record<string, string>;
}

const urlAndQueryParamsToString = (urlWithParams: UrlWithParams) => {
  const queryParamsString = new URLSearchParams(urlWithParams.params);
  return `${urlWithParams.url}?${queryParamsString}`;
};

export const get = async (
  urlOrURLWithParams: string | UrlWithParams,
  headers: Record<string, string> | null = null,
  forceResponseContentType: string | null = null
) => {
  return fetchUnfucked(
    urlOrURLWithParams,
    "GET",
    headers,
    null,
    forceResponseContentType
  );
};

export const post = async (
  uri: string | UrlWithParams,
  headers: Record<string, string> | null = null,
  body: Record<string, unknown>,
  forceResponseContentType: string | null = null
) => {
  return fetchUnfucked(uri, "POST", headers, body, forceResponseContentType);
};

export const fetchUnfucked = async (
  url: string | UrlWithParams,
  method = "GET",
  headers: Record<string, string> | null = {},
  body: Record<string, unknown> | null,
  forceResponseContentType: string | null = null
) => {
  if (typeof url !== "string") {
    url = urlAndQueryParamsToString(url);
  }
  const options: RequestInit = {
    method,
    body: body ? JSON.stringify(body) : null,
  };

  if (!headers) {
    headers = {};
  }

  if (!headers.Accept) {
    headers.Accept = CONTENT_TYPES.JSON;
  }

  if (headers && Object.keys(headers).length) {
    options.headers = headers;
  }

  const rawResponse = await fetch(url, options);

  const cleanResponse: UnfuckedResponse = {
    status: rawResponse.statusText,
    headers: Object.fromEntries(rawResponse.headers.entries()),
    body: null,
  };

  let contentType: string = CONTENT_TYPES.JSON;
  if (forceResponseContentType) {
    contentType = forceResponseContentType;
  } else {
    let contentTypeHeader = rawResponse.headers.get("Content-Type");
    if (contentTypeHeader) {
      // Just in case the Content-Type header is malformed
      const parts = contentTypeHeader.split(";");
      if (parts.length > 0) {
        contentType = parts[0];
      }
    } else {
      log(`No Content Type header. Weird. Using default.`);
    }
  }

  if (
    contentType === CONTENT_TYPES.TEXT ||
    contentType === CONTENT_TYPES.HTML
  ) {
    const htmlOrText = await rawResponse.text();
    cleanResponse.body = htmlOrText;
    return cleanResponse;
  }
  if (contentType === CONTENT_TYPES.JSON) {
    cleanResponse.body = await rawResponse.json();
    return cleanResponse;
  }
  throw new Error(`Don't know how to decode this contentType: ${contentType}`);
};
