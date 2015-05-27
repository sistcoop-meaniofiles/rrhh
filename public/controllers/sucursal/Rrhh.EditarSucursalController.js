'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarSucursalController', function($scope, $state, toastr, SGDialog, sucursal){

    $scope.view = {
        sucursal: sucursal
    };

    $scope.eliminar = function(){

        SGDialog.confirm('Eliminar', '¿Estas seguro de querer eliminar la sucursal?', function(){
            $scope.view.sucursal.$remove().then(
                function(response){
                    toastr.success('Sucursal eliminada');
                    $state.go('rrhh.app.organizacion.buscarSucursales');
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        });

    };

});
