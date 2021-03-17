import { ReactComponentLike } from "prop-types"

type IkonStorrelse = "liten" | "stor";

interface IkonProps {
    ikonSvg: ReactComponentLike;
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

export const Ikon = (props: IkonProps) => {

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
            {<props.ikonSvg focusable="false" role="img" style={getStr(props.size, ikonStr)} />}
        </div>
    )
}
