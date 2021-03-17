import { LenkepanelBase } from "nav-frontend-lenkepanel";
import React from "react"
import { Ikon } from "./ikon";
import Task from "@navikt/ds-icons/svg/Task.svg";
import { Undertittel } from "nav-frontend-typografi";

interface OppgaveProps {
    oppgaveTittel: string;
    href?: string;
}

export const Oppgave = (props: OppgaveProps) => {
    return (
        <div className="oppgave-wrapper">

            <LenkepanelBase href="#" border>
                <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                    <Ikon size="liten" ikonSvg={Task} bakgrunnFarge="#FFA733" />
                    <Undertittel tag="h3" style={{ marginLeft: '18px' }} className="lenkepanel__heading">{props.oppgaveTittel}</Undertittel>
                </div>
            </LenkepanelBase>
        </div>
    );
}