import { ReactNode } from "react"

type TableProps = {
    children: ReactNode;
    className?: string;
}

export default function Table(props: TableProps) {

    const { children, className } = props;

    return (
        <>
            <table className={className}>
                {children}
            </table>
        </>
    )
}

const THead = (props: TableProps) => {
    const { children, className } = props;

    return (
        <th className={className}>
            {children}
        </th>
    )
}

const TRow = (props: TableProps) => {

    const { children, className } = props;

    return (
        <tr className={className}>
            {children}
        </tr>
    )
}

const ColumnBody = (props: TableProps) => {

    const { children, className } = props;

    return (
        <>
            <td className={className}>
                {children}
            </td>
        </>
    )
}

const Header = (props: TableProps) => {

    const { children, className } = props;

    return (
        <thead className={className}>
            {children}
        </thead>
    )
}

const Body = (props: TableProps) => {

    const { children, className } = props;

    return (
        <tbody className={className}>
            {children}
        </tbody>
    )
}

const Foot = (props: TableProps) => {

    const { children , className} = props;

    return (
        <tfoot className={className}>
            {children}
        </tfoot>
    )
}

Table.Header = Header;
Table.Head = THead;
Table.Body = Body;
Table.Foot = Foot;
Table.Row = TRow;
Table.Column = ColumnBody;
