//Importando o mongoose responsável por fazer a conexao com o mongoDB e mapeamento dos objetos do documento do banco
const mongoose = require('mongoose');

//exportando o objeto de conexao com o mongodb
module.exports = mongoose.connect('mongodb://localhost/db_finance');

//(node:1732) DeprecationWarning: Mongoose: mpromise (mongoose's default promise
//library) is deprecated, plug in your own promise library instead:
//http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

//declarando a mensagem de erro para valores requiridos
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";

//declarando a mensagem de erro para valores minimos e máxmos
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'.";
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'.";

//declarando a mensagem de erro para status
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'.";
