//declarando um componente chamado valueBox
(function() {
    angular.module('primeiraApp').component('valueBox', {
        bindings: { //definição dos parâmetros do componente
            grid: '@', //string que não se altera
            colorClass: '@',
            value: '@', //binding @ suporta variaveis como passagem de parametros
            text: '@',
            iconClass: '@',
        },
        controller: [ //controller para inserir comportamentos dentro do componente
            'gridSystem', //presente dentro do gridSystemFactory.js
            function(gridSystem) { //injeção de dependência
                //recebendo como parametro a proria grid declarada acima e atribuindo a
                //uma nova variavel criada dentro do this chamada gridClasses
                this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid);
                //a linha acima será executado somente após a inicialização dos binding
            }
        ],
        template: //template que será alimentado pelo componente através da declaração
        //double mustache seguida da referência padrão do componente $ctrl acrescido
        //de variaveis e parametros declarados acima
            `
        <div class="{{ $ctrl.gridClasses }}">
          <div class="small-box {{ $ctrl.colorClass }}">
            <div class="inner">
              <h3>{{ $ctrl.value }}</h3>
              <p>{{ $ctrl.text}}</p>
            </div>
            <div class="icon">
              <i class="fa {{ $ctrl.iconClass }}"></i>
            </div>
          </div>
        </div>
        `
    });
}());