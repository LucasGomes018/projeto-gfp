import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // importe o hook

export default function Principal() {
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate(); // inicialize o hook

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("UsuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    } else {
      navigate("/"); // redirecione para a tela de login
    }
  }, [navigate]);

  return (
    <div>
      <div
        style={{
          display: "flex", // ajuste para flex
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Olá, {usuario.nome}</h1>
        <button
          style={{
            backgroundColor: "#2C3E50",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100px",
          }}
          onClick={() => {
            localStorage.removeItem("UsuarioLogado");
            navigate("/");
          }}
        >
          Sair
        </button>
      </div>
      <h1>Tela Principal</h1>
    </div>
  );
}

