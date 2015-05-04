'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarTrabajadorController', function(
    $scope, $state, toastr, trabajador, SGDialog){

    $scope.view = {
        trabajador: trabajador
    };

    $scope.desactivar = function(){

        SGDialog.confirm('Desactivar', 'Estas seguro de desactivar permanentemente el trabajador?', function() {
            alert('No se permite desactivar trabajadores');
        });

    };

});

