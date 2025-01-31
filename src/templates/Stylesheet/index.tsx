import Card from "../../components/Card";
import classes from "../../assets/jsons/classes.json"
import races from "../../assets/jsons/races.json"
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import AtributosTemplate from "../Atributos";
import ListaArmas from "../ListaArmas";
import ListaArmaduras from "../ListaArmaduras";
import { RituaisTemplate } from "../RituaisTemplate";
import { CaminhosMagia } from "../CaminhosTemplate";
import { AtributosSecundarios } from "../AtributosSecundarios";
import { useEffect, useState } from "react";
import ListaHabilidade2 from "../ListaHabilidades2";
import { classe } from "../../assets/types/classes";
import ListaPericias from "../ListaPericias";
import ListaAREARE from "../ListaAREARE";
import ranks from "../../assets/jsons/ranks.json"
import Informacoes from "../Informacoes";

export default function StyleSheet() {

    const { register, getValues, watch, setValue, control } = useForm({
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
    const [focusPts, setFocusPts] = useState({ agua: 0, fogo: 0, ar: 0, terra: 0, luz: 0, trevas: 0 })
    const [raceMod, setRaceMod] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [fPoints, setFpoints] = useState(0)

    const [classData, setClassData] = useState<classe>()
    const [periciaData, setPericiaData] = useState<[]>([])
    const [skillData, setSkillData] = useState<[]>([])
    const [periciaArmaData, setPericiaArmaData] = useState([])
    const [InvArmasData, setInvArmasData] = useState([])
    const [invArmadurasData, setInvArmadurasData] = useState([])
    const [wholeData, setWholeData] = useState([])


    const regras = {
        dados: [{ "id": 0, "valor": 10, "label": "normal" }, { "id": 1, "valor": 12, "label": "fantasia" }, { "id": 2, "label": "livre", "valor": -1 }]
    }


    const downloadJSON = () => {

        const jsonString = JSON.stringify(wholeData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${getValues("nome")}.json`;
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

    const saveAttr = () => {

        const charData = getValues()

        setWholeData((prev) => {
            return { ...prev, charData, attrSee, classData, periciaData, skillData, periciaArmaData, InvArmasData, invArmadurasData, focusPts }
        })

    }

    useEffect(() => {
        calcPtsMagia()
    }, [skillData])

    useEffect(() => {
        console.log("pericia arma data: ", periciaArmaData)
    }, [periciaArmaData])

    useEffect(() => {
        console.log("Whole data: ", wholeData)
    }, [wholeData])

    useEffect(() => {
        const xxx = getValues("classeId")
        const c = getClasse(parseInt(xxx, 10))
        setClassData(c)
        calcVidaMaxima()
    }, [watch("classeId")])

    useEffect(() => {
        calcVidaMaxima()
    }, [atributos["CON"]])

    useEffect(() => {
        calcIniciativa()
    }, [atributos["PER"], atributos["DEX"]])


    return (
        <div className="flex flex-col h-full bg-black w-full overflow-x-hidden">

            {/* <Button onClick={() => saveAttr()} text="test" type="submitt" /> */}

            <Card className="w-full items-center justify-center hidden xl:flex bg-red-800 p-2 gap-5">
                <Button type="submit" text={"Salvar"} className="p-4 px-8" onClick={() => {saveAttr() }} />
                <Button type="submit" text={"Baixar"} className="p-4 px-8" onClick={() => {downloadJSON() }} />
            </Card>

            <AtributosSecundarios props={attrSee} />

            <Informacoes classes={classes} getValues={getValues} races={races} register={register} updateOpt={updateOpt} />

            <Card className="bg-red-500 flex-col md:justify-center gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:p-2 xl:grid-cols-4">

                <AtributosTemplate control={control} getValues={getValues} setValues={setValue} register={register} watch={watch} atributos={atributos}
                    setAtributos={setAtributos} calcFinal={calcFinal} setCalcFinal={setCalcFinal} raceMod={raceMod} setRaceMod={setRaceMod}
                />

                <ListaHabilidade2 getValues={getValues} watch={watch} setData={setSkillData} />

                <ListaPericias getValues={getValues} watch={watch} setData={setPericiaData} />

                <ListaAREARE periciaArmaData={periciaArmaData} setPericiaArmaData={setPericiaArmaData} />

            </Card>

            <Card className="bg-green-500 gap-2 lg:gap-10 md:flex-row flex-col md:p-2">

                <ListaArmas data={periciaArmaData} atributos={calcFinal} setInvArmasData={setInvArmasData} />

                <ListaArmaduras setInvArmadurasData={setInvArmadurasData} />

            </Card>


            <Card className="bg-amber-500 md:flex-row flex-col">

                <CaminhosMagia focusPts={focusPts} setFocusPts={setFocusPts} fPoints={fPoints} setFpoints={setFpoints} />

                <RituaisTemplate />

            </Card>

            <Card className="w-full items-center justify-center xl:hidden">
                <Button type="submit" text={"Salvar"} className="p-4" onClick={() => { }} />
            </Card>


        </div>
    )
}