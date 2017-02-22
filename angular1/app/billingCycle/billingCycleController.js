//retirando a declaração do controller do escopo global e atribuindo a uma função
//seguindo boas práticas de John Papa
(function() {
    //declaração do controller do BillingCycleCtrl
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http', //injeção de depedência
        'msgs', //injeção de depedência 
        'tabs', //injeção de depedência
        BillingCycleController //referência da função declarada abaixo
    ]);

    //declarando a função do controller
    function BillingCycleController($http, msgs, tabs) {
        //vm recebe o objeto da propria função dentro do escopo
        const vm = this;
        //constante que aponta para a URL da API
        const url = 'http://localhost:3003/api/billingCycles';

        //reseta o cadastro e zera o ciclo de pagamentos
        vm.refresh = function() {
            $http.get(url).then(function(response) {
                vm.billingCycle = { credits: [{}], debts: [{}] }; //zerando o atributo billingCycle
                vm.billingCycles = response; //resposta obtida do get feita na url que retorna um array de ciclos de pagamentos
                tabs.show(vm, { tabList: true, tabCreate: true }); //passando os estados das abas ativadas
            });
        };

        //função que faz uma requisição http para a API Rest do backend
        //para obter criar de todos os pagamentos da aplicação
        vm.create = function() {
            //se a requisição retornar com sucesso é chamada a função
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.refresh(); //chamada à função de atualizar os ciclos de pagamentos
                msgs.addSuccess('Inserção realizada com sucesso!!');
                //se retornar erro 
            }).catch(function(response) {
                msgs.addError(response.data.errors);
            });
        };
        //função que recebe como parametro o objeto selecionado
        vm.showTabUpdate = function(billingCycle) {
            vm.billingCycle = billingCycle; //variavel do controle recebe o parametro que form vai ler
            tabs.show(vm, { tabUpdate: true }); //mostrando somente a tabUpdate
        };
        //função que recebe como parametro o objeto selecionado
        vm.showTabDelete = function(billingCycle) {
            vm.billingCycle = billingCycle; //variavel do controle recebe o parametro que form vai ler
            tabs.show(vm, { tabDelete: true }); //mostrando somente a tabDelete
        };

        //função que altera os dados da linha selecionada
        vm.update = function() {
            //declarando a const que conterá a url do backend juntamente com o _id do elemento a ser alterado
            const updateUrl = `${url}/${vm.billingCycle._id}`;
            //passagem de dados para a alteração com sucesso do elemento
            $http.put(updateUrl, vm.billingCycle).then(function(response) {
                vm.refresh(); //volte para lista e inclusão
                msgs.addSuccess('Alteração realizada com sucesso!');
            }).catch(function(response) { //caso dê erro retorna a msg de erro
                msgs.addError(response.data.errors);
            });
        };

        //função que deleta os dados da linha selecionada
        vm.delete = function() {
            //declarando a const que conterá a url do backend juntamente com o _id do elemento a ser excluido
            const deleteUrl = `${url}/${vm.billingCycle._id}`;
            //passagem de dados para a exclusão com sucesso do elemento
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh(); //volte para lista e inclusão                
                msgs.addSuccess('Exclusão realizada com sucesso!');
            }).catch(function(response) { //caso dê erro retorna a msg de erro
                msgs.addError(response.data.errors);
            });
        };

        vm.refresh(); //chamada à função de atualizar os ciclos de pagamentos
    }
})();