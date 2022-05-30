export default function api(endpoint: string): string {
  if (process.env.NODE_ENV == "test") {
    const url = new URL(location.href);
    url.pathname = endpoint;
    return url.toString();
  }
  return `${process.env.NEXT_PUBLIC_BASE_PATH}/api${
    endpoint.startsWith("/") ? "" : "/"
  }${endpoint}`;
}
