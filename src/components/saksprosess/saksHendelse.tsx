import { Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import styles from "./saksprosess.module.css";
import SuccessFilled from '@navikt/ds-icons/svg/SuccessFilled.svg';
import WarningFilled from '@navikt/ds-icons/svg/WarningFilled.svg';

type SaksTilstand = 'utfort' | 'aktiv' | 'inaktiv';
export interface SaksHendelseProps {
    tilstand: SaksTilstand;
    tittel: string;
    label?: string;
    tittelSomLenke: boolean;
    url?: string;
    id?: number;
}

export const SaksHendelse = (props: SaksHendelseProps) => {
    const renderTittel = () => {
        if (props.tittelSomLenke) {
            return <Lenke href={props.url} className={styles.sakshendelseLenke}>{props.tittel}</Lenke>
        }
        return <Undertittel>{props.tittel}</Undertittel>
    }

    const getTilstandClass = () => {
        switch (props.tilstand) {
            case "aktiv":
                return "sakshendelse-aktiv";
            case "utfort":
                return "sakshendelse-utfort";
            default:
                return "sakshendelse-inaktiv";
        }
    }

    const renderIkon = () => {
        switch (props.tilstand) {
            case "aktiv":
                return <WarningFilled className={styles.aktivIkon} />
            case "utfort":
                return <SuccessFilled className={styles.utfortIkon} />
            default:
                return <SuccessFilled className={styles.inaktivIkon} />
        }
    }

    return (
        <>
            <li key={props.id} className={`${styles.sakshendelse} ${styles[getTilstandClass()]}`}>

                    {renderIkon()}
                <div className={styles.hendelseContent}>
                    <div className={styles.sakshendelseTittel}>
                        {renderTittel()}
                    </div>
                    <p className={styles.sakshendelseLabel}>{props.label}</p>
                </div>
            </li>
        </>
    );
}