
import Button from "../../components/Button"
import Card from "../../components/Card"

import Table from "../../components/Table"
import TitleTag from "../../components/TitleTags"

import { useEffect, useState } from "react"

import { armadurasd } from "../../assets/types/armaduras"
import classNames from "../../utils/classNames"
import armaduras from "../../assets/jsons/armaduras.json"


export default function ListaArmaduras() {

    const [skills, setSkills] = useState(armaduras);
    const [rows, setRows] = useState<armadurasd[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<[]>([])

    const isSkillSelected = (id: number) => {
        return selectedSkills.some((skill: armadurasd) => skill.id === id);
    };

    const updateSelectedSkills = () => {
        setSelectedSkills((prevSelected) => {

            const validSkills = rows.filter((row) => row && row.id)
            console.log(validSkills)
            return validSkills;
        });
    };

    const handleChangeSkill = (value: any, index: number) => {

        const selectedSkill = JSON.parse(value);

        setRows((prev) => {
            let tmp = prev
            tmp[index] = { ...rows[index], id: selectedSkill.id, nome: selectedSkill.nome, ip_c : selectedSkill.ip_c, ip_i : selectedSkill.ip_i, ip_p : selectedSkill.ip_p }
            return tmp
        })

        updateSelectedSkills();
    }


    const addRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            { value: Date.now(), id: 0, nome: "", ip_c : 0, ip_i : 0, ip_p : 0 },
        ]);
    };

    const removeSkill = () => {

        setRows((prevRows) => {
            let temp = [...prevRows]
            temp.pop()
            return temp
        });

    }

    const removeRow = (index: number) => {
        setRows((prevRows) => {
            const updatedRows = prevRows.filter((_, i) => i !== index);
            return updatedRows;
        });

    };

    // const getJSON = () => {

    //     const tmp = rows.map((key, index) => (
    //         { id: key.id, nome : key.nome, graduacao : ranks[key.graduacaoId] }
    //     ))

    //     const jsonString = JSON.stringify(tmp, null, 2);
    //     const blob = new Blob([jsonString], { type: "application/json" });
    //     const url = URL.createObjectURL(blob);

    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "test.json"; 
    //     a.click();

    //     URL.revokeObjectURL(url); 
    // };

    useEffect(() => {
        console.log(rows)
        updateSelectedSkills()
    }, [rows.length])

    return (
        <Card className="flex-col gap-1 w-1/2">

            <TitleTag.Sub className="text-center">Armaduras/ Escudos</TitleTag.Sub>

            <div className="bg-purple-500 flex justify-center items-start w-full h-[500px] overflow-y-auto">
                <Table className="table-auto text-center align-middle w-full bg-yellow-500">
                    <Table.Header className="sticky top-0 bg-red-300">
                        <Table.Row>
                            <Table.Head className="py-3">Nome</Table.Head>
                            <Table.Head>IP-C</Table.Head>
                            <Table.Head>IP-I</Table.Head>
                            <Table.Head>IP-P</Table.Head>
                            <Table.Head> </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="overflow-y-auto">
                        {rows.map((row, index) => (
                            <Table.Row key={row.value}>
                                <Table.Column>
                                    <select
                                        className="rounded-md p-2 w-full border-slate-300"
                                        onChange={(e) => handleChangeSkill(e.target.value, index)}
                                    >
                                        <option>Selecione</option>
                                        {skills &&
                                            skills.map((item) => (
                                                <option
                                                    key={item.id}
                                                    className="text-black"
                                                    value={JSON.stringify(item)}
                                                    disabled={isSkillSelected(item.id) && rows[index]?.id !== item.id}
                                                >
                                                    {item.id} - {item.nome}
                                                </option>
                                            ))}
                                    </select>
                                </Table.Column>
                                <Table.Column>{row.ip_c}</Table.Column>
                                <Table.Column>{row.ip_i}</Table.Column>
                                <Table.Column>{row.ip_p}</Table.Column>
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
                <Button onClick={() => { removeSkill() }} text="Remover" className="w-full mt-5 bg-red-800 rounded-none" type="delete" disabled={rows.length <= 0} />
            </Card>

        </Card>
    )
}