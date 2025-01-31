import { atributos_secundariosT } from "../../assets/types/atributosSecundarios";
import Card from "../../components/Card";
import { Input } from "../../components/Inputs";
import TitleTag from "../../components/TitleTags";


export function AtributosSecundarios({props} : {props : atributos_secundariosT}) {

    return (
        <Card className="h-40 bg-blue-500 gap-2 justify-center p-2">

            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled  value={props.pts_vida}/>
                <TitleTag.Sub className="text-xs md:text-base">Pontos de vida</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled  value={props.pts_vida}/>
                <TitleTag.Sub className="text-xs md:text-base">Pontos de vida máximo</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled value={props.pts_magia}/>
                <TitleTag.Sub className="text-xs md:text-base">Pontos de magia</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled value={props.pts_magia}/>
                <TitleTag.Sub className="text-xs md:text-base">Pontos de magia máximo</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled value={props.defesa}/>
                <TitleTag.Sub className="text-xs md:text-base">Defesa</TitleTag.Sub>
            </Card>
            <Card className="flex-col items-center">
                <Input.Number name="pontos_vida" className="w-10 text-center" disabled value={props.iniciativa} />
                <TitleTag.Sub className="text-xs md:text-base">Iniciativa</TitleTag.Sub>
            </Card>
        </Card>
    )
}