import { useNavigate, Link } from "react-router-dom";
import Estilos, { corTextos, corFundo2 } from "../styles/Estilos";
import { enderecoServidor } from "../utils";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos!");
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        navigate("/principal");
        localStorage.setItem("UsuarioLogado", JSON.stringify(dados));
      } else {
        // setMensagem('Usuário ou senha inválidos! 😢')
        throw new Error("Usuário ou senha inválidos 😢");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(error.message);
    }
  }

  return (
    <div
      style={{
        ...Estilos.container,
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={Estilos.titulo}>Tela de Login</h1>
      <input
        style={{ ...Estilos.input, marginBottom: "15px", width: "100%" }}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Usuário"
      />
      <input
        style={{ ...Estilos.input, marginBottom: "15px", width: "100%" }}
        type="password"
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <button style={{ ...Estilos.botao, width: "70%" }} onClick={botaoEntrar}>
        Entrar
      </button>
    </div>
  );
}
