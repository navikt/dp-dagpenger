import { Button, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "./MeldFraOmEndring.module.css";
import { useSanity } from "../../context/sanity-context";
import { Section } from "../section/Section";
import { SectionContent } from "../section/SectionContent";

export const MeldFraOmEndring = () => {
  const { getAppText, getRichText, getLink } = useSanity();

  const meldFraOmEndringerLink = getLink(
    "meld-fra-om-endring.melding-om-endring"
  );

  const sendInnDokumentLink = getLink("meld-fra-om-endring.send-inn-dokument");

  return (
    <Section smallSpacing>
      <SectionContent>
        <Heading level="2" size="large" spacing>
          {getAppText("meld-fra-om-endring.seksjonstittel")}
        </Heading>
        <div className={styles.container}>
          <Heading level="3" size="small" spacing>
            {getAppText("meld-fra-om-endring.seksjonstittel")}
          </Heading>
          <PortableText
            value={getRichText("meld-fra-om-endring.informasjon")}
          />
          <nav className={styles.navigationContainer}>
            <Link href={meldFraOmEndringerLink.linkUrl} passHref>
              <Button variant="secondary" as="a">
                {meldFraOmEndringerLink.linkText}
              </Button>
            </Link>
            <Link href={sendInnDokumentLink.linkUrl} passHref>
              <Button variant="secondary" as="a">
                {sendInnDokumentLink.linkText}
              </Button>
            </Link>
          </nav>
        </div>
      </SectionContent>
    </Section>
  );
};
