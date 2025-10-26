import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import type { Link } from "./src/entities/link/types";
import { normalizeUrl } from "./src/entities/link/normalize";
import type { SaveState } from "./src/entities/common/result";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from 'expo-system-ui';

export default function App() {
  //Estado Tipado: Aprendemos a decirle Exactamente a react que manejamos
  const [url, setUrl] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [save, setSave] = useState<SaveState>({ status: "idle" });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#fff').catch(() => { });
  })

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
    <View style={styles.container}>
      <Text style={styles.h1}>LinkPilot - MVP</Text>

      <TextInput
        placeholder="Pega un link (https://...)"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
        style={styles.input}

      />
      <Button title={save.status === 'saving' ? 'Guardando...' : 'Guardar'} onPress={addLink} />

      {save.status === 'error' && (
        <Text style={styles.error}> {save.message} </Text>
      )}

      <FlatList
        data={links}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text numberOfLines={1}> {item.title || item.url}</Text>
            <Text style={styles.meta}> {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    paddingTop: 48,
    backgroundColor: "#ffffff", // 👈 fondo blanco explícito
  },
  h1: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111111", // 👈 texto oscuro, legible
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    color: "#000000", // texto negro dentro del input
    backgroundColor: "#f9f9f9", // leve contraste con el fondo
  },
  error: {
    color: "crimson",
    marginTop: 8,
    fontWeight: "500",
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e0e0",
  },
  meta: {
    opacity: 0.6,
    fontSize: 12,
    color: "#444444",
  },
});