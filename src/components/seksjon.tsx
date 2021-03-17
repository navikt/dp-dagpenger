import Veilederpanel from "nav-frontend-veilederpanel"
import React, { ReactNode } from "react"
interface SeksjonProps {
    iconSvg: ReactNode;
}

export const Seksjon = (props: SeksjonProps) => {
    return (
        <div className="seksjon-wrapper">
            <Veilederpanel
                svg={props.iconSvg}
                type={"plakat"}
                kompakt>
                Seksjonskomp deg
            </Veilederpanel>
            <style jsx>{`
                .nav-veileder--flytende {
                    background-color: #99C2E8;
                }
            `}</style>
        </div>

    );
}