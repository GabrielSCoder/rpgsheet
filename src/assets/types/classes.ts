export type PericiaClasse = {
    fixas: { id: number; graduacaoId: number }[];
    escolha?: { id: number; graduacaoId: number }[];
};

export type classe = {
    id: number;
    nome: string;
    bonus_constituicao: number;
    pv_inicial: number;
    habilidade_classe: any;
    pericias_classe: PericiaClasse; // Aqui você define que pericias_classe tem fixas
};