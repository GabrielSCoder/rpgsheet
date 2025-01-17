import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";

export function CaminhosMagia() {

    return (
        <Card className="flex-col bg-purple-500 p-2">
            <TitleTag.Sub>Caminhos de Magia</TitleTag.Sub>

            <Card className="grid grid-cols-3 gap-4 text-center">

                <div className="col-span-1 flex items-center gap-2 ">
                    <label className="w-11">Ar</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Água</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Fogo</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Fogo</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Luz</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Trevas</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" />
                </div>
            </Card>

        </Card>
    )
}