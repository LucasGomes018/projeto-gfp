import { BD } from "../db.js";

const SECRET_KEY = 'chave_api_gfp';

class rotasLocalTransacao {
    static async novoLocalTransacao(req, res) {
        const { nome, tipo_local, saldo } = req.body;
        // Validando dados
        if (!nome || !tipo_local || !saldo) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        try {
            const local_transacao = await BD.query(`
                INSERT INTO local_transacao (nome, tipo_local, saldo) 
                    VALUES ($1, $2, $3) RETURNING *`,
                [nome, tipo_local, saldo]
            );

            res.status(201).json("Local da Transação Cadastrada");
        } catch (error) {
            console.error("Erro ao criar local de transação:", error);
            res.status(500).json({ message: "Erro ao criar local de transação", error: error.message });
        }
    }

    static async listarLocalTransacao(req, res) {
        try {
            const locais_transacao = await BD.query("SELECT * FROM local_transacao");
            res.status(200).json(locais_transacao.rows);
        } catch (error) {
            console.error("Erro ao listar locais:", error);
            res.status(500).json({ message: "Erro ao listar locais", error: error.message });
        }
    }

    static async deletarLocalTransacao(req, res) {
        const { id } = req.params;
        try {
          // Chama o metodo na classe usuario para deletar um usuario
          const local_transacao = await BD.query(
            `UPDATE local_transacao SET ativo = false WHERE id_local_transacao = $1 `,
            [id]
          );
          return res.status(200).json({ message: "Local desativado com sucesso!" });
        } catch (error) {
          console.error("Erro ao desativar local:", error);
          res.status(500).json({ message: "Erro ao desativar local", error: error.message });
        }
    }

    static async consultaPorId(req, res) {
        const { id } = req.params;
    
        try {
          const local_transacao = await BD.query(
            `SELECT * FROM local_transacao WHERE id_local_transacao = $1`,
            [id]
          );
          return res.status(200).json(local_transacao.rows[0]);
        } catch (error) {
          console.error("Erro ao consultar local:", error);
          res.status(500).json({ message: "Erro ao consultar local", error: error.message });
        }
    }

    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, tipo_local, saldo } = req.body;
        try {
            const local_transacao = await BD.query(
                `UPDATE local_transacao SET nome = $1, tipo_local = $2, saldo = $3 WHERE id_local_transacao = $4 RETURNING *`, // comando para atualizar o usuario
                [nome, tipo_local, saldo, id] // comando para atualizar o usuario
            )
            return res.status(200).json(local_transacao.rows[0]);
        } catch (error) {
          console.error("Erro ao atualizar local:", error);
          res.status(500).json({ message: "Erro ao atualizar local", error: error.message });
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, tipo_local, saldo } = req.body;
        try {
          // Inicializar arrays(vetores) para armazenar os campos e valores que serão atualizados
          const campos = [];
          const valores = [];
    
          // Verificar quais campos foram fornecidos
          if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`);
            valores.push(nome);
          }
          if (tipo_local !== undefined) {
            campos.push(`tipo_local = $${valores.length + 1}`);
            valores.push(tipo_local);
          }
          if (saldo !== undefined) {
            campos.push(`saldo = $${valores.length + 1}`);
            valores.push(saldo);
          }
          if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo para atualizar foi fornecido." });
          }
    
          // adicionar o id ao final de valores
    
          // montamos a query dinamicamente
          const query = `UPDATE local_transacao SET ${campos.join(", ")}  
                          WHERE id_local_transacao = ${id} RETURNING *`;
          // Executando a query
          const local_transacao = await BD.query(query, valores);
    
          // Verifica se o uusario foi atualizado
          if (local_transacao.rows.length === 0) {
            return res.status(404).json({ message: "Local não encontrado" });
          }
    
          return res.status(200).json(local_transacao.rows[0]);
        } catch (error) {
          console.error("Erro ao atualizar local:", error);
          res.status(500).json({ message: "Erro ao atualizar local", error: error.message });
        }
    }
}


export default rotasLocalTransacao;