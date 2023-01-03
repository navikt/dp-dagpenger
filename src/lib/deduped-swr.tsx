import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "../pages/_app";

interface Props {
  children: React.ReactElement;
}

export const DedupedSWR: React.FC = ({ children }: Props) => (
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
