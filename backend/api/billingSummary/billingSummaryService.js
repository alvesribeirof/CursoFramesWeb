//importando o lodash
const _ = require('lodash');

//importando o billingCycle de outro módulo (arquivo)
const BillingCycle = require('../billingCycle/billingCycle');

//mais uma função middleware responsavel por sumarizar os ciclos de pagamentos
function getSummary(req, res) {
  //função do mongoose
  BillingCycle.aggregate({
    //passa os documentos apenas com campos especificados para a proxima fase
    //do fluxo de agregação
    $project: {
      credit: {$sum: "$credits.value"},
      debt: {$sum: "$debts.value"}}
  },
  {
    //agrupa os documentos por algum tipo de expressão especificada e a saida
    //passa para a proxima fase do documento usando critério distinct
    $group: {
      _id: null,
      credit: {$sum: "$credit"},
      debt: {$sum: "$debt"}}
  },
  {
    ////passa os documentos apenas com campos especificados para a proxima fase
    //do fluxo de agregação ignorando o  _id necessário no group
    $project: {_id: 0, credit: 1, debt: 1 }
  },
  //função de callback
  function (error, result) {
    if(error) {
      res.status(500).json({ errors: [error]});
    } else {
      res.json(_.defaults(result[0], { credit: 0, debt: 0 }));
    }
  });
}

//exportando a função getSummary através da sintaxe reduzida ECMAScript 2015
//ou ECMAScript 6
module.exports = { getSummary };
