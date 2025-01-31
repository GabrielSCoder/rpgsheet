import Card from "../../components/Card";

import { Input } from "../../components/Inputs";

import { atributos_secundariosT } from "../../assets/types/atributosSecundarios";

import classes from "../../assets/jsons/classes.json"

import races from "../../assets/jsons/races.json"
import Button from "../../components/Button";

import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import AtributosTemplate from "../Atributos";
import ListaArmas from "../ListaArmas";
import ListaArmaduras from "../ListaArmaduras";
import { RituaisTemplate } from "../RituaisTemplate";
import { CaminhosMagia } from "../CaminhosTemplate";
import { AtributosSecundarios } from "../AtributosSecundarios";
import { useEffect, useState } from "react";
import ListaHabilidade2 from "../ListaHabilidades2";
import { racaT } from "../../assets/types/raca";
import { classe } from "../../assets/types/classes";
import ListaPericias from "../ListaPericias";
import ListaAREARE from "../ListaAREARE";
import ranks from "../../assets/jsons/ranks.json"

export default function StyleSheet() {

    const { register, handleSubmit, getValues, watch, setValue, control } = useForm({
        defaultValues: {
            "racaId": null,
            "classeId": null
        }
    })

    const [atributos, setAtributos] = useState({
        FOR: 0,
        CON: 0,
        DEX: 0,
        AGI: 0,
        INT: 0,
        SAB: 0,
        CAR: 0,
        PER: 0,
    });

    const [calcFinal, setCalcFinal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [attrSee, setAttrSeeeee] = useState({ ataque: 0, atual_pts_magia: 0, atual_pts_vida: 0, defesa: 7, iniciativa: 0, pts_magia: 0, pts_vida: 0 })
    const [focusPts, setFocusPts] = useState({ agua : 0, fogo : 0, ar : 0, terra : 0, luz : 0, trevas : 0})
    const [fPoints, setFpoints] = useState(0)

    const [attSec, setAttSec] = useState<atributos_secundariosT>(attrSee)
    const [raceData, setRaceData] = useState<racaT>()
    const [classData, setClassData] = useState<classe>()
    const [periciaData, setPericiaData] = useState<[]>([])
    const [skillData, setSkillData] = useState<[]>([])

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

    const calcVidaMaxima = () => {
        const pts_vida1 = classData ? classData?.pv_inicial + classData?.bonus_constituicao * calcFinal[1] : 0
        const bns = skillData.find((row) => row.id === 144)
        let value = 0

        if (bns) {
            const multiFactor = ranks.find((row) => row.id === bns.graduacaoId)
            if (multiFactor) {
                value = 2 * multiFactor.valor
            }
        }

        const finalVal = pts_vida1 + value

        setAttrSeeeee((prev) => {
            return { ...prev, pts_vida: finalVal }
        })
    }

    const calcIniciativa = () => {

        setAttrSeeeee((prev) => {
            return { ...prev, iniciativa: Math.ceil((calcFinal[3] + calcFinal[7]) / 2) }
        })
    }

    const calcPtsMagia = () => {
        const bns = skillData.find((row) => row.id === 148)

        let value = 0
        let focus = 0 

        if (bns) {

            if (bns.graduacaoId > 0) {
                value = bns.graduacaoId - 3
                focus = value + 1
            }

        }

        setAttrSeeeee((prev) => {
            return { ...prev, pts_magia: value }
        })

        setFpoints(focus)
    }

    const updateOpt = (value: number, nome: any) => {
        setValue(nome, value)
    }

    const getClasse = (opt: string | number): any => {

        if (typeof opt === "number") {
            return classes.find((i) => i.id == opt)
        } else if (typeof opt === "string") {
            return classes.find((i) => i.nome === opt)
        }
        return null;
    }


    useEffect(() => {
        const xxx = getValues("classeId")
        const c = getClasse(parseInt(xxx, 10))
        setClassData(c)
    }, [watch("classeId")])

    useEffect(() => {
        console.log(skillData)
    }, [skillData])

    useEffect(() => {
        console.log("pontos de foco: ", fPoints)
    }, [fPoints])


    return (
        <div className="flex flex-col h-full bg-black max-w-full">

            <Button onClick={() => calcPtsMagia()} text="test" type="submitt" />

            <AtributosSecundarios props={attrSee} />

            <Card className="border rounded-md shadow-md grid grid-cols-4 gap-2 p-2">
                <Input.Text name="nome" placeholder="Nome" className="border rounded-md col-span-2 p-2" />
                <Input.Text name="jogador" placeholder="jogador" className="border rounded-md col-span-2 p-2" />
                <CustomSelect dados={races} id="d" nome="racaId" onChange={updateOpt} valorSelecionado={getValues("racaId")} classeName="border rounded-md col-span-1 p-2" key={0} register={register} />
                <CustomSelect dados={classes} id="dd" nome="classeId" onChange={updateOpt} valorSelecionado={getValues("classeId")} classeName="border rounded-md col-span-1 p-2" key={1} register={register} />
                <Input.SelectOpt register={register} name="sexo" placeholder="Sexo" className="border rounded-md col-span-1 p-2" dados={sexo.dados} />
                <Input.Number name="deslocamento" placeholder="deslocamento" className="border rounded-md col-span-1 p-2" />
                {/* <Input.SelectOpt name="regras" className="border rounded-md col-span-1 p-2" dados={regras.dados} /> */}
                <Input.Number name="idade" placeholder="idade" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="peso" placeholder="peso" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="divindades" placeholder="divindidades" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="plano_origem" placeholder="Plano de Origem" className="border rounded-md col-span-1 p-2" />

            </Card>

            <Card className="bg-red-500 w-full justify-center gap-5">

                <AtributosTemplate control={control} getValues={getValues} setValues={setValue} register={register} watch={watch} atributos={atributos}
                    setAtributos={setAtributos} calcFinal={calcFinal} setCalcFinal={setCalcFinal} />

                <ListaHabilidade2 getValues={getValues} watch={watch} setData={setSkillData} />

                <ListaPericias getValues={getValues} watch={watch} setData={setPericiaData} />

                <ListaAREARE setData={setPericiaData} />

            </Card>

            <Card className="bg-green-500 justify-center items-center gap-10">

                <ListaArmas data={periciaData} atributos={calcFinal} />

                <ListaArmaduras />


            </Card>


            <Card className="bg-amber-500">
                <CaminhosMagia focusPts={focusPts} setFocusPts={setFocusPts} fPoints={fPoints} setFpoints={setFpoints}/>

                <RituaisTemplate />
            </Card>




        </div>
    )
}