import { normalizeUrl } from "./normalize";

describe("normalizeUrl", () => {
    it("rechaza cadenas sin punto", () => {
        expect(normalizeUrl("cdffdfff")).toBe("");
        expect(normalizeUrl("google")).toBe("");
    });

    it("rechaza TLD inválido o punto final", () => {
        expect(normalizeUrl("google.c")).toBe("");
        expect(normalizeUrl("google.")).toBe("");
    });

    it("acepta y normaliza dominios válidos", () => {
        expect(normalizeUrl("google.com")).toBe("https://google.com/");
        expect(normalizeUrl("http://mi-dominio.net")).toBe("http://mi-dominio.net/");
        expect(normalizeUrl("https://sub.dominio.org/path?q=1")).toBe("https://sub.dominio.org/path?q=1");
    });

    it("trimea y añade https si falta", () => {
        expect(normalizeUrl("   ejemplo.com  ")).toBe("https://ejemplo.com/");
    });
});
