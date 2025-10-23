//Alias semantico: Sigue siendo string, pero expresa intencion
//Esto ayuda a no confundir ids con url 

export type LinkId = string;

//Literal types: valores exactos, no cualquier string

export type LinkSource = "manual" | "share" | "sync";

//Contrato de dominio: La verdad sobre un link

export type Link = {
    //Readonly comunica que NO se debe mutar el id luego de crear el objeto
    //Ayuda a evitar bugs

    readonly id: LinkId;
    url: string;
    title: string;
    tags: string[];

    //soft-delete controlado por UI/negocio
    archived: boolean;
    createdAt: number;
    lastVisit?: number; //Opcional, puede no estar definido

    //readonly tambien aqui: el origen del dato no debe cambiar 

    //el porque es para que readonly no pueda ser modificado una vez se declare el valor

    readonly source?: LinkSource;
}