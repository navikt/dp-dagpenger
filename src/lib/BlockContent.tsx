import React from "react";
import SanityBlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

const SerializedLink = (props: any) => (
  <Link href={props.mark.href}>{props.children}</Link>
);

const serializers = {
  marks: { link: SerializedLink },
};

export default function BlockContent(props: { blocks: any[] }): JSX.Element {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
