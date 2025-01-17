import { register } from "module"

function CustomSelect({ id, nome, classeName, onChange, valorSelecionado, dados, register }
    : { id: string, nome: string, classeName?: string, onChange: Function, valorSelecionado: null | number, dados: any , register : any}) {


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        var v: string | null
        v = event.target.value
        if (v === "")
            v = null
        onChange(v, nome)
        // console.log(v)
    }

    return (
        <select id={id} name={nome} className={classeName} onChange={handleChange} >
            <option value={""} selected={!valorSelecionado}>Selecione uma categoria</option>
            {dados.map((item: any) => (
                <option key={item.id} value={item.id} selected={item.id === valorSelecionado}>{item.id} - {item.nome}</option>
            ))}
            <input type="hidden" {...register(nome)} />
        </select>
    )
}

export default CustomSelect