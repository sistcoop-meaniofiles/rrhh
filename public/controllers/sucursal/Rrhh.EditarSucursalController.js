'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarSucursalController', function($scope, $state, SGDialog, sucursal){

    $scope.view = {
        sucursal: sucursal
    };

    $scope.desactivar = function(){
        SGDialog.confirm('Desactivar', '¿Estas seguro de querer desactivar la sucursal?', function(){
            alert('No esta permitido desactivar sucursales');
        });
    };

});
