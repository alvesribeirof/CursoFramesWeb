//declarando um componente chamado field
(function() {
    //declarando um componente chamado contentHeader
    angular.module('primeiraApp').component('contentHeader', {
        bindings: { //definição dos parâmetros do componente
            name: '@', //string que não se altera
            small: '@' //string que nao se altera
        },
        template: //template que será alimentado pelo componente através da declaração
        //double mustache seguida da referência padrão do componente $ctrl acrescido
        //de variaveis e parametros declarados acima
        //backtick $ctrl - variavel padrão para uso dentro de component
            `
        <section class="content-header">
          <h1>{{ $ctrl.name }} <small>{{ $ctrl.small }}</small></h1>
        </section>
        `
    });
}());