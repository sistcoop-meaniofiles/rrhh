'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.BuscarTrabajadorController', function(
        $scope, $state, SGSucursal, SGAgencia, SGPersonaNatural) {

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function(){
            $scope.combo.sucursal = SGSucursal.$search().$object;
            $scope.$watch('combo.selected.sucursal', function(){
                if(angular.isDefined($scope.combo.selected.sucursal)){
                    $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
                }
            }, true);
        };
        $scope.loadCombo();

        $scope.filterOptions = {
            filterText: undefined,
            firstResult: 0,
            maxResults: 10
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            columnDefs: [
                {field: 'tipoDocumento', displayName: 'T.documento'},
                {field: 'numeroDocumento', displayName: 'Num.documento'},
                {field: 'persona.apellidoPaterno', displayName: 'A.Paterno'},
                {field: 'persona.apellidoMaterno', displayName: 'A.Materno'},
                {field: 'persona.nombres', displayName: 'Nombres'},
                {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.search = function(){
            if($scope.combo.selected.sucursal && $scope.combo.selected.agencia){
                SGAgencia.$new($scope.combo.selected.agencia.id).$getTrabajadores($scope.filterOptions).then(function(response){
                    $scope.gridOptions.data = response;
                    angular.forEach($scope.gridOptions.data, function(row){
                        row.persona = SGPersonaNatural.$findByTipoNumeroDocumento(row.tipoDocumento, row.numeroDocumento).$object;
                    });
                });
            }
        };

        $scope.nuevo = function(){
            $state.go('^.crearTrabajador');
        };

        $scope.gridActions = {
            edit: function(row){
                $state.go('^.editarTrabajador.resumen', {id: row.id});
            }
        };

    }
);