import Card from "../../components/Card";
import { Input } from "../../components/Inputs";
import Table from "../../components/Table";
import TitleTag from "../../components/TitleTags";

export function RituaisTemplate () {

    const getColumns2 = () => {


        return Array.from({ length: 6 }).map((_, l) => (
            <Table.Row key={`row-${l}`}>
                <Table.Column>{l + 1}º Círculo </Table.Column>
                {Array.from({ length: 3 }).map((_, c) => (
                    <Table.Column key={`col-${l}-${c}`}><Input.Number name={`ritual_coluna${l}_linha${c}`} className="text-center w-[100px]"/></Table.Column>
                ))}
            </Table.Row>
        ));
    };

    return (
        <Card className="bg-orange-500 justify-center md:w-1/2 py-2">

        <Card className="flex-col gap-1">
            <TitleTag.Sub className="text-center">Rituais</TitleTag.Sub>

            <Table className=" table-auto w-full text-center">
                <Table.Header>
                    <Table.Row>
                        <Table.Head > </Table.Head>
                        <Table.Head>Arkanos</Table.Head>
                        <Table.Head>Divinos</Table.Head>
                        <Table.Head>PSI</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {getColumns2()}
                    <></>
                </Table.Body>
            </Table>
        </Card>

        

    </Card>
    )
}