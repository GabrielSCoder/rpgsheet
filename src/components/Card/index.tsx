import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type cardProps = {
    className ?: string;
    children : ReactNode;
    click? : Function;
}


export default function Card({className, children, click} : cardProps) {

    const clickC = () => {
        click ? click() : null 
    }

    return (
        <div className={classNames("flex ", className)} onClick={clickC}>
            {children}
        </div>
    )
}