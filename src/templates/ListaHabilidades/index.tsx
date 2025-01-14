import { register } from "module"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { Input } from "../../components/Inputs"
import Table from "../../components/Table"
import TitleTag from "../../components/TitleTags"
import GraduacaoSelect from "../selects/graduacaoSelect"
import { useState } from "react"
import habilidades from "../../assets/jsons/skills.json"
import ranks from "../../assets/jsons/ranks.json"
import { skill } from "../../assets/types/skill"
import classNames from "../../utils/classNames"

export default function ListaHabilidade({ control, register, watch, getValues, setValues }) {

    const [rows, setRows] = useState<skill[]>([]);

    const [skills, setSkills] = useState(habilidades);
    const [selectedSkills, setSelectedSkills] = useState()

    const handleChangeSkill = (value: any) => {

        const selectedSkill = JSON.parse(value);

        setRows((prevRows) => {
            let temp = [...prevRows]
            temp[temp.length - 1] = selectedSkill
            return temp
        });

        console.log(rows)

    }

    const addSkill = () => {

        setRows((prevRows) => {
            let temp = [...prevRows]
            temp.push({ id: 0, nome: "" })
            return temp
        });

        console.log(rows)
    };

    const removeSkill = () => {

        setRows((prevRows) => {

            let temp = [...prevRows]
            temp.pop()
            return temp
        });

    }

    const removeRow = (value) => {


        let temp = rows


        for (let i = value; i < rows.length; i++) {
            // console.log("indo no ", i, i+1)
            temp[i] = temp[i + 1]
        }


        temp.pop()

        console.log(temp)

    }
    const downloadJSON = () => {

        const formattedData = rows.map((nome, index) => ({
            nome: nome,
            id: index + 1,
            // valor : -3 + index // IDs começam em 1
        }));

        const jsonString = JSON.stringify(formattedData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "test.json";
        a.click();
        URL.revokeObjectURL(url);
    };


    return (
        <Card className="flex-col gap-1 w-1/2">

            <TitleTag.Sub className="text-center">Habilidades</TitleTag.Sub>

            <div className="bg-purple-500 flex justify-center items-start w-full h-[500px] overflow-y-auto">
                <Table className="table-auto text-center align-middle w-full bg-yellow-500">
                    <Table.Header className="sticky top-0 bg-red-300">
                        <Table.Row>
                            <Table.Head className="py-3">Nome</Table.Head>
                            <Table.Head>Graduação</Table.Head>
                            <Table.Head> </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="overflow-y-auto">
                        {rows.map((key, index) => (
                            <Table.Row key={index}>
                                <Table.Column>
                                    <select className={classNames('rounded-md p-2 w-full border-slate-300')} onChange={(e) => handleChangeSkill(e.target.value)}>
                                        <option className="">Selecione</option>
                                        {skills && skills.map((item: any) => (
                                            <option key={item.id} className="text-black" value={JSON.stringify(item)}>{item.id} - {item.nome}</option>
                                        ))}
                                    </select>
                                </Table.Column>
                                <Table.Column>
                                    <GraduacaoSelect register={register} name={"rank " + index} className="p-2 w-fit overflow-y-auto" dados={ranks} key={index + 100} />
                                </Table.Column>
                                <Table.Column>
                                    <Button type="delete" text="X" onClick={() => { removeRow(index) }} />
                                </Table.Column>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <Card className="w-full">
                <Button onClick={() => { addSkill() }} text="Adicionar" className="w-full mt-5 rounded-none" type="submitt" />
                <Button onClick={() => { downloadJSON() }} text="Remover" className="w-full mt-5 bg-red-800 rounded-none" type="delete" disabled={rows.length <= 0} />
            </Card>

        </Card>
    )
}