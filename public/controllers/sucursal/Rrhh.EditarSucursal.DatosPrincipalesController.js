'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarSucursal.DatosPrincipalesController', function($state, $scope, toastr, sucursal){

    $scope.view = {
        sucursal: sucursal,
        sucursalDB: angular.copy(sucursal)
    };

    $scope.save = function(){

        $scope.view.sucursalDB.$save($scope.view.sucursal).then(
            function(response){
                toastr.success('Sucursal actualizada');
                $state.go('rrhh.app.organizacion.editarSucursal.datosPrincipales', {denominacion: $scope.view.sucursal.denominacion});
            },
            function error(err){
                toastr.error(err.data.message);
            }
        );

    };

});