import sanityClient from "@sanity/client";

export const innsynSanityClient = sanityClient({
  projectId: "rt6o382n",

  dataset: "production",
  apiVersion: "2021-06-21",
  useCdn: process.env.NODE_ENV === "production",
});
