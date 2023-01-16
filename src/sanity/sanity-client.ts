import sanityClient from "@sanity/client";

export const innsynSanityClient = sanityClient({
  projectId: "rt6o382n", //datasettet for tekster til dagpengeteamet
  dataset: process.env.NODE_ENV === "production" ? "production" : "development",
  apiVersion: "2021-06-21",
  useCdn: process.env.NODE_ENV === "production",
});
