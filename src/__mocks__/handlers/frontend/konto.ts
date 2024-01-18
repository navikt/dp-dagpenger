import { HttpResponse, delay } from "msw";

export default async function kontoResolver() {
  await delay();

  return HttpResponse.json({
    kontonummer: "12345678901",
  });
}
