import Task from "@navikt/ds-icons/svg/Task.svg";
import Place from "@navikt/ds-icons/svg/Place.svg";
import Information from "@navikt/ds-icons/svg/Information.svg";

type IkonStorrelse = "liten" | "stor";

interface IkonProps {
    navn: "task" | "place" | "info";
    bakgrunnFarge?: string;
    size?: IkonStorrelse;
}

const sirkelStr = { stor: "100px", liten: "55px" };
const ikonStr = { stor: "45px", liten: "24px" };

const getStr = (size: IkonStorrelse, sizeSet) => {
    const str = { width: sizeSet.stor, height: sizeSet.stor };
    if (size === "liten") {
        str.width = sizeSet.liten;
        str.height = sizeSet.liten;
    }
    return str;
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
        ...getStr(props.size, sirkelStr),
        backgroundColor: props.bakgrunnFarge || '#99C2E8',
    }
    return (
        <div className="ikon-wrapper" style={wrapperStyle}>
            <SVG focusable="false" role="img" style={getStr(props.size, ikonStr)} />
        </div>
    )
}
