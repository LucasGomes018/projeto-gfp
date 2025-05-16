import express from "express";
import { testarConexao } from "./db.js";
import cors from "cors";

import rotasUsuarios, {autenticarToken} from "./routes/rotasUsuarios.js";
import rotasCategorias from "./routes/rotasCategorias.js";
import rotasSubCategorias  from "./routes/rotasSubCategorias.js";
import rotasContas  from "./routes/rotasContas.js";
import rotasTransacao from "./routes/rotasTransacao.js";

const app = express();

testarConexao();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Rotas de Usuários {autenticarToken}
app.get("/usuarios/filtrarUsuarios", rotasUsuarios.filtrarUsuarios)
app.get("/usuarios", autenticarToken, rotasUsuarios.listarUsuarios);
app.post("/usuarios", rotasUsuarios.novoUsuario);
app.post('/usuarios/login', rotasUsuarios.login);
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletarUsuario);
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar);
app.put('/usuarios/:id', autenticarToken, rotasUsuarios.atualizarTodosCampos);
app.get('/usuarios/:id', autenticarToken, rotasUsuarios.consultaPorId);


// Rotas de categorias {autenticarToken2}
app.get("/categorias/filtrarCategoria", rotasCategorias.filtrarCategoria)
app.get("/categorias", rotasCategorias.listarCategorias);
app.post("/categorias", autenticarToken, rotasCategorias.novaCategoria);
app.delete('/categorias/:id', autenticarToken, rotasCategorias.deletarCategoria);
app.get('/categorias/:id',   rotasCategorias.consultaPorId);
app.put('/categorias/:id', autenticarToken, rotasCategorias.atualizarTodosCampos);
app.patch('/categorias/:id', autenticarToken, rotasCategorias.atualizar);

// Rotas de subcategorias {autenticarToken3}
app.get('/subcategorias/filtrarSubCategoria', rotasSubCategorias.filtrarSubCategoria)
app.get('/subcategorias', rotasSubCategorias.listarSubCategorias);
app.post('/subcategorias', autenticarToken, rotasSubCategorias.novaSubCategoria);
app.delete('/subcategorias/:id', autenticarToken, rotasSubCategorias.deletarSubCategoria);
app.get('/subcategorias/:id', rotasSubCategorias.consultaPorId);
app.put('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizarTodosCampos);
app.patch('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizar);

// Rotas de Contas {autenticarToken4}
app.get('/contas/filtrarContas', rotasContas.filtrarContas)
app.get('/contas', rotasContas.listarContas);
app.post('/contas', autenticarToken, rotasContas.novaConta);
app.delete('/contas/:id', autenticarToken, rotasContas.deletarConta);
app.get('/contas/:id', rotasContas.consultaPorId);
app.put('/contas/:id', autenticarToken, rotasContas.atualizarTodosCampos);
app.patch('/contas/:id', autenticarToken, rotasContas.atualizar);

// Rotas de transação {autenticarToken5}
app.get('/transacao/somarTransacao', rotasTransacao.somarTransacoes)
app.get('/transacao/filtroData', rotasTransacao.filtrarPorData)
app.get('/transacao/transacoesVencidas/:id_usuario', rotasTransacao.transacoesVencidas)
app.get('/transacao', rotasTransacao.listarTransacao);
app.get('/transacao/:id', rotasTransacao.consultaPorId);
app.post('/transacao', autenticarToken, rotasTransacao.novaTransacao);
app.delete('/transacao/:id', autenticarToken, rotasTransacao.deletarTransacao);
app.put('/transacao/:id', autenticarToken, rotasTransacao.atualizarTodosCampos);
app.patch('/transacao/:id', autenticarToken, rotasTransacao.atualizar);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api rodando em http://localhost:${porta}`);
});
