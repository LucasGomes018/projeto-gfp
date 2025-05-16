import { BD } from "../db.js";

const SECRET_KEY = "chave_api_gfp";

class rotasTransacao {
  static async novaTransacao(req, res) {
    const {
      valor,
      descricao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_conta,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;
    // Validando dados
    if (
      !valor ||
      !descricao ||
      !data_vencimento ||
      !data_pagamento ||
      !tipo_transacao ||
      !id_conta ||
      !id_categoria ||
      !id_subcategoria ||
      !id_usuario ||
      !num_parcelas ||
      !parcela_atual
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
      const tipoTransacao = tipo_transacao.toUpperCase();
      const transacao = await BD.query(
        `
                INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          valor,
          descricao,
          data_vencimento,
          data_pagamento,
          tipoTransacao,
          id_conta,
          id_categoria,
          id_subcategoria,
          id_usuario,
          num_parcelas,
          parcela_atual,
        ]
      );

      res.status(201).json("Transação Cadastrada");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      res.status(500).json({ message: "Erro ao criar transação", error: error.message });
    }
  }

  static async listarTransacao(req, res) {
    try {
      const transacoes = await BD.query(`
            SELECT t. *, u.nome AS nome_usuario, c.nome AS nome_Conta, ct.nome AS nome_categoria, sct.nome AS nome_subcategoria 
            	FROM transacoes AS t 
            	LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario 
            	JOIN contas lt on t.id_conta = c.id_conta
            	JOIN categorias ct on t.id_categoria = ct.id_categoria
            	JOIN subcategorias sct on t.id_subcategoria = sct.id_subcategoria
            ORDER BY t.valor DESC`);
      res.status(200).json(transacoes.rows);
    } catch (error) {
      console.error("Erro ao listar locais:", error);
      res.status(500).json({ message: "Erro ao listar locais", error: error.message });
    }
  }

  static async deletarTransacao(req, res) {
    const { id } = req.params;
    try {
      // Chama o metodo na classe usuario para deletar um usuario
      const transacao = await BD.query(
        `DELETE FROM transacoes WHERE id_transacao = $1 `,
        [id]
      );
      return res
        .status(200)
        .json({ message: "Transação deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      res.status(500).json({ message: "Erro ao deletar transação", error: error.message });
    }
  }

  static async consultaPorId(req, res) {
    const { id } = req.params;

    try {
      const transacao = await BD.query(
        `SELECT * FROM transacoes WHERE id_transacao = $1`,
        [id]
      );
      return res.status(200).json(transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao consultar transação:", error);
      res.status(500).json({ message: "Erro ao consultar transação", error: error.message });
    }
  }

  static async atualizarTodosCampos(req, res) {
    const { id } = req.params;
    const {
      valor,
      descricao,
      data_transacao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_conta,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;
    try {
      const tipoTransacao = tipo_transacao.toUpperCase();
      const transacao = await BD.query(
        `UPDATE transacoes SET valor = $1
                 descricao = $2,
                  data_transacao = $3,
                   data_vencimento = $4,
                    data_pagamento = $5,
                     tipo_transacao = $6,
                      id_conta = $7,
                       id_categoria = $8,
                        id_subcategoria = $9,
                         id_usuario = $10,
                         num_parcelas = $11,
                          parcela_atual = $12   WHERE id_transacao = $13 RETURNING *`, // comando para atualizar o usuario
        [
          valor,
          descricao,
          data_transacao,
          data_vencimento,
          data_pagamento,
          tipoTransacao,
          id_conta,
          id_categoria,
          id_subcategoria,
          id_usuario,
          num_parcelas,
          parcela_atual,
          id,
        ] // comando para atualizar o usuario
      );
      return res.status(200).json(transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      res.status(500).json({ message: "Erro ao atualizar transação", error: error.message });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const {
      valor,
      descricao,
      data_transacao,
      data_vencimento,
      data_pagamento,
      tipo_transacao,
      id_conta,
      id_categoria,
      id_subcategoria,
      id_usuario,
      num_parcelas,
      parcela_atual,
    } = req.body;
    try {
      const tipoTransacao = tipo_transacao.toUpperCase();
      // Inicializar arrays(vetores) para armazenar os campos e valores que serão atualizados
      const campos = [];
      const valores = [];

      // Verificar quais campos foram fornecidos
      if (valor !== undefined) {
        campos.push(`valor = $${valores.length + 1}`);
        valores.push(valor);
      }
      if (descricao !== undefined) {
        campos.push(`descricao = $${valores.length + 1}`);
        valores.push(descricao);
      }
      if (data_transacao !== undefined) {
        campos.push(`data_transacao = $${valores.length + 1}`);
        valores.push(data_transacao);
      }
      if (data_vencimento !== undefined) {
        campos.push(`data_vencimento = $${valores.length + 1}`);
        valores.push(data_vencimento);
      }
      if (data_pagamento !== undefined) {
        campos.push(`data_pagamento = $${valores.length + 1}`);
        valores.push(data_pagamento);
      }
      if (tipoTransacao !== undefined) {
        campos.push(`tipoTransacao = $${valores.length + 1}`);
        valores.push(tipoTransacao);
      }
      if (id_conta !== undefined) {
        campos.push(`id_conta = $${valores.length + 1}`);
        valores.push(id_conta);
      }
      if (id_categoria !== undefined) {
        campos.push(`id_categoria = $${valores.length + 1}`);
        valores.push(id_categoria);
      }
      if (id_subcategoria !== undefined) {
        campos.push(`id_subcategoria = $${valores.length + 1}`);
        valores.push(id_subcategoria);
      }
      if (id_usuario !== undefined) {
        campos.push(`id_usuario = $${valores.length + 1}`);
        valores.push(id_usuario);
      }
      if (num_parcelas !== undefined) {
        campos.push(`num_parcelas = $${valores.length + 1}`);
        valores.push(num_parcelas);
      }
      if (parcela_atual !== undefined) {
        campos.push(`parcela_atual = $${valores.length + 1}`);
        valores.push(parcela_atual);
      }
      if (campos.length === 0) {
        return res.status(400).json({ message: "Nenhum campo para atualizar foi fornecido." });
      }

      // adicionar o id ao final de valores

      // montamos a query dinamicamente
      const query = `UPDATE transacoes SET ${campos.join(", ")}  
                          WHERE id_transacao = ${id} RETURNING *`;
      // Executando a query
      const transacao = await BD.query(query, valores);

      // Verifica se o uusario foi atualizado
      if (transacao.rows.length === 0) {
        return res.status(404).json({ message: "Transação não encontrado" });
      }

      return res.status(200).json(transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      res.status(500).json({ message: "Erro ao atualizar transação", error: error.message });
    }
  }

  // Criar uma rota que permite filtrar transacoes por data de vencimento ou data de pagamento
  // dentro de um intervalo especifico

  static async filtrarPorData(req, res) {
    const { data_inicio, data_fim, tipo_data } = req.query;

    let colunaData;
    if(tipo_data == 'vencimento') {
      colunaData = 'data_vencimento'

    } else if(tipo_data == 'pagamento') {
      colunaData = 'data_pagamento'

    } else {
      return res.status(400).json({ message: "Tipo de data inválido. Use 'vencimento' ou 'pagamento'." });
    }

    try {
      const query = `
        SELECT t.*, u.nome AS nome_usuario, ct.nome FROM transacoes AS t
        LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
        JOIN contas ct ON t.id_conta = ct.id_conta
        WHERE ${colunaData} BETWEEN $1 AND $2
        ORDER BY ${colunaData} ASC`
      
      const transacoes = await BD.query(query, [data_inicio, data_fim]);
      res.status(200).json(transacoes.rows);
    } catch (error) {
      console.error("Erro ao filtrar transação:", error);
      res.status(500).json({ message: "Erro ao filtrar transação", error: error.message });
    }
  }

  // Somando transacoes entrada ou saida
  static async somarTransacoes(req, res) {
    const { tipo, id_usuario } = req.query;
    try {
      const tipoTransacao = tipo.toUpperCase();
      const query =`
        SELECT SUM(valor) AS total 
          FROM transacoes 
        WHERE tipo_transacao = $1 AND id_usuario = $2`
      const resultado = await BD.query(query, [tipoTransacao, id_usuario]);

      let total = resultado.rows[0].total
      if (total === null) {
        total = 0
      }
      res.status(200).json({total: parseFloat(total)});
    } catch (error) {
      console.error("Erro ao somar transações:", error);
      res.status(500).json({ message: "Erro ao somar transações", error: error.message });
    }
  }

  static async transacoesVencidas(req, res) {
    const { id_usuario } = req.params;

    try {
      const query = `
        SELECT t.*,
        u.nome AS nome_usuario, 
        c.nome AS nome_conta,
        ct.nome AS nome_categoria,
        sct.nome AS nome_subcategoria
        FROM transacoes AS t
        LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
        JOIN contas c ON t.id_conta = c.id_conta
        JOIN categorias ct ON t.id_categoria = ct.id_categoria
        JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
        WHERE t.data_pagamento > t.data_vencimento -- filtra transações vencidas
        AND t.id_usuario = $1
        ORDER BY t.data_vencimento ASC
        `

      const resultado = await BD.query(query, [id_usuario]);
      // res.status(200).json(resultado.rows);

      // Função para formatar data
      const formatarDataBr = (data) => {
        if(!data) return null
        return new Date(data).toLocaleDateString("pt-BR")
      }

      const dadosFormatados = resultado.rows.map(t => ({
        ...t, // copia todas as propriedades originais da resultado para a t
        data_transacao: formatarDataBr(t.data_transacao),
        data_vencimento: formatarDataBr(t.data_vencimento),
        data_pagamento: formatarDataBr(t.data_pagamento),
      }))
      res.status(200).json(dadosFormatados);

    } catch (error) {
      console.error("Erro ao buscar transações vencidas:", error);
      res.status(500).json({ message: "Erro ao buscar transações vencidas", error: error.message });
    }
  }
}

export default rotasTransacao;
