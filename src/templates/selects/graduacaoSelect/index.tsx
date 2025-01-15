import { useState } from "react";
import { selectInputOptions } from "../../../components/Inputs";
import classNames from "../../../utils/classNames";

export default function GraduacaoSelect(props: selectInputOptions) {

    const [date, setDate] = useState<any[]>([]);

    const { name, dados, className, label, labelStyle, change } = props

    
    return (
        <select className={classNames('rounded-md p-2 w-full border-slate-300', className)} onChange={() => change}>
            <option className="">Selecione</option>
            {dados && dados.map((item: any) => (
                <option key={item.id} className="text-black">{item.id} - {item.nome} ({item.valor})</option>
            ))}
        </select>
    )


}