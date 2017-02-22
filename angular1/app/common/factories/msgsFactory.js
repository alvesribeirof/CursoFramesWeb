//factory que recebe um conjunto de mensagens e as exibe na pagina quando necessário
//definida através de uma função auto invocada
(function() {
    angular.module('primeiraApp').factory('msgs', [
        'toastr', //injeção de dependência
        MsgsFactory //referência para o metodo criado abaixo
    ]);

    //toastr passado para imprimir as mensagens
    function MsgsFactory(toastr) {
        //função que recebe as msgs titulo e um metodo da toastr
        function addMsg(msgs, title, method) {
            //se as mensagens for uma instancia de arrays
            if (msgs instanceof Array) {
                //para cada mensagem chama o toastr responsável por imprimir as msgs chamando dinamicamente o 
                //metodo [method] - string que representa o nome do metodo recebendo os parametros 
                msgs.forEach(msg => toastr[method](msg, title));
            } else { //caso nao seja um array e sim um elemento
                toastr[method](msgs, title); //chama o toastr chamando seu metodo passando os parametros
            }
        }
        //função que recebe uma lista de mensagens caso dê tudo certo
        function addSuccess(msgs) {
            addMsg(msgs, 'Sucesso', 'success');
        }
        //função que recebe uma lista de mensagens caso dê errado
        function addError(msgs) {
            addMsg(msgs, 'Erro', 'error');
        }
        //retornando um objeto contendo as duas funções de adição de mensagens
        return { addSuccess, addError };
    }
}());