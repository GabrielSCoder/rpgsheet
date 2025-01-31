import Button from "../../components/Button"
import Card from "../../components/Card"
import Table from "../../components/Table"
import TitleTag from "../../components/TitleTags"
import { useEffect, useState } from "react"
import habilidades from "../../assets/jsons/skills.json"
import ranks from "../../assets/jsons/ranks.json"
import { skill } from "../../assets/types/skill"
import classNames from "../../utils/classNames"
import pericia from "../../assets/jsons/pericias.json"
import classe from "../../assets/jsons/classes.json"
import { periciaT } from "../../assets/types/pericia"

type Props = {
    getValues: any
    watch: any
    setData : any
}

export default function ListaPericias(props: Props) {

    const [skills, setSkills] = useState<periciaT[]>([]);
    const [rows, setRows] = useState<periciaT[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<[]>([])
    const [dSkills, setDSkills] = useState<[]>([])
  

    const { getValues, watch, setData } = props

    const periciaFilter = () => {
        const tmp = pericia.filter((row) => {
            return row.tipo === "comum"
        })

        return tmp
    }

    const isSkillSelected = (id: number) => {
        return selectedSkills.some((skill: skill) => skill.id === id);
    };

    const isProtectedSkill = (rowId: number) => {
        return dSkills.some((row) => row.id === rowId)
    }

    const updateSelectedSkills = () => {
        setSelectedSkills((prevSelected) => {

            const validSkills = rows.filter((row) => row && row.id)
            return validSkills;
        });
    };

    const handleChangeRank = (value: any, index: number) => {

        setRows((prev) => {
            const tmp = [...prev]
            tmp[index] = { ...tmp[index], graduacaoId: parseInt(value, 10) }
            return tmp
        })
    }

    const protectedRows = () => {

        const tmp = rows.filter((row) => {
            return dSkills.some((i: any) => row.id === i.id)
        })

        return tmp
    }

    const removeProtectedSkills = () => {

        let x = protectedRows()

        setRows((prevRows) => {
            const updatedRows = prevRows.filter((row) => {
                return !x.some((rowx) => rowx.id === row.id)
            })

            return updatedRows;
        });
    }


    const handleChangeSkill = (value: string, index: number) => {
        const selectedId = parseInt(value, 10);
        const selectedSkill = getSkill(selectedId);

        if (selectedSkill) {
            setRows((prev) => {
                const updatedRows = [...prev]
                updatedRows[index] = { ...updatedRows[index], id: selectedSkill.id, nome: selectedSkill.nome }
                return updatedRows;
            })

            updateSelectedSkills();
        }
    };


    const createDefaultRows = () => {

        const defaultSkills = dSkills.map((key: skill) => {
            const skill = getSkill(key.id)
            return {
                value: Date.now() + Math.random(),
                id: skill.id,
                nome: skill.nome,
                graduacaoId: key.graduacaoId,
            };
        });

        // setRows(defaultSkills);
        return defaultSkills
    };

    const insertDefaultRows = () => {

        const tmp = createDefaultRows()

        return setRows(tmp)
    }


    const getSkill = (opt: string | number): any => {
        if (typeof opt === "number") {
            return pericia.find((i) => i.id === opt)
        } else if (typeof opt === "string") {
            return pericia.find((i) => i.nome === opt)
        }
        return null;
    }

    const addRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            { value: Date.now(), id: 0, nome: "", graduacaoId: 4 },
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

    const getDskills = () => {
      
        const racialSkills = classe[getValues("classeId") - 1]?.pericias_classe?.fixas || []
        setDSkills(racialSkills)
    };

    const updateRowsOnRaceChange = () => {
      
        const nonDefaultRows = rows.filter(
            (row) => !dSkills.some((defaultSkill: skill) => defaultSkill.id === row.id)
        );
    
    
        const defaultRows = createDefaultRows();
    

        const updatedRows = [...defaultRows, ...nonDefaultRows, ];
    
        
        setRows(updatedRows);
    };

    const updateSkillData = () => {
        const rr = rows.map((value) => {
            return {id : value.id, nome : value.nome, graduacaoId : value.graduacaoId}
        })

        setData(rr)
    }


    useEffect(() => {

        setSkills(periciaFilter())

    }, [])

    useEffect(() => {
      
        if (dSkills && dSkills.length > 0) {
            updateRowsOnRaceChange();
        }
        
    }, [dSkills]);
    
    useEffect(() => {
        removeProtectedSkills()
        const raceId = getValues("classeId");
        if (raceId && classe[raceId - 1]?.pericias_classe) {
            getDskills()
        }
    }, [watch("classeId")])
    
    useEffect(() => {
        updateSelectedSkills()
        updateSkillData()
    }, [rows, dSkills])

    return (
        <Card className="flex-col gap-1 md:w-full lg:w-full">

            <TitleTag.Sub className="text-center">Perícias</TitleTag.Sub>

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
                        {rows.map((row, index) => (
                            <Table.Row key={row.value}>
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
                                                    disabled={isSkillSelected(item.id) && rows[index]?.id !== item.id}
                                                >
                                                    {item.id} - {item.nome}
                                                </option>
                                            ))}
                                    </select>

                                </Table.Column>
                                <Table.Column>
                                    <select className={classNames('rounded-md p-2 w-full border-slate-300')} onChange={(e) => handleChangeRank(e.target.value, index)}
                                        value={row.graduacaoId || ""}>
                                        <option className="">Selecione</option>
                                        {ranks && ranks.map((item: any) => (
                                            <option key={item.id} value={item.id} className="text-black">{item.id} - {item.nome} ({item.valor})</option>
                                        ))}
                                    </select>
                                </Table.Column>
                                <Table.Column>
                                    <Button
                                        type="delete"
                                        text="X"
                                        onClick={() => removeRow(index)}
                                        disabled={isProtectedSkill(row.id)}
                                    />
                                </Table.Column>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <Card className="w-full">
                <Button onClick={() => { addRow() }} text="Adicionar" className="w-full mt-5 rounded-none" type="submitt" />
                {/* <Button onClick={() => { createDefaultRows() }} text="criar" className="w-full mt-5 rounded-none" type="submitt" /> */}
                <Button onClick={() => { insertDefaultRows() }} text="add dfl" className="w-full mt-5 rounded-none" type="submitt" />
                <Button onClick={() => { removeProtectedSkills() }} text="Del" className="w-full mt-5 rounded-none" type="delete" />
                <Button onClick={() => { removeSkill() }} text="Remover" className="w-full mt-5 bg-red-800 rounded-none" type="delete" disabled={rows.length <= 0} />
            </Card>

        </Card>
    )
}