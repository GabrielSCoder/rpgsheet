import { skill } from "./skill"

export type racaT = {
    id : number
    nome : string
    modificadores : Array<number> | number
    habilidade_racial : Array<skill> | number
}