import { createClient } from "@sanity/client";

export const innsynSanityClient = createClient({
  projectId: "rt6o382n",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-06-21",
  useCdn: process.env.NODE_ENV === "production",
});
