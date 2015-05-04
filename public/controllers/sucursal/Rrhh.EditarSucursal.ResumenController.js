'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarSucursal.ResumenController', function($scope, sucursal){

    $scope.view = {
        sucursal: sucursal
    };

    $scope.loadObjects = {
        agencias: []
    };

    $scope.loadAgencias = function(){
        $scope.loadObjects.agencias = $scope.view.sucursal.$getAgencias().$object;
    };
    $scope.loadAgencias();

});
