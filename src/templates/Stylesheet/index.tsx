import Card from "../../components/Card";

import { Input } from "../../components/Inputs";
import Table from "../../components/Table";
import TitleTag from "../../components/TitleTags";

import classes from "../../assets/jsons/classes.json"

import races from "../../assets/jsons/races.json"
import Button from "../../components/Button";

import { useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import AtributosTemplate from "../Atributos";
import ListaHabilidade from "../ListaHabilidades";

export default function StyleSheet() {

    const { register, handleSubmit, getValues, watch, setValue, control } = useForm({
        defaultValues: {
            "racaId": null
        }
    })

    

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



    const sub1 = () => {
        handleSubmit(data => {
            console.log(data)
        })()
    }

    const updateRacaId = (value: number) => {
        setValue("racaId", value)
    }

   
    return (
        <div className="flex flex-col h-full">

            <Button onClick={sub1} text="test" type="submitt" />

            <Card className="border rounded-md shadow-md grid grid-cols-4 gap-2 p-2">
                <Input.Text name="nome" placeholder="Nome" className="border rounded-md col-span-2 p-2" />
                <Input.Text name="jogador" placeholder="jogador" className="border rounded-md col-span-2 p-2" />
                <CustomSelect dados={races} id="d" nome="raca_select" onChange={updateRacaId} valorSelecionado={getValues("racaId")} classeName="border rounded-md col-span-1 p-2" key={0} />
                <Input.SelectOpt register={register} name="classe" placeholder="Classe" className="border rounded-md col-span-1 p-2" dados={classes} />
                <Input.SelectOpt register={register} name="sexo" placeholder="Sexo" className="border rounded-md col-span-1 p-2" dados={sexo.dados} />
                <Input.Number name="deslocamento" placeholder="deslocamento" className="border rounded-md col-span-1 p-2" />
                {/* <Input.SelectOpt name="regras" className="border rounded-md col-span-1 p-2" dados={regras.dados} /> */}
                <Input.Number name="idade" placeholder="idade" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="peso" placeholder="peso" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="divindades" placeholder="divindidades" className="border rounded-md col-span-1 p-2" />
                <Input.Text name="plano_origem" placeholder="Plano de Origem" className="border rounded-md col-span-1 p-2" />
                <input {...register("racaId")} hidden />
            </Card>

            <Card className="bg-red-500 w-full justify-center gap-5">

                <AtributosTemplate control={control} getValues={getValues} setValues={setValue} register={register} watch={watch} />

                <ListaHabilidade control={control} getValues={getValues} register={register} setValues={setValue} watch={watch}/>

            </Card>

            <Card className="bg-green-500 justify-center items-center gap-10">
                <Card className="flex-col gap-1 ">

                    <TitleTag.Sub className="text-center">Perícias</TitleTag.Sub>

                    <Table className="table-auto w-full text-center align-middle ">
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Nome</Table.Head>
                                <Table.Head>Graduação</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Column>Perícia 1</Table.Column>
                                <Table.Column>Normal</Table.Column>
                            </Table.Row>
                            <Table.Row>
                                <Table.Column>Perícia 1</Table.Column>
                                <Table.Column>Normal</Table.Column>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </Card>

                <Card className="flex-col gap-1 ">

                    <TitleTag.Sub className="text-center">Perícias com armas</TitleTag.Sub>

                    <Table className="table-auto w-full text-center align-middle ">
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Nome</Table.Head>
                                <Table.Head>Bônus</Table.Head>
                                <Table.Head>Dano</Table.Head>
                                <Table.Head>Alcance</Table.Head>
                                <Table.Head>Tipo</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Column>Adaga</Table.Column>
                                <Table.Column>+3</Table.Column>
                                <Table.Column>2d6</Table.Column>
                                <Table.Column>3</Table.Column>
                                <Table.Column>P/C</Table.Column>
                            </Table.Row>
                            <Table.Row>
                                <Table.Column>Arco Composto</Table.Column>
                                <Table.Column>+3</Table.Column>
                                <Table.Column>2d6</Table.Column>
                                <Table.Column>3</Table.Column>
                                <Table.Column>P/C</Table.Column>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </Card>

            </Card>






            <Card className="flex-col gap-1 bg-indigo-500">

                <TitleTag.Sub className="text-center">Perícias com armaduras e escudos</TitleTag.Sub>

                <Table className="table-auto w-full text-center align-middle ">
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Nome</Table.Head>
                            <Table.Head>IP-C</Table.Head>
                            <Table.Head>IP-E</Table.Head>
                            <Table.Head>IP-P</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Column>Cota de malhas</Table.Column>
                            <Table.Column>2</Table.Column>
                            <Table.Column>10</Table.Column>
                            <Table.Column>2</Table.Column>

                        </Table.Row>
                        <Table.Row>
                            <Table.Column>Cota de malhas</Table.Column>
                            <Table.Column>2</Table.Column>
                            <Table.Column>10</Table.Column>
                            <Table.Column>2</Table.Column>

                        </Table.Row>

                    </Table.Body>
                </Table>
            </Card>

            <Card className="bg-orange-500 justify-center">

                <Card className="flex-col gap-1 w-1/2">
                    <TitleTag.Sub className="text-center">Rituais</TitleTag.Sub>

                    <Table className=" table-auto w-full text-center">
                        <Table.Header>
                            <Table.Row>
                                <Table.Head > </Table.Head>
                                <Table.Head >Arkanos</Table.Head>
                                <Table.Head >Divinos</Table.Head>
                                <Table.Head >PSI</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {/* {getColumns2()} */}
                            <></>
                        </Table.Body>
                    </Table>
                </Card>

                <Card className="flex-col w-1/2 justify-center ">
                    <TitleTag.Sub>Caminhos de Magia</TitleTag.Sub>

                    <Card>
                        <label>
                            Ar

                            <Input.Text name="caminho_ar" />
                        </label>
                        <label>
                            Fogo
                            <Input.Text name="caminho_fogo" />
                        </label>
                        <label>
                            Água
                            <Input.Text name="caminho_agua" />
                        </label>
                        <label>
                            Terra
                            <Input.Text name="caminho_terra" />
                        </label>
                        <label>
                            Luz
                            <Input.Text name="caminho_luz" />
                        </label>
                        <label>
                            Trevas
                            <Input.Text name="caminho_trevas" />
                        </label>
                    </Card>

                </Card>

            </Card>

        </div>
    )
}