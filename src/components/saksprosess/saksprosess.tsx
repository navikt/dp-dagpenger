import React from "react";
import { SaksHendelse, SaksHendelseProps } from "./saksHendelse";
import styles from "./saksprosess.module.css";

export const SaksProsess = () => {
    const hendelser: SaksHendelseProps[] = [
        { tilstand: "utfort", tittel: "NAV har mottatt din søknad om dagpenger", label: "12.07.2020 - 15:39", tittelSomLenke: false },
        { tilstand: "aktiv", tittel: "Du må laste opp vedlegg så fort som mulig for at vi skal kunne behandle dagpengesøknaden din. Frist: 20.07.2020", label: "Varsel sendt 13.07.2020 - 12:00", tittelSomLenke: true, url: "#" },
        { tilstand: "inaktiv", tittel: "Vi vil begynne å behandle saken din når du har lastet opp all nødvendig dokumentasjon. Dersom vi mangler noe vil du få beskjed.", tittelSomLenke: false },
    ]
    return (
        <ol className={styles.saksprosess} style={{ listStyle: 'none !important', paddingLeft: '0 !important' }}>
            {hendelser.map((hendelse) => (
                <SaksHendelse tilstand={hendelse.tilstand} tittel={hendelse.tittel} label={hendelse.label} tittelSomLenke={hendelse.tittelSomLenke} url={hendelse.url} />
            ))}
        </ol>
    )
}
