//modulo para expor a api para a aplicação
const restful = require('node-restful');

//manipulação do banco de dados mongodb
const mongoose = restful.mongoose;

//Mapeamento de como será armazenado o credito no mongodb
const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
});

//Mapeamento de como será armazenado o debito no mongodb
const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
  status: { type: String, required: false, uppercase: true,
    enum: [ 'PAGO', 'PENDENTE', 'AGENDADO', 'CANCELADO'] }
});

//Mapeamento do schema do ciclo de pagamento e validação dos atributos
const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, min: 1970, max: 2500, required: true },
  credits: [creditSchema],//array de créditos apontando para o esquema do créditos
  debts: [debtSchema]//array de débitos apontando para o esquema do débitos
});

//exportando o model BillingCycle do schema billingCycleSchema
module.exports = restful.model('BillingCycle', billingCycleSchema);
