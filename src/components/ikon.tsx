import { Task, Place, Information } from "@navikt/ds-icons";

type IkonStorrelse = "liten" | "stor";

interface IkonProps {
    navn: "task" | "place" | "info";
    bakgrunnFarge?: string;
    size?: IkonStorrelse;
}
const skalertIkon = ((IkonComponent, fontSize) => <IkonComponent style={{ fontSize }} />)


const getWrapperSize = (size: IkonStorrelse) => {
    const stor = { width: "100px", height: "100px" };
    const liten = { width: "55px", height: "55px" };
    return size === "liten" ? liten : stor;
}

const getIkonSize = (size: IkonStorrelse) => {
    return size === "liten" ? "24px" : "45px";
}

const getIkon = (name) => {
    switch (name) {
        case "task": return Task;
        case "place": return Place;
        case "info": return Information;
        default: throw new Error("No SVG for " + name);
    }
}

export const Ikon = (props: IkonProps) => {
    const SVG = getIkon(props.navn);

    const wrapperStyle = {
        display: 'flex',
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        ...getWrapperSize(props.size),
        backgroundColor: props.bakgrunnFarge || '#99C2E8',
    }
    return (
        <div className="ikon-wrapper" style={wrapperStyle}>
            {skalertIkon(SVG, getIkonSize(props.size))}
        </div>
    )
}
