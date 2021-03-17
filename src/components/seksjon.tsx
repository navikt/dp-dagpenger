import Veilederpanel from "nav-frontend-veilederpanel"
import React, { ReactNode } from "react"
interface SeksjonProps {
    iconSvg: ReactNode;
    tittel: string;
}

export const Seksjon = (props: SeksjonProps) => {
    return (
        <div className="seksjon-wrapper">
            <Veilederpanel
                svg={props.iconSvg}
                type={"plakat"}
                kompakt>
                <h2>{props.tittel}</h2>
            </Veilederpanel>
            <style jsx>{`
            .seksjon-wrapper {
                display: block;
                margin-top: 50px;
            }
            h2 {
                margin-top: 0;
            }
            `}</style>
        </div>

    );
}