import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Estilos, { corTextos } from "../styles/Estilos";

export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const usuarioLogado = await AsyncStorage.getItem("UsuarioLogado");
      if (usuarioLogado) {
        setUsuario(JSON.parse(usuarioLogado));
      } else {
        navigation.navigate("Login");
      }
    };

    buscarUsuarioLogado();
  }, []);

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ ...Estilos.titulo }}>Olá, {usuario.nome}</Text>
        <Button
          title="Sair"
          onPress={async () => {
            await AsyncStorage.removeItem("UsuarioLogado");
            navigation.navigate("Login");
          }}
        />
      </View>
      <Text style={{ ...Estilos.titulo }}>Tela Principal</Text>
    </View>
  );
}
