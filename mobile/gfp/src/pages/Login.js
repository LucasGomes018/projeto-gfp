import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import Estilos from "../styles/Estilos";
import React, { useState } from "react";
import { enderecoServidor } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function botaoEntrar() {
    try {
      if (email === "" || senha === "") {
        throw new Error("Preencha todos os campos!");
      }
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        AsyncStorage.setItem("UsuarioLogado", JSON.stringify(dados));
        navigation.navigate("MenuPrincipal");
      } else {
        throw new Error("Usuário ou senha inválidos 😢");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* Imagem acima do formulário */}
      <View
        animation={"fadeInDown"}
        style={{ marginBottom: 20, flexDirection: "row", alignItems: "center" }}
      >
        <View>
          <Image
            source={require("../assets/logo.png")} // Substitua pelo caminho correto da imagem
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{display: "flex", marginLeft: 10}}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            GFP
          </Text>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            Gestor Financeiro Pessoal
          </Text>
        </View>
      </View>

      {/* Formulário de Login */}
      <View
        style={{
          width: "90%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 15,
          elevation: 5,
        }}
      >
        <Text animation={"fadeInDown"} style={Estilos.titulo}>
          Acesse sua conta
        </Text>
        <View animation={"fadeInUp"} delay={500} style={Estilos.inputContainer}>
          <TextInput
            style={[
              Estilos.input,
              { borderColor: "#706ef9", borderWidth: 1.5 },
            ]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Usuário"
            placeholderTextColor="#aaa"
          />
        </View>
        <View
          animation={"fadeInUp"}
          delay={1000}
          style={Estilos.inputContainer}
        >
          <TextInput
            style={[
              Estilos.input,
              { borderColor: "#706ef9", borderWidth: 1.5 },
            ]}
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#aaa"
          />
        </View>
        <View animation={"fadeInUp"} delay={1500}>
          <Button title="Entrar" color={"#2C3E50"} onPress={botaoEntrar} />
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text style={{color: "#aaa", marginRight: 10}}>Não tem uma conta?</Text>
          <Text style={{color: "blue", fontWeight: "bold"}}>Cadastrar</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#191a82",
    backgroundColor:
      "linear-gradient(90deg,rgba(25, 26, 130, 1) 0%, rgba(54, 92, 207, 1) 48%)",
  },
});
