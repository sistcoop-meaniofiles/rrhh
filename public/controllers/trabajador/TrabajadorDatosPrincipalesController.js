'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('TrabajadorDatosPrincipalesController', ['$scope', 'Global', 'Rrhh',
    function($scope, Global, Rrhh) {
        $scope.global = Global;
        $scope.package = {
            name: 'rrhh'
        };
    }
]);