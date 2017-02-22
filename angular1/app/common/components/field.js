//declarando um componente chamado field
(function() {
    angular.module('primeiraApp').component('field', {
        bindings: { //definição dos parâmetros do componente
            id: '@', //string que não altera
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=', //binding de duas direções onde as alterações do component reflete no controller e vice-versa
            readonly: '<', //binding unidirecional ou seja a alteração feita no componente nao vai refletir no parent
        },
        controller: [ //controller para inserir comportamentos dentro do componente
            'gridSystem', //presente dentro do gridSystemFactory.js
            function(gridSystem) { //injeção de dependência
                //recebendo como parametro a proria grid declarada acima e atribuindo a
                //uma nova variavel criada dentro do this chamda gridClasses
                this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid);
                //a linha acima será executado somente após a inicialização dos binding
            }
        ],
        template: //template que será alimentado pelo componente através da declaração
        //double mustache seguida da referência padrão do componente $ctrl acrescido
        //de variaveis e parametros declarados acima
            `
        <div class="{{ $ctrl.gridClasses }}">
            <div class="form-group">
                <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
                <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" 
                type="{{ $ctrl.type }}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly" />
            </div>
        </div>
        `
    });
})();