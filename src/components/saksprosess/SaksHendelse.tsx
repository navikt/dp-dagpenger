import { Element, Normaltekst } from "nav-frontend-typografi";
import styles from "./saksprosess.module.css";
import { SuccessFilled, WarningFilled, ClockFilled  } from '@navikt/ds-icons';

type SaksTilstand = 'utfort' | 'inaktiv' | 'paagaaende' | 'hendelse';
export interface SaksHendelseProps {
    tilstand: SaksTilstand;
    tittel: string;
    label?: string;
    id?: number;
    children?: any | any[];
}

export const SaksHendelse = (props: SaksHendelseProps) => {

    const getTilstandClass = () => {
        switch (props.tilstand) {
            case "utfort":
                return "sakshendelse-utfort";
            case "paagaaende":
                return "sakshendelse-paagaaende";
            case "hendelse":
                return "sakshendelse-aktiv";
            default:
                return "sakshendelse-inaktiv";
        }
    }

    const renderIkon = () => {
        switch (props.tilstand) {
            case "hendelse":
                return <WarningFilled className={styles.hendelseIkon} />
            case "utfort":
                return <SuccessFilled className={styles.utfortIkon} />
            case "paagaaende":
                return <ClockFilled className={styles.paagaaendeIkon} />
            default:
                return <SuccessFilled className={styles.inaktivIkon} />
        }
    }

    return (
        <>
            <li key={props.id} className={`${styles.sakshendelse} ${styles[getTilstandClass()]}`}>

                {renderIkon()}
                <div className={styles.hendelseContent}>
                    <Element className={styles.hendelsesTittel}>{props.tittel}</Element>
                    {props.children}
                    <Normaltekst className={styles.sakshendelseLabel}>{props.label}</Normaltekst>
                </div>
            </li>
        </>
    );
}