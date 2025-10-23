import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import type { Link } from "./src/entities/link/types";
import { normalizeUrl } from "./src/entities/link/normalize";
import type { SaveState } from "./src/entities/common/result";

export default function App() {
  //Estado Tipado: Aprendemos a decirle Exactamente a react que manejamos
  const [url, setUrl] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [save, setSave] = useState<SaveState>({ status: "idle" });

  const addLink = () => {
    setSave({ status: "saving" }); //Limpiamos errores previos

    // 1- Normalizar
    const safe = normalizeUrl(url);

    // 2- Validacion simple: Si quedo vacio, consideramos invalido
    if (!safe) {
      setSave({ status: "error", message: "URL invalida. Ej: https://ejemplo.com" });
      return;
    }

    setSave({ status: 'saving' })

    // 3- Simular 300ms (mas adelante sera DB/API)
    setTimeout(() => {
      const now = Date.now();
      const newLink: Link = {
        id: String(now),
        url: safe,
        title: '',
        tags: [],
        archived: false,
        createdAt: now,
        source: "manual",
      }

      //Inmutabilidad: nunca mutamos el estado existente, siempre creamos uno nuevo producimos un nuevo array
      setLinks(prev => [newLink, ...prev]);
      setUrl('');
      setSave({ status: 'success', id: newLink.id });
    }, 300)
  }

  return (
    
  )


}