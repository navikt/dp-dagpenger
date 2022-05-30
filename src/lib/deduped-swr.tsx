import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "../pages/_app";

export const DedupedSWR: React.FC = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 0,
      shouldRetryOnError: false,
      provider: () => new Map(),
    }}
  >
    {children}
  </SWRConfig>
);
