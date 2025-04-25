import express from "express";
import { testarConexao } from "./db.js";
import cors from "cors";

import rotasUsuarios, {autenticarToken} from "./routes/rotasUsuarios.js";
import rotasCategorias from "./routes/rotasCategorias.js";
import rotasSubCategorias  from "./routes/rotasSubCategorias.js";
import rotasLocalTransacao  from "./routes/rotasLocalTransacao.js";
import rotasTransacao from "./routes/rotasTransacao.js";

const app = express();

testarConexao();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Rotas de Usuários {autenticarToken}
app.get("/usuarios", autenticarToken, rotasUsuarios.listarUsuarios);
app.post("/usuarios", rotasUsuarios.novoUsuario);
app.post('/usuarios/login', rotasUsuarios.login);
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletarUsuario);
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar);
app.put('/usuarios/:id', autenticarToken, rotasUsuarios.atualizarTodosCampos);
app.get('/usuarios/:id', autenticarToken, rotasUsuarios.consultaPorId);


// Rotas de categorias {autenticarToken2}
app.get("/categorias", rotasCategorias.listarCategorias);
app.post("/categorias", autenticarToken, rotasCategorias.novaCategoria);
app.delete('/categorias/:id', autenticarToken, rotasCategorias.deletarCategoria);
app.get('/categorias/:id',   rotasCategorias.consultaPorId);
app.put('/categorias/:id', autenticarToken, rotasCategorias.atualizarTodosCampos);
app.patch('/categorias/:id', autenticarToken, rotasCategorias.atualizar);

// Rotas de subcategorias {autenticarToken3}
app.get('/subcategorias', rotasSubCategorias.listarSubCategorias);
app.post('/subcategorias', autenticarToken, rotasSubCategorias.novaSubCategoria);
app.delete('/subcategorias/:id', autenticarToken, rotasSubCategorias.deletarSubCategoria);
app.get('/subcategorias/:id', rotasSubCategorias.consultaPorId);
app.put('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizarTodosCampos);
app.patch('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizar);

// Rotas de local de transação {autenticarToken4}
app.get('/localTransacao', rotasLocalTransacao.listarLocalTransacao);
app.post('/localTransacao', autenticarToken, rotasLocalTransacao.novoLocalTransacao);
app.delete('/localTransacao/:id', autenticarToken, rotasLocalTransacao.deletarLocalTransacao);
app.get('/localTransacao/:id', rotasLocalTransacao.consultaPorId);
app.put('/localTransacao/:id', autenticarToken, rotasLocalTransacao.atualizarTodosCampos);
app.patch('/localTransacao/:id', autenticarToken, rotasLocalTransacao.atualizar);

// Rotas de transação {autenticarToken5}
app.get('/transacao', autenticarToken, rotasTransacao.listarTransacao);
app.post('/transacao', autenticarToken, rotasTransacao.novaTransacao);
app.delete('/transacao/:id', autenticarToken, rotasTransacao.deletarTransacao);
app.get('/transacao/:id', rotasTransacao.consultaPorId);
app.put('/transacao/:id', autenticarToken, rotasTransacao.atualizarTodosCampos);
app.patch('/transacao/:id', autenticarToken, rotasTransacao.atualizar);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api rodando em http://localhost:${porta}`);
});
