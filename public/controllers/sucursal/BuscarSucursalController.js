'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('BuscarSucursalController', function($scope, $state){

    $scope.filterOptions = {
        filterText: undefined,
        offset: 0,
        limit: 10
    };

    $scope.gridOptions = {
        data: [],
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {field: 'abreviatura', displayName: 'Abreviatura'},
            {field: 'denominacion', displayName: 'Denominacion'},
            {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
            {
                name: 'edit',
                displayName: 'Edit',
                cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
            }
        ]
    };

    $scope.search = function(){
        $scope.gridOptions.data = Sucursal.$search($scope.filterOptions).$object;
    };

    $scope.nuevo = function(){
        $state.go('^.crearSucursal.datosPrincipales');
    };

    $scope.gridActions = {
        edit: function(row){
            $state.go('^.editarSucursal.resumen', {id: row.id});
        }
    };

});