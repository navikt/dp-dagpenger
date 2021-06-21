import React from "react";
import SanityBlockContent from "@sanity/block-content-to-react";
import Lenke from "nav-frontend-lenker";

const SerializedLink = (props: any) => (
  <Lenke href={props.mark.href}>{props.children}</Lenke>
);

const serializers = {
  marks: { link: SerializedLink },
};

export default function BlockContent(props: { blocks: any[] }) {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
