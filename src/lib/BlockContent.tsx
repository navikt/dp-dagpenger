import React from "react";
import SanityBlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SerializedLink = (props: any) => (
  <Link href={props.mark.href}>{props.children}</Link>
);

const serializers = {
  marks: { link: SerializedLink },
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function BlockContent(props: { blocks: any[] }): JSX.Element {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}
