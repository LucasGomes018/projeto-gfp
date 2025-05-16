import { BD } from "../db.js";

const SECRET_KEY = 'chave_api_gfp';

class rotasContas {
    static async novaConta(req, res) {
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        // Validando dados
        if (!nome || !tipo_conta || !saldo) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        try {
            const local_transacao = await BD.query(`
                INSERT INTO contas (nome, tipo_conta, saldo, ativo, conta_padrao) 
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [nome, tipo_conta, saldo, ativo, conta_padrao]
            );

            res.status(201).json("Conta cadastrada");
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            res.status(500).json({ message: "Erro ao criar conta", error: error.message });
        }
    }

    static async listarContas(req, res) {
        try {
            const contas = await BD.query("SELECT * FROM contas");
            res.status(200).json(contas.rows);
        } catch (error) {
            console.error("Erro ao listar contas:", error);
            res.status(500).json({ message: "Erro ao listar contas", error: error.message });
        }
    }

    static async deletarConta(req, res) {
        const { id } = req.params;
        try {
          // Chama o metodo na classe usuario para deletar um usuario
          const conta = await BD.query(
            `UPDATE contas SET ativo = false WHERE id_conta = $1 `,
            [id]
          );
          return res.status(200).json({ message: "Conta desativado com sucesso!" });
        } catch (error) {
          console.error("Erro ao desativar conta:", error);
          res.status(500).json({ message: "Erro ao desativar conta", error: error.message });
        }
    }

    static async consultaPorId(req, res) {
        const { id } = req.params;
    
        try {
          const conta = await BD.query(
            `SELECT * FROM contas WHERE id_conta = $1`,
            [id]
          );
          return res.status(200).json(conta.rows[0]);
        } catch (error) {
          console.error("Erro ao consultar conta:", error);
          res.status(500).json({ message: "Erro ao consultar conta", error: error.message });
        }
    }

    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        try {
            const conta = await BD.query(
                `UPDATE contas SET nome = $1, tipo_conta = $2, saldo = $3, ativo = $4, conta_padrao = $5 WHERE id_conta = $6 RETURNING *`, // comando para atualizar o usuario
                [nome, tipo_conta, saldo, ativo, conta_padrao, id] // comando para atualizar o usuario
            )
            return res.status(200).json(conta.rows[0]);
        } catch (error) {
          console.error("Erro ao atualizar conta:", error);
          res.status(500).json({ message: "Erro ao atualizar conta", error: error.message });
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        try {
          // Inicializar arrays(vetores) para armazenar os campos e valores que serão atualizados
          const campos = [];
          const valores = [];
    
          // Verificar quais campos foram fornecidos
          if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`);
            valores.push(nome);
          }
          if (tipo_conta !== undefined) {
            campos.push(`tipo_conta = $${valores.length + 1}`);
            valores.push(tipo_conta);
          }
          if (saldo !== undefined) {
            campos.push(`saldo = $${valores.length + 1}`);
            valores.push(saldo);
          }
          if (ativo !== undefined) {
            campos.push(`ativo = $${valores.length + 1}`);
            valores.push(ativo);
          }
          if (conta_padrao !== undefined) {
            campos.push(`conta_padrao = $${valores.length + 1}`);
            valores.push(conta_padrao);
          }
          if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo para atualizar foi fornecido." });
          }
    
          // adicionar o id ao final de valores
    
          // montamos a query dinamicamente
          const query = `UPDATE contas SET ${campos.join(", ")}  
                          WHERE id_conta = ${id} RETURNING *`;
          // Executando a query
          const conta = await BD.query(query, valores);
    
          // Verifica se o uusario foi atualizado
          if (conta.rows.length === 0) {
            return res.status(404).json({ message: "Local não encontrado" });
          }
    
          return res.status(200).json(conta.rows[0]);
        } catch (error) {
          console.error("Erro ao atualizar conta:", error);
          res.status(500).json({ message: "Erro ao atualizar conta", error: error.message });
        }
    }

    static async filtrarContas(req, res) {
    const { nome } = req.query;
    try{
      const query = `
        SELECT * FROM contas WHERE nome LIKE $1 AND ativo = true ORDER BY nome DESC`;

      const valor = [`%${nome}%`]
      const resposta = await BD.query(query, valor);
      return res.status(200).json(resposta.rows);

    } catch (error) {
      console.error("Erro ao filtrar contas:", error);
      res.status(500).json({ message: "Erro ao filtrar contas", error: error.message });
    }
  }
}


export default rotasContas;