import React from "react";
import { SaksHendelse, SaksHendelseProps } from "./saksHendelse";
import styles from "./saksprosess.module.css";

export const SaksProsess = () => {
    const hendelser: SaksHendelseProps[] = [
        { tilstand: "utfort", tittel: "NAV har mottatt din søknad om dagpenger", label: "12.07.2020 - 15:39", tittelSomLenke: false },
        { tilstand: "aktiv", tittel: "Du må laste opp vedlegg så fort som mulig for at vi skal kunne behandle dagpengesøknaden din. Frist: 20.07.2020", label: "Varsel sendt 13.07.2020 - 12:00", tittelSomLenke: true, url: "#" },
        { tilstand: "inaktiv", tittel: "Vi vil begynne å behandle saken din når du har lastet opp all nødvendig dokumentasjon. Dersom vi mangler noe vil du få beskjed.", tittelSomLenke: false },
        { tilstand: "inaktiv", tittel: "Når saken din er ferdig behandlet vil du få et varsel på SMS. Du vil få et svar innen 20. juli 2020.", tittelSomLenke: false },
        { tilstand: "inaktiv", tittel: "Hvis søknaden din blir innvilget vil du kunne få utbetalt 8325 kr før skatt hver uke i 104 uker fra 15.07.2020 (NB! Dette er basert på foreløpige beregninger, beløp og dato vil kunne endres)", tittelSomLenke: false },
    ]
    return (
        <ol className={styles.saksprosess} style={{ listStyle: 'none !important', paddingLeft: '0 !important' }}>
            {hendelser.map((hendelse, i) => (
                <SaksHendelse id={i} tilstand={hendelse.tilstand} tittel={hendelse.tittel} label={hendelse.label} tittelSomLenke={hendelse.tittelSomLenke} url={hendelse.url} />
            ))}
        </ol>
    )
}
