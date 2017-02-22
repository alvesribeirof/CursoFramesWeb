//declarando as rotas
(function() {
    angular.module('primeiraApp').config([
        '$stateProvider', //presente dentro do ui-router servir as navegaçoes
        '$urlRouterProvider', //presente dentro do ui-router
        function($stateProvider, $urlRouterProvider) { //injeção de dependência do angular
            $stateProvider.state('dashboard', { //criar os estados da aplicação
                url: "/dashboard", //atualizar a url para /dashboard
                templateUrl: "dashboard/dashboard.html" //carregar o template que ta dentro
                    //de dashboard/dashboard.html jogando dentro do ui-view presente dentro do
                    //index.html
            }).state('billingCycle', {
                url: "/billingCycles", //atualiza a url /billingCycles
                templateUrl: "billingCycle/tabs.html" //carregar o template que ta dentro
                    //de billingCycle/tabs.html jogando dentro do ui-view presente dentro do
                    //index.html
            });

            $urlRouterProvider.otherwise('/dashboard'); //estado padrão caso não encontre
            //os estados
        }
    ]);
})();