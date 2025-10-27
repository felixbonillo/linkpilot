//Esta funcion NO conoce React ni UI: es dominio puro
//Facilita test y reuso


//Reglas de negocio
//- Trim
//- Si falta http/https, asumir https://
//- Validar sintaxis con URL()
//- Exigir hostname con punto y TLD >= 2 letras
//- Devolver "" si invalida para simplificar la UI (falsy string)

export function normalizeUrl(raw: string): string {
    const trimmed = raw.trim();
    if (!trimmed) return trimmed;

    let candidate = trimmed;
    if (!/^https?:\/\//i.test(candidate)) {
        candidate = 'https://' + candidate;
    }

    try {
        const url = new URL(candidate)
        const host = url.hostname.toLocaleLowerCase();

        if (!host.includes(".")) return "";

        const tld = host.split(".").pop()!;
        if (!/^[a-z]{2,}$/i.test(tld)) return "";

        return url.toString();

    } catch {
        return "";
    }
}