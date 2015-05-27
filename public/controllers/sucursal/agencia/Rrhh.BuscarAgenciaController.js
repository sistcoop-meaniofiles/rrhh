'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.BuscarAgenciaController', function ($scope, $state, sucursal) {

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

    $scope.edit = function (row) {
        $state.go('^.editarAgencia', {denominacion: row.denominacion});
    };

});