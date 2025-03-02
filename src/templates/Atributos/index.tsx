import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";
import race from "../../assets/jsons/races.json"


export default function AtributosTemplate({ control, register, watch, getValues, setValues, atributos, setAtributos, calcFinal, setCalcFinal, raceMod, setRaceMod }) {

    const [attrPts, setAttrPts] = useState(10);


    const getColumns = () => {

        const atr = ["Força (FOR)", "Constituição (CON)", " Destreza (DEX)", "Agilidade (AGI)", "Inteligência (INT)", "Sabedoria (SAB)", "Carisma (CAR)", "Percepção (PER)"]

        return (
            <>
                {Object.keys(atributos).map((key, index) => (
                    <tr key={index}>

                        <Table.Column className="bg-purple-500" >{atr[index]}</Table.Column>
                        <td>
                            <input
                                type="number"
                                value={atributos[key as keyof typeof atributos]}
                                onChange={(e) =>
                                    handleInputChange(key, parseInt(e.target.value, 10) || 0)
                                }
                                className="w-[50px] bg-transparent text-center"
                            />
                        </td>
                        <Table.Column >{raceMod[index]}</Table.Column>
                        <Table.Column >{0}</Table.Column>
                        <Table.Column >{calcFinal[index]}</Table.Column>
                    </tr>
                ))}
            </>
        )


    };



    const getFinalCalc = () => {
        let temp: number[] = []

        Object.keys(atributos).map((key, index) => {
            temp.push(atributos[key as keyof typeof atributos] + raceMod[index])
        })

        setCalcFinal(temp)
    }

    const handleInputChange = (atributo: string, newValue: number) => {
        const currentAtributoValue = atributos[atributo as keyof typeof atributos]
        const diff = newValue - currentAtributoValue

        if (diff > attrPts || newValue < 0) {
            return;
        }

        setAttrPts(attrPts - diff)
        setAtributos({
            ...atributos,
            [atributo]: newValue,
        });
    };



    useEffect(() => {

        if (getValues("racaId") != null) {
            setRaceMod(race[getValues("racaId") - 1].modificadores)
            if (race[getValues("racaId") - 1].bonus_atributo) {
                setAttrPts(attrPts + race[getValues("racaId") - 1].bonus_atributo)
            } else {
                attrPts >= 3 && attrPts < 10 ? setAttrPts(attrPts - 3) : resetarPontos()
            }

        } else setRaceMod([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }, [watch("racaId")])

    useEffect(() => {
        getFinalCalc()
    }, [atributos, raceMod])

    const resetarPontos = () => {
        setAttrPts(10)

        const novosAtributos = Object.keys(atributos).reduce((acc, key) => {
            acc[key as keyof typeof atributos] = 0
            return acc
        }, {} as typeof atributos)

        setAtributos(novosAtributos)
    };

    return (
        <Card className="flex-col gap-1 w-full lg:w-full">

            <TitleTag.Sub className="text-center">Atributos</TitleTag.Sub>

            <label className="text-center p-2">
                Pontos restantes 
                <input type="text" value={attrPts} className="ml-2 text-center w-[50px] bg-white border" />
            </label>

            <input type="button" value="resetar" className="p-2 text-white bg-black" onClick={() => resetarPontos()} />

            <Table className=" table-auto w-full text-center bg-green-500">
                <Table.Header>
                    <Table.Row>
                        <Table.Head > </Table.Head>
                        <Table.Head >Atributo</Table.Head>
                        <Table.Head >Racial</Table.Head>
                        <Table.Head >Modif.</Table.Head>
                        <Table.Head >Final</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {getColumns()}
                </Table.Body>
            </Table>
        </Card>

    )
}