//Importação da camada de dados
import historicoInflacao from "../data/dados.js";

//Retorna toda a coleção de objetos com todos os dados do IPCA
export  const retornaHistoricoInflacao = () => historicoInflacao;

//Faz a busca pelo ID
export const buscarHistoricoId =(id) => {
    const historicoId = parseInt(id);
    return historicoInflacao.find( historico => historico.id === historicoId);
};

//Faz a busca pelo ano
export const buscarPorAno = (ano) => {
    const historicoAno = Number(ano);
    return historicoInflacao.filter( (historico) => historico.ano === historicoAno);
};