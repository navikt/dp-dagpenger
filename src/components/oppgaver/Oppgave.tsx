import { LenkepanelBase } from "nav-frontend-lenkepanel";
import React from "react"
import { Ikon } from "../Ikon";
import { Element } from "nav-frontend-typografi";

interface OppgaveProps {
    oppgaveTittel: string;
    href?: string;
}

export const Oppgave = (props: OppgaveProps) => {
    return (
        <LenkepanelBase href={props.href} border className="oppgave">
            <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                <Ikon size="liten" navn="task" bakgrunnFarge="#FFA733" />
                <Element tag="h3" style={{ marginLeft: '18px' }} className="lenkepanel__heading">{props.oppgaveTittel}</Element>
            </div>
            <style>{`
                .oppgave {
                    background-color: #FFF8EF;
                    border: 1px solid #D57E0A;
                }
                `}</style>
        </LenkepanelBase>
    );
}