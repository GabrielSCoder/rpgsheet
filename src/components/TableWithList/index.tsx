import { useState, useEffect, Key } from "react";
import { skill } from "../../assets/types/skill";
import classNames from "../../utils/classNames";
import Button from "../Button";
import Card from "../Card";
import Table from "../Table";
import TitleTag from "../TitleTags";

type Twprops = {
    typeS : any
    primaryList : any
    secundaryList : any
    title : string;
    columnTitle : string
    columnTitle2 : string
    classeName : string
}

export default function TableWithList(props : Twprops) {

    const { typeS, primaryList, secundaryList, columnTitle, columnTitle2, title, classeName } = props

    const [skills, setSkills] = useState(primaryList)
    const [grad, SetGrad] = useState(secundaryList)

    const [rows, setRows] = useState<typeof typeS>([]);
    const [selectedSkills, setSelectedSkills] = useState<[]>([])

    const isSkillSelected = (id: number) => {
        return selectedSkills.some((skill: skill) => skill.id === id);
    };

    const updateSelectedSkills = () => {
        setSelectedSkills((prevSelected) => {

            const validSkills = rows.filter((row: { id: any; }) => row && row.id)
            console.log(validSkills)
            return validSkills;
        });
    };

    const handleChangeSkill = (value: any, index: number) => {

        const selectedSkill = JSON.parse(value);

        setRows((prev: any) => {
            let tmp = prev
            tmp[index] = { ...rows[index], id: selectedSkill.id, nome: selectedSkill.nome }
            return tmp
        })

        updateSelectedSkills();
    }

    const handleChangeRank = (value: any, index: number) => {

        setRows((prev: any) => {
            let tmp = prev
            tmp[index] = { ...rows[index], graduacaoId: parseInt(value, 10) }
            return tmp
        })

        console.log(rows)
    }

    const addRow = () => {
        setRows((prevRows: any) => [
            ...prevRows,
            { value: Date.now(), id: 0, nome: "", graduacaoId: 4 },
        ]);
    };

    const removeSkill = () => {

        setRows((prevRows: any) => {
            let temp = [...prevRows]
            temp.pop()
            return temp
        });

    }

    const removeRow = (index: number) => {
        setRows((prevRows: any[]) => {
            const updatedRows = prevRows.filter((_: any, i: number) => i !== index);
            return updatedRows;
        });

    };

    const getJSON = () => {

        const tmp = rows.map((key: { id: any; nome: any; graduacaoId: string | number; }, index: any) => (
            { id: key.id, nome : key.nome, graduacao : secundaryList[key.graduacaoId] }
        ))

        const jsonString = JSON.stringify(tmp, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "test.json"; 
        a.click();

        URL.revokeObjectURL(url); 
    };

    useEffect(() => {
        console.log(rows)
        updateSelectedSkills()
    }, [rows.length])

    return (
        <Card className="flex-col gap-1 w-1/2">

            <TitleTag.Sub className="text-center">{title}</TitleTag.Sub>

            <div className={classNames("bg-purple-500 flex justify-center items-start w-full h-[500px] overflow-y-auto", classeName)}>
                <Table className="table-auto text-center align-middle w-full bg-yellow-500">
                    <Table.Header className="sticky top-0 bg-red-300">
                        <Table.Row>
                            <Table.Head className="py-3">{columnTitle}</Table.Head>
                            <Table.Head>{columnTitle2}</Table.Head>
                            <Table.Head> </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="overflow-y-auto">
                        {rows.map((row: { value: Key | null | undefined; }, index: number) => (
                            <Table.Row key={row.value}>
                                <Table.Column>
                                    <select
                                        className="rounded-md p-2 w-full border-slate-300"
                                        onChange={(e) => handleChangeSkill(e.target.value, index)}
                                    >
                                        <option>Selecione</option>
                                        {skills &&
                                            skills.map((item : any) => (
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
                                <Table.Column>
                                    <select className={classNames('rounded-md p-2 w-full border-slate-300')} onChange={(e) => handleChangeRank(e.target.value, index)} defaultValue={4}>
                                        <option className="">Selecione</option>
                                        {secundaryList && secundaryList.map((item: any) => (
                                            <option key={item.id} value={item.id} className="text-black">{item.id} - {item.nome} ({item.valor})</option>
                                        ))}
                                    </select>
                                </Table.Column>
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