import express from "express";

import {
    retornaHistoricoInflacao,
    buscarHistoricoId,
    buscarPorAno,
} from "./service/service.js";

const app = express();


app.get("/historicoIPCA", (req, res) => {
  const ano = req.query.ano;
 if(ano) {
    const resultado = buscarPorAno(ano);
    res.json(resultado);
  } else {
    res.json(retornaHistoricoInflacao());
  }
})

// app.get("/historicoIPCA", (req, res) => {
//   const ano = req.query.ano;
//   const resultado = buscarPorAno(ano);
//   res.json(resultado);
// });

app.get("/historicoIPCA/:id", (req, res) => {
  const historicoID = buscarHistoricoId(req.params.id);
  res.json(historicoID);
});


app.listen(8080, () => {
  const date = new Date();
  console.log(`Servidor iniciado em ${date}`);
});
