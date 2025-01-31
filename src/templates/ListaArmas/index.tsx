
import Button from "../../components/Button"
import Card from "../../components/Card"

import Table from "../../components/Table"
import TitleTag from "../../components/TitleTags"
import { useEffect, useState } from "react"
import ranks from "../../assets/jsons/ranks.json"
import armas from "../../assets/jsons/armas.json"
import { armasT } from "../../assets/types/armas"
import pericias from "../../assets/jsons/pericias.json"

type Props = {
    data: any
    atributos: any
    setInvArmasData: any
}

export default function ListaArmas(props: Props) {

    const skills = armas
    const [rows, setRows] = useState<armasT[]>([]);

    const { data, atributos, setInvArmasData } = props


    const removeSkill = () => {

        setRows((prevRows) => {
            let temp = [...prevRows]
            temp.pop()
            return temp
        });
    }

    const handleChangeSkill = (value: string, index: number) => {
        const selectedId = parseInt(value, 10);
        const selectedSkill = getSkill(selectedId);

        if (selectedSkill) {
            setRows((prev) => {
                const updatedRows = [...prev]
                updatedRows[index] = {
                    ...updatedRows[index], id: selectedSkill.id, nome: selectedSkill.nome, dano: selectedSkill.dano, alcance: selectedSkill.alcance,
                    tipo: selectedSkill.tipo, pericia: selectedSkill.pericia
                }
                return updatedRows;
            })

        }
    };

    const getSkill = (opt: string | number): any => {

        if (typeof opt === "number") {
            return armas.find((i) => i.id === opt)
        } else if (typeof opt === "string") {
            return armas.find((i) => i.nome === opt)
        }
        return null;
    }

    const getPericia = (opt: string | number): any => {

        if (typeof opt === "number") {
            return pericias.find((i) => i.id === opt)
        } else if (typeof opt === "string") {
            return pericias.find((i) => i.nome === opt)
        }
        return null;
    }

    const addRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            {
                value: Date.now(),
                id: 0,
                nome: "",
                pericia: 0,
                titulo: "",
                bonus: 0,      
                dano: "",      
                tipo: "",       
                alcance: 0     
            },
        ]);
    };

    const removeRow = (index: number) => {

        setRows((prevRows) => {
            const updatedRows = prevRows.filter((_, i) => i !== index);
            return updatedRows;
        });

    };

    const bonusCalc = (row: any) => {

        const per = getPericia(row.pericia)

        if (per && per.id && rows.length > 0) {

            const r = data.find((row: any) => row.id === per.id)

            let bonus = 0

            if (r) {
                bonus = Math.ceil((ranks[r.graduacaoId - 1].valor + atributos[2]) / 2)
            } else {
                bonus = Math.ceil(atributos[2] / 2)
            }

            return bonus
        }

        return 0
    }

    const changeNameWeapon = (value: string, row: any) => {
        setRows((prevRows) =>
            prevRows.map((r) =>
                r === row ? { ...r, titulo: value } : r
            )
        );
    };

    const updateData = () => {
        
        console.log("disparando")

        const m = rows.map((row) => {
            return {id : row.id, titulo : row.titulo, dano : row.dano, tipo : row.tipo, pericia : row.pericia, alcance : row.alcance }
        })

        setInvArmasData(m)
    }

    useEffect(() => {
        updateData()
    }, [rows])

    return (
        <Card className="flex-col gap-1 md:w-1/2 overflow-x-auto">

            <TitleTag.Sub className="text-center">Inventário Armas</TitleTag.Sub>

            <div className="bg-purple-500 flex justify-center items-start w-full h-[500px] overflow-y-auto">
                <Table className="table-auto text-center align-middle w-full bg-yellow-500">
                    <Table.Header className="sticky top-0 bg-red-300">
                        <Table.Row>
                            <Table.Head className="py-3">Nome</Table.Head>
                            <Table.Head>Tipo arma</Table.Head>
                            <Table.Head>Bônus</Table.Head>
                            <Table.Head>Dano</Table.Head>
                            <Table.Head>Alcance</Table.Head>
                            <Table.Head>Tipo</Table.Head>
                            <Table.Head> </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="overflow-y-auto">
                        {rows.map((row, index) => (
                            <Table.Row key={row.value}>
                                <Table.Column><input type="text" className="p-2 border rounded-md w-[100px]" onChange={(e) => changeNameWeapon(e.target.value, row)} value={row.titulo || ""} /></Table.Column>
                                <Table.Column>
                                    <select
                                        className="rounded-md p-2 w-full border-slate-300"
                                        onChange={(e) => handleChangeSkill(e.target.value, index)}
                                        value={row.id || ""}
                                    >
                                        <option value="">Selecione</option>
                                        {skills &&
                                            skills.map((item) => (
                                                <option
                                                    key={item.id}
                                                    className="text-black"
                                                    value={item.id}
                                                >
                                                    {item.id} - {item.nome}
                                                </option>
                                            ))}
                                    </select>

                                </Table.Column>
                                <Table.Column>{bonusCalc(row)}</Table.Column>
                                <Table.Column>{row.dano}</Table.Column>
                                <Table.Column>{row.alcance}</Table.Column>
                                <Table.Column>{row.tipo}</Table.Column>

                                <Table.Column>
                                    <Button
                                        type="delete"
                                        text="X"
                                        onClick={() => removeRow(index)}
                                    />
                                </Table.Column>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <Card className="w-full">
                <Button onClick={() => { addRow() }} text="Adicionar" className="w-full mt-5 rounded-none" type="submitt" />
                <Button onClick={() => { removeSkill() }} text="Del" className="w-full mt-5 rounded-none" type="delete" />
            </Card>

        </Card>
    )
}