//declarando um componente chamado paginator
(function() {
    angular.module('primeiraApp').component('paginator', {
        bindings: { //definição dos parâmetros do componente
            url: '@',
            pages: '@',
        },
        controller: [ //controller para inserir comportamentos dentro do componente
            '$location', //ler os parametros da URL
            function($location) { //injeção de dependência
                //a linha acima será executado somente após a inicialização dos binding
                this.$onInit = () => {
                    //declaração da const pages que transforma o valor recebido na url no inteiro 
                    const pages = parseInt(this.pages) || 1; //caso o valor nao foi passado o padrão será 1

                    //criando o array de 5 posições e atrinuido ao pagesArray 
                    this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1);
                };

                //elemento corrente recebe a pagina atual, caso nao tenha assume 1
                this.current = parseInt($location.search().page) || 1;

                //caso exista mais de uma página mostre o paginador
                this.needPagination = this.pages > 1;

                //caso exista mais de uma página mostre o botao anterior
                this.hasPrev = this.current > 1;

                //caso já esteja na ultima página não mostre o botão proximo
                this.hasNext = this.current < this.pages;

                //verifica se o elemento i é o elemento atual ou não 
                this.isCurrent = function(i) {
                    return this.current == i; //retorna true ou false
                };

            }
        ],
        template: //verifica se precisa de paginador 
        //e se a página atual é maior que 1 para mostrar o link Anterior
        //se o indice for o elemento atual será usado para percorrer o array 
        //de indices de paginas no ng-repeat criando o array de páginas
        //onde será criando um link para a página mostrando o indice dessa página
        //se o indice atual for menor que a quantidade de pagina mostrará o link Próximo
        //e criará o link para a proxima página
            `
        <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
            <li ng-if="$ctrl.hasPrev">
                <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1 }}">Anterior</a>
            </li>

            <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
                <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
            </li>

            <li ng-if="$ctrl.hasNext">
                <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">Próximo</a>
            </li>
        </ul>
        `
    });
})();