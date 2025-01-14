function CustomSelect({id, nome, classeName, onChange, valorSelecionado, dados} : {id : string, nome : string, classeName ?: string, onChange : Function, valorSelecionado : null | number, dados : any}) {


    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        var v : string | null
        v = event.target.value
        if (v === "")
            v = null
        onChange(v)
        // console.log(v)
    }

    return (
        <select id={id} name={nome} className={classeName} onChange={handleChange} >
            <option value={""} selected={!valorSelecionado}>Selecione uma categoria</option>
            {dados.map((item : any) => (
                <option key={item.id} value={item.id} selected={item.id === valorSelecionado}>{item.id} - {item.nome}</option>
            ))}
        </select>
    )
}

export default CustomSelect