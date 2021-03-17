import { ReactComponentLike } from "prop-types"

interface IkonProps {
    ikonSvg: ReactComponentLike;
}

export const Ikon = (props: IkonProps) => {
    const ikonStyle = {
        width: '40px',
        height: '40px'
    }
    return (
        <div className="ikon-wrapper">
            {<props.ikonSvg style={ikonStyle} />}
            <style jsx>{`
                .ikon-wrapper {
                    display: flex;
                    width: 80px;
                    height: 80px;
                    border-radius: 100%;
                    background-color: #99C2E8;
                    justify-content: center;
                    align-items: center;
                }

            `}</style>
        </div>
    )
}