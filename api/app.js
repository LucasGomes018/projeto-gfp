import express from "express";
import { testarConexao } from "./db.js";
import cors from "cors";

import rotasUsuarios, {autenticarToken} from "./routes/rotasUsuarios.js";
import rotasCategorias, {autenticarToken2} from "./routes/rotasCategorias.js";
import rotasSubCategorias, {autenticarToken3} from "./routes/rotasSubCategorias.js";
import rotasLocalTransacao, {autenticarToken4} from "./routes/rotasLocalTransacao.js";
import rotasTransacao, {autenticarToken5} from "./routes/rotasTransacao.js";

const app = express();

testarConexao();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Rotas de Usuários {autenticarToken}
app.get("/usuarios", autenticarToken, rotasUsuarios.listarUsuarios);
app.post("/usuarios", autenticarToken, rotasUsuarios.novoUsuario);
app.post('/usuarios/login', rotasUsuarios.login);
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletarUsuario);
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar);
app.put('/usuarios/:id', autenticarToken, rotasUsuarios.atualizarTodosCampos);
app.get('/usuarios/:id', autenticarToken, rotasUsuarios.consultaPorId);


// Rotas de categorias {autenticarToken2}
app.get("/categorias", rotasCategorias.listarCategorias);
app.post("/categorias", autenticarToken2, rotasCategorias.novaCategoria);
app.delete('/categorias/:id', autenticarToken2, rotasCategorias.deletarCategoria);
app.get('/categorias/:id',  rotasCategorias.consultaPorId);
app.put('/categorias/:id', autenticarToken2, rotasCategorias.atualizarTodosCampos);
app.patch('/categorias/:id', autenticarToken2, rotasCategorias.atualizar);

// Rotas de subcategorias {autenticarToken3}
app.get('/subcategorias', rotasSubCategorias.listarSubCategorias);
app.post('/subcategorias', autenticarToken3, rotasSubCategorias.novaSubCategoria);
app.delete('/subcategorias/:id', autenticarToken3, rotasSubCategorias.deletarSubCategoria);
app.get('/subcategorias/:id', rotasSubCategorias.consultaPorId);
app.put('/subcategorias/:id', autenticarToken3, rotasSubCategorias.atualizarTodosCampos);
app.patch('/subcategorias/:id', autenticarToken3, rotasSubCategorias.atualizar);

// Rotas de local de transação {autenticarToken4}
app.get('/localTransacao', rotasLocalTransacao.listarLocalTransacao);
app.post('/localTransacao', autenticarToken4, rotasLocalTransacao.novoLocalTransacao);
app.delete('/localTransacao/:id', autenticarToken4, rotasLocalTransacao.deletarLocalTransacao);
app.get('/localTransacao/:id', rotasLocalTransacao.consultaPorId);
app.put('/localTransacao/:id', autenticarToken4, rotasLocalTransacao.atualizarTodosCampos);
app.patch('/localTransacao/:id', autenticarToken4, rotasLocalTransacao.atualizar);

// Rotas de transação {autenticarToken5}
app.get('/transacao', rotasTransacao.listarTransacao);
app.post('/transacao', autenticarToken5, rotasTransacao.novaTransacao);
app.delete('/transacao/:id', autenticarToken5, rotasTransacao.deletarTransacao);
app.get('/transacao/:id', rotasTransacao.consultaPorId);
app.put('/transacao/:id', autenticarToken5, rotasTransacao.atualizarTodosCampos);
app.patch('/transacao/:id', autenticarToken5, rotasTransacao.atualizar);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api rodando em http://localhost:${porta}`);
});
