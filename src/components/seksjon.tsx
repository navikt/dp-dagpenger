import Veilederpanel from "nav-frontend-veilederpanel"
import React, { ReactNode } from "react"
import { Undertekst } from 'nav-frontend-typografi';
interface SeksjonProps {
    iconSvg: ReactNode;
    tittel: string;
    undertittel?: string;
    children?: ReactNode
}

export const Seksjon = (props: SeksjonProps) => {
    return (
        <div className="seksjon-wrapper">
            <Veilederpanel
                svg={props.iconSvg}
                type={"plakat"}
                kompakt>
                <div className="tittel-container">
                    <h2>{props.tittel}</h2>
                    {props.undertittel && <Undertekst>{props.undertittel}</Undertekst>}
                </div>
                {props.children}
            </Veilederpanel>
            <style jsx>{`
            .seksjon-wrapper {
                display: block;
                margin-top: 50px;
                margin-bottom: 105px;
            }
            h2 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            .tittel-container {
                margin-bottom: 1em;
            }
            `}</style>
        </div>

    );
}