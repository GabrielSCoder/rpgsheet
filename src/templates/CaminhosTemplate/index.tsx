import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";

export function CaminhosMagia({ focusPts, setFocusPts, fPoints, setFpoints }: any) {

    const handleInputChange = (focus: string, newValue: number) => {
        const currentAtributoValue = focusPts[focus as keyof typeof focusPts]
        const diff = newValue - currentAtributoValue

        if (diff > fPoints || newValue < 0) {
            return;
        }

        setFpoints(fPoints - diff)
        setFocusPts({
            ...focusPts,
            [focus]: newValue,
        });
    };


    return (
        <Card className="flex-col bg-purple-500 p-2">

            <TitleTag.Sub>Caminhos de Magia</TitleTag.Sub>

            <Card className="grid grid-cols-3 gap-4 text-center">

                <div className="col-span-1 flex items-center gap-2 ">
                    <label className="w-11">Ar</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.ar} onChange={(e) =>
                        handleInputChange(focusPts.ar, parseInt(e.target.value, 10) || 0)
                    } />


                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Água</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.agua} />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Fogo</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.fogo} />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Terra</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.terra} />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Luz</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.luz} />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Trevas</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center" value={focusPts.trevas} />
                </div>
                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-full">Pontos de Focus restantes</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-fit" value={fPoints} />
                </div>
            </Card>

        </Card>
    )
}