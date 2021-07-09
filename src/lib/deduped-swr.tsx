import React from "react";
import { SWRConfig } from "swr";

export const DedupedSWR: React.FC = ({ children }) => (
  <SWRConfig
    value={{
      dedupingInterval: 0,
      shouldRetryOnError: false,
    }}
  >
    {children}
  </SWRConfig>
);
