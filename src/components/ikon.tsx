import { ReactComponentLike } from "prop-types"

interface IkonProps {
    ikonSvg: ReactComponentLike;
}

export const Ikon = (props: IkonProps) => {
    const ikonStyle = {
        width: '45px',
        height: '45px'
    }
    return (
        <div className="ikon-wrapper">
            {<props.ikonSvg style={ikonStyle} />}
            <style jsx>{`
                .ikon-wrapper {
                    display: flex;
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                    background-color: #99C2E8;
                    justify-content: center;
                    align-items: center;
                }

            `}</style>
        </div>
    )
}