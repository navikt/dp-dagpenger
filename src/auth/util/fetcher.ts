export const fetcher = (url, options = {}) =>
  fetch(url, options).then((r) => r.json());
