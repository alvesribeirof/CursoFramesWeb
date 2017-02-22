//factory que recebe um conjunto de números e transforma em um conjunto de
//classes do bootstrap
(function() {
    angular.module('primeiraApp').factory('gridSystem', [function() {

        function toCssClasses(numbers) {
            const cols = numbers ? numbers.split('') : []; //constante que recebe uma
            //operação ternária para a variavel numbers

            //declarando uma variavel vazia chamada classes
            let classes = '';

            //inserindo na variavel classes o valor col-xs- interpolado com o numero
            //passado pela aplicação ex: 12 ficaria col-xs-12
            if (cols[0]) classes += ` col-xs-${cols[0]}`;
            //inserindo na variavel classes o valor col-sm- interpolado com o numero
            //passado pela aplicação ex: 6 ficaria col-sm-6
            if (cols[1]) classes += ` col-sm-${cols[1]}`;
            //inserindo na variavel classes o valor col-md- interpolado com o numero
            //passado pela aplicação ex: 4 ficaria col-md-4
            if (cols[2]) classes += ` col-md-${cols[2]}`;
            //inserindo na variavel classes o valor col-lg- interpolado com o numero
            //passado pela aplicação ex: 2 ficaria col-lg-2
            if (cols[3]) classes += ` col-lg-${cols[3]}`;

            return classes;
        }

        return { toCssClasses }; //factory sempre devolve um objeto
    }]);
}());