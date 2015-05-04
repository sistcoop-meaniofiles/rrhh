'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarAgenciaController', function($scope, $state, SGDialog, agencia){

    $scope.view = {
        agencia: agencia
    };

    $scope.desactivar = function(){
        SGDialog.confirm('Desactivar', '¿Estas seguro de querer desactivar la agencia?', function(){
            alert('No esta permitido desactivar agencias');
        });
    };

});

