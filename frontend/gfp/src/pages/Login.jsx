import { useNavigate, Link } from "react-router-dom";
import Estilos, { corTextos, corFundo2 } from "../styles/Estilos";

export default function Login() {
    const navigate = useNavigate();
  return (
    <div>
      <h1 style={Estilos.titulo}>Tela de Login</h1>
      <button onClick={() => navigate("/principal")} style={Estilos.botao}>Entrar</button>
    </div>
  );
}
