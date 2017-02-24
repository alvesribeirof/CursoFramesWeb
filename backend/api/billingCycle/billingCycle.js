//modulo para expor a api para a aplicação
const restful = require('node-restful');

//manipulação do banco de dados mongodb
const mongoose = restful.mongoose;

//Mapeamento de como será armazenado o credito no mongodb
const creditSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do crédito!'] },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do crédito!'] }
});

//Mapeamento de como será armazenado o debito no mongodb
const debtSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do débito!'] },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    status: {
        type: String,
        required: [false, 'Informe o status do débito!'],
        uppercase: false,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
});

//Mapeamento do schema do ciclo de pagamento e validação dos atributos
const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome!'] },
    month: { type: Number, min: 1, max: 12, required: [true, 'Informe o mês!'] },
    year: { type: Number, min: 1970, max: 2500, required: [true, 'Informe o ano!'] },
    credits: [creditSchema], //array de créditos apontando para o esquema do créditos
    debts: [debtSchema] //array de débitos apontando para o esquema do débitos
});

//exportando o model BillingCycle do schema billingCycleSchema
module.exports = restful.model('BillingCycle', billingCycleSchema);