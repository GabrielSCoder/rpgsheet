import { register } from "module";
import Card from "../../components/Card";
import CustomSelect from "../../components/CustomSelect";
import { Input } from "../../components/Inputs";

type Props = {
    register : any
    races : any
    classes : any
    getValues : any
    updateOpt : any
}

const sexo = {
    dados: [{ "id": 1, "nome": "homem" }, { "id": 2, "nome": "mulher" }]
}

export default function Informacoes(props : Props) {

    const {classes, getValues, races, register, updateOpt } = props

    return (
        <Card className="flex-col border rounded-md shadow-md md:grid md:grid-cols-4 gap-2 p-2">
            <Input.Text name="nome" placeholder="Nome" className="border rounded-md col-span-2 p-2" register={register}/>
            <Input.Text name="jogador" placeholder="jogador" className="border rounded-md col-span-2 p-2" register={register}/>
            <CustomSelect dados={races} id="d" nome="racaId" onChange={updateOpt} valorSelecionado={getValues("racaId")} classeName="border rounded-md col-span-1 p-2" key={0} register={register} />
            <CustomSelect dados={classes} id="dd" nome="classeId" onChange={updateOpt} valorSelecionado={getValues("classeId")} classeName="border rounded-md col-span-1 p-2" key={1} register={register} />
            <Input.SelectOpt register={register} name="sexo" placeholder="Sexo" className="border rounded-md col-span-1 p-2" dados={sexo.dados} />
            <Input.Number name="deslocamento" placeholder="Deslocamento" className="border rounded-md col-span-1 p-2" register={register} />
            <Input.Number name="idade" placeholder="Idade" className="border rounded-md col-span-1 p-2" register={register}/>
            <Input.Text name="peso" placeholder="Peso" className="border rounded-md col-span-1 p-2" register={register}/>
            <Input.Text name="divindades" placeholder="Divindidades" className="border rounded-md col-span-1 p-2" register={register} />
            <Input.Text name="plano_origem" placeholder="Plano de Origem" className="border rounded-md col-span-1 p-2" register={register}/>

        </Card>
    )
}