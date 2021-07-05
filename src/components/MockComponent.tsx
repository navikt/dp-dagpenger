import { mutate } from "swr";
import React from "react";

export type Mock = {
  navn: string;
  data: any;
};

interface WithLoadingProps {
  url: string;
  mocks: Mock[];
}

export const withMocks = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
  const WithMocks = ({ url, mocks, ...props }: WithLoadingProps) =>
    process.env.NODE_ENV === "development" ? (
      <div className={"test"}>
        <div className={"mocks"}>
          {mocks.map((mock) => (
            <button
              key={mock.navn}
              onClick={async () => {
                await mutate(url, mock.data, false);
              }}
            >
              {mock.navn}
            </button>
          ))}
        </div>
        <Component {...(props as P)} />

        <style jsx>{`
          .mocks {
            display: none;
            position: absolute;
            margin-top: -25px;
            height: 25px;
          }
          .mocks button {
            border: 2px solid #e5989b;
            border-radius: 7px;
            background: #ffcdb2;
            color: #6d6875;
            font-weight: bold;
            margin-right: 0.5em;
            padding: 0 1em;
          }
          .test:hover {
            outline: 25px solid pink;
          }
          .test:hover .mocks {
            display: block;
          }
        `}</style>
      </div>
    ) : (
      <Component {...(props as P)} />
    );
  return WithMocks;
};
