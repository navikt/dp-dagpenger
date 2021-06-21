import React from "react";
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";
import Lenke from "nav-frontend-lenker";

const serializers = {
  marks: {
    link: (props: any) => (
      <Lenke href={props.mark.href}>{props.children}</Lenke>
    ),
  },
};

export default function BlockContent(props: { blocks: any[] }) {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
