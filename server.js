import express from "express";

import {
  retornaHistoricoInflacao,
  buscarHistoricoId,
  buscarPorAno,
  calculoIPCA,
} from "./service/service.js";

const app = express();
// retorna todo o histórico de ipca e também a busca por ano
app.get("/historicoIPCA", (req, res) => {
  //Pegando os parâmetros por query (forma simplificada)
  const ano = parseInt(req.query.ano);
  //lógica para buscar por ano
  if (ano) {
    const numAno = Number(ano);
    //validação do parametro ano
    if (isNaN(numAno)) {
      return res.status(400).json({
        mensagem:
          "Parâmetro 'ano' inválido, deve ser um número com quatro digitos",
      });
    }
    const resultado = buscarPorAno(numAno);

    if (resultado.length === 0) {
      return res.status(404).json({
        mensagem: `Nenhum registro foi encontrado para o ano ${numAno}`,
      });
    }
    return res.json(resultado);
  } else {
    res.json(retornaHistoricoInflacao());
  }
});

//rota para o calculo de reajuste do IPCA
app.get("/historicoIPCA/calculo", (req, res) => {
  const { valorInicial, anoInicial, mesInicial, anoFinal, mesFinal } =
    req.query;

  // console.log("Query params recebidos:", req.query);
  const resultado = calculoIPCA(
    valorInicial,
    anoInicial,
    mesInicial,
    anoFinal,
    mesFinal
  );

  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  res.json(resultado);
});

//busca por id
app.get("/historicoIPCA/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "Id inválido, deve ser um número" });
  }

  const historicoId = buscarHistoricoId(id);

  if (!historicoId) {
    return res
      .status(404)
      .json({ erro: "Histórico não encontado para o id informado" });
  }

  res.json(historicoId);
});

//porta de escuta do servidor
app.listen(8080, () => {
  const date = new Date();
  console.log(`Servidor iniciado em ${date}`);
});
