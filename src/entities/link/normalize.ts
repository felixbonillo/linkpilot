//Esta funcion NO conoce React ni UI: es dominio puro
//Facilita test y reuso

export function normalizeUrl(raw: string): string {
    const trimmed = raw.trim();
    if (!trimmed) return trimmed;

    // Si no empieza por http/https, asumimos https://
    if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
    }

    //Si no tiene al menos un punto "." asumimos que no es una URL valida
    if (!trimmed.includes('.')) {
        return '';
    }

    return trimmed;
}