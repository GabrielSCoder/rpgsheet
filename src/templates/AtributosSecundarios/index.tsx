import Card from "../../components/Card";
import { Input } from "../../components/Inputs";
import TitleTag from "../../components/TitleTags";

export function AtributosSecundarios() {

    return (
        <Card className="h-40 bg-blue-500 gap-2">
            <Card className="flex-col items-center">
                <Input.Text name="pontos_vida" className="w-10 text-center" disabled />
                <TitleTag.Sub>Pontos de vida</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Text name="pontos_vida" className="w-10 text-center" disabled />
                <TitleTag.Sub>Pontos de magia</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Text name="pontos_vida" className="w-10 text-center" disabled />
                <TitleTag.Sub>Ataque</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Text name="pontos_vida" className="w-10 text-center" disabled />
                <TitleTag.Sub>Defesa</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Text name="pontos_vida" className="w-10 text-center" disabled />
                <TitleTag.Sub>Iniciativa</TitleTag.Sub>
            </Card>
        </Card>
    )
}