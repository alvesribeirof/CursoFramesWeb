//importando o lodash
const _ = require('lodash');

//importando o model BillingCycle
const BillingCycle = require('./billingCycle');

//cria a api rest em cima dos verbos http criando um array de métodos
BillingCycle.methods(['get', 'post', 'put', 'delete']);//integra com as rotas do express também

//na alteração do registro enviar sempre o objeto novo
BillingCycle.updateOptions({new: true, runValidators: true});

//interceptando requisições depois do post e put chamando a função
//sendErrorsOrNext e altere alguns campos
BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

//função chamada depois de post e put para alterar valores de campos antes
//de enviar ao mongoose
function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle;

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors);
    res.status(500).json({errors});
  } else {
    next();
  }
}

//função que retorna um array de erros vindo do mongoose
function parseErrors(nodeRestfulErrors) {
  const errors = [];

//percorre cada um dos atributos do objeto nodeRestfulErrors (bundle.errors) e
//pega o atributo message do objeto error e adiciona ao array errors e
//retorna o array errors para o array errors criado no if
  _.forIn(nodeRestfulErrors, error => errors.push(error.message));
return errors;
}

//declarando uma nova rota para o express e API rest passando a função de middleware callback
BillingCycle.route('count', function (req, res, next) {
  //declarando um metodo para o mongoose do mongodb passando uma funcção para
  //uma consulta no banco de dados
  BillingCycle.count(function (error, value) {
    if(error) {
      res.status(500).json({errors: [error]});
    } else {
      res.json({value});
    }
  });
});

//exportando o ciclo de pagamento
module.exports = BillingCycle;
