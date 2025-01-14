import { useState } from "react";
import { selectInputOptions } from "../../../components/Inputs";
import classNames from "../../../utils/classNames";

export default function GraduacaoSelect(props: selectInputOptions) {

    const [date, setDate] = useState<any[]>([]);

    const { name, dados, register, className, label, labelStyle } = props

    
    return (
        <select {...register && register(name)} className={classNames('rounded-md p-2 w-full border-slate-300', className)}>
            <option className="">Selecione</option>
            {dados && dados.map((item: any) => (
                <option key={item.id} className="text-black">{item.id} - {item.nome}</option>
            ))}
        </select>
    )


}