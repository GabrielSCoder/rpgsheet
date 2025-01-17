import Card from "../../components/Card";

import { Input } from "../../components/Inputs";

import { atributos_secundariosT } from "../../assets/types/atributosSecundarios";

import classes from "../../assets/jsons/classes.json"

import races from "../../assets/jsons/races.json"
import Button from "../../components/Button";
import pericias from "../../assets/jsons/pericias.json"
import ranks from "../../assets/jsons/ranks.json"

import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import AtributosTemplate from "../Atributos";
import ListaHabilidade from "../ListaHabilidades";
import TableWithList from "../../components/TableWithList";
import ListaArmas from "../ListaArmas";
import ListaArmaduras from "../ListaArmaduras";
import { RituaisTemplate } from "../RituaisTemplate";
import { CaminhosMagia } from "../CaminhosTemplate";
import { AtributosSecundarios } from "../AtributosSecundarios";
import { useEffect, useState } from "react";
import ListaHabilidade2 from "../ListaHabilidades2";
import { racaT } from "../../assets/types/raca";
import { classe } from "../../assets/types/classes";
import { periciaT } from "../../assets/types/pericia";
import ListaPericias from "../ListaPericias";

export default function StyleSheet() {

    const { register, handleSubmit, getValues, watch, setValue, control } = useForm({
        defaultValues: {
            "racaId": null,
            "classeId" : null
        }
    })

    const attrSee : atributos_secundariosT = {ataque : 0, atual_pts_magia : 0, atual_pts_vida : 0, defesa : 0, iniciativa : 0, pts_magia : 0, pts_vida : 0}

    const [attSec, setAttSec] = useState<atributos_secundariosT>(attrSee)
    const [raceData, setRaceData] = useState<racaT>()
    const [classData, setClassData] = useState<classe>()
    const [periciaData, setPericiaData] = useState<periciaT[]>([])

    const sexo = {
        dados: [{ "id": 1, "nome": "homem" }, { "id": 2, "nome": "mulher" }]
    }

    const regras = {
        dados: [{ "id": 0, "valor": 10, "label": "normal" }, { "id": 1, "valor": 12, "label": "fantasia" }, { "id": 2, "label": "livre", "valor": -1 }]
    }



    const downloadJSON = () => {

        const formattedData = races.map((nome, index) => ({
            nome: nome,
            id: index + 1,
            // valor : -3 + index // IDs começam em 1
        }));

        const jsonString = JSON.stringify(formattedData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "races.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const calSecAtt = () => {
        const l : atributos_secundariosT = {
            pts_vida : classData ? classData?.pv_inicial + 2 * classData?.bonus_constituicao : 0,
            ataque : 0
        }
    }

    const sub1 = () => {
        handleSubmit(data => {
            console.log(data)
        })()
    }

    const updateOpt = (value: number, nome : any) => {
        setValue(nome, value)
    }

    useEffect(() => {
        console.log(watch())
    }, [watch()])


    return (
        <div className="flex flex-col h-full bg-black">

            <Button onClick={sub1} text="test" type="submitt" />

            <AtributosSecundarios props={attrSee}/>

            <Card className="border rounded-md shadow-md grid grid-cols-4 gap-2 p-2">
                <Input.Text name="nome" placeholder="Nome" className="border rounded-md col-span-2 p-2" />
                <Input.Text name="jogador" placeholder="jogador" className="border rounded-md col-span-2 p-2" />
                <CustomSelect dados={races} id="d" nome="racaId" onChange={updateOpt} valorSelecionado={getValues("racaId")} classeName="border rounded-md col-span-1 p-2" key={0} register={register}/>
                <CustomSelect dados={classes} id="d" nome="classeId" onChange={updateOpt} valorSelecionado={getValues("classeId")} classeName="border rounded-md col-span-1 p-2" key={1} register={register}/>
                <Input.SelectOpt register={register} name="sexo" placeholder="Sexo" className="border rounded-md col-span-1 p-2" dados={sexo.dados} />
                <Input.Number name="deslocamento" placeholder="deslocamento" className="border rounded-md col-span-1 p-2" />
                {/* <Input.SelectOpt name="regras" className="border rounded-md col-span-1 p-2" dados={regras.dados} /> */}
                <Input.Number name="idade" placeholder="idade" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="peso" placeholder="peso" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="divindades" placeholder="divindidades" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="plano_origem" placeholder="Plano de Origem" className="border rounded-md col-span-1 p-2" />

                {/* <input {...register("racaId")} hidden />
                <input {...register("classeId")} hidden /> */}
            </Card>

            <Card className="bg-red-500 w-full justify-center gap-5">

                <AtributosTemplate control={control} getValues={getValues} setValues={setValue} register={register} watch={watch} />

                <ListaHabilidade2 getValues={getValues} watch={watch} />

            </Card>

            <Card className="bg-green-500 justify-center items-center gap-10">

                <ListaPericias getValues={getValues} watch={watch}/>

                <ListaArmas />

            </Card>

          

          {/* <ListaArmaduras /> */}

          {/* <CaminhosMagia /> */}

           {/* <RituaisTemplate /> */}

        </div>
    )
}