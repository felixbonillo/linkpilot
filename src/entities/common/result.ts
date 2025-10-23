//Uniones discriminadas: cada variante tiene un "status" fijo.
//El compilador te obliga a manejar los casos

export type SaveState =
    | { status: 'idle' }
    | { status: 'saving' }
    | { status: 'error'; message: string }
    | { status: "success"; id: string }

//Type Guards: funciones que verifican el tipo en tiempo de ejecución

export function isSaveError(s: SaveState): s is { status: "error"; message: string } {
    return s.status === "error"
}

//Patron Result: standariza "ok" vs "error" con payload tipado
export type Result<T> =
    | { ok: true; data: T }
    | { ok: false; error: string }

//Adios error