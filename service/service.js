//Importação da camada de dados
import historicoInflacao from "../data/dados.js";

//Retorna toda a coleção de objetos com todos os dados do IPCA
export  const retornaHistoricoInflacao = () => historicoInflacao;

//Faz a busca pelo ID
export const buscarHistoricoId =(id) => {
    const historicoId = id;
    return historicoInflacao.find( historico => historico.id === id);
};

//Faz a busca pelo ano
export const buscarPorAno = (ano) => {
    const historicoAno = ano;
    return historicoInflacao.filter( (historico) => historico.ano === historicoAno);
};

//Função que calcula o reajuste do IPCA
export const calculoIPCA = (valorInicial,anoInicial, mesInicial,anoFinal,mesFinal) => {
    //validando se todos os parâmetros foram informados corretamente
    if([valorInicial,anoInicial, mesInicial,anoFinal,mesFinal].some(p => p === undefined || p=== null)){
        return {erro: "Todos os prâmetros devem ser informados"};
    }

    //convertendo os parâmetros para número
    const vi = parseFloat(valorInicial);
    const ai = parseInt(anoInicial);
    const mi = parseInt(mesInicial);
    const af = parseInt(anoFinal);
    const mf = parseInt(mesFinal);


    // validando se as váriaveis dos parametros são números válidos
    if(isNaN(vi) || isNaN(ai) || isNaN(mi) || isNaN(af) ||isNaN(mf)){
        return { erro: "Parâmetros inválidos. O valor deve ser um número (ex: 100.00), o ano no formato 'aaaa' e o mês no formato 'mm'."};
    }

    //Verificar a ordem correta das datas
    const dataInicial = new Date(ai, mi -1);
    const dataFinal = new Date(af, mf -1);
    if(dataFinal < dataInicial ){
        return {erro:"A data final não pode ser menor do que a data inicial" };
    }

    //iterar mês a mês e acumula o indice

    let indiceAcumulado =  1;
    let ano = ai;
    let mes = mi;

    while(ano < af ||(ano === af && mes <= mf) ){
        const ipcaEntry = historicoInflacao.find((e) => e.ano === ano && e.mes === mes);
        if(!ipcaEntry){
            return {erro:`Dados do IPCA não encotrados para ${mes}/${ano}`};
        };
        indiceAcumulado *= 1 + ipcaEntry.ipca /100;

        mes++

        if(mes > 12){
            mes = 1;
            ano++;
        }
    };

    const valorCorrigido =  vi * indiceAcumulado;

    return {
        valorOriginal: parseFloat(vi.toFixed(2)),
        valorCorrigido: parseFloat(valorCorrigido.toFixed(2)),
        fatorReajuste: parseFloat(indiceAcumulado.toFixed(6)),
    };

};
