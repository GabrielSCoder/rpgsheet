import Card from "../../components/Card";
import TitleTag from "../../components/TitleTags";

export function CaminhosMagia({ focusPts, setFocusPts, fPoints, setFpoints }: any) {

    const handleInputChange = (focus: string, newValue: number) => {

        const currentAtributoValue = focusPts[focus as keyof typeof focusPts]
        const diff = newValue - currentAtributoValue

        console.log("focus : ", focus)
        console.log("newValue :", newValue)
        console.log("atributo value : ", currentAtributoValue)
        console.log("diff ", diff)

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
        <Card className="flex-col bg-purple-500 p-2 justify-center items-center">

            <TitleTag.Sub>Caminhos de Magia</TitleTag.Sub>

            <Card className="grid md:grid-cols-3 grid-cols-2 gap-4 text-center p-2">

                <div className="col-span-1 flex items-center gap-2 ">
                    <label className="w-11">Ar</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.ar} onChange={(e) =>
                        handleInputChange("ar", parseInt(e.target.value, 10) || 0)
                    } />


                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Água</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.agua} onChange={(e) =>
                        handleInputChange("agua", parseInt(e.target.value, 10) || 0)
                    } />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Fogo</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.fogo} onChange={(e) =>
                        handleInputChange("fogo", parseInt(e.target.value, 10) || 0)
                    } />
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Terra</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.terra} onChange={(e) =>
                        handleInputChange("terra", parseInt(e.target.value, 10) || 0)
                    }/>
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Luz</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.luz} onChange={(e) =>
                        handleInputChange("luz", parseInt(e.target.value, 10) || 0)
                    }/>
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-11">Trevas</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[20px]" value={focusPts.trevas} onChange={(e) =>
                        handleInputChange("trevas", parseInt(e.target.value, 10) || 0)
                    }/>
                </div>

                <div className="col-span-1 flex items-center gap-2">
                    <label className="w-full">Pontos de Focus restantes</label>
                    <input type="number" className="p-2 border rounded-md text-black flex-1 text-center w-[50px]" value={fPoints} />
                </div>
            </Card>

        </Card>
    )
}