define(['../../../module'], function (module) {
    'use strict';

    var buscarTrabajadorCtrl = function($scope, $state, Agencia, PersonaNatural){

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

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
                {field: 'tipoDocumento', displayName: 'T.Documento'},
                {field: 'numeroDocumento', displayName: 'N.Documento'},
                {field: 'persona.apellidoPaterno', displayName: 'A.Paterno'},
                {field: 'persona.apellidoMaterno', displayName: 'A.Materno'},
                {field: 'persona.nombres', displayName: 'Nombres'},
                {field: 'estado', displayName: 'Estado', cellFilter: 'si_no: "Activo"'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };
        $scope.gridActions = {
            edit: function(row){
                $state.go('^.editarTrabajador.resumen', {id: row.id});
            }
        };
        $scope.nuevo = function(){
            $state.go('^.crearTrabajador.datosPrincipales');
        };
        $scope.search = function(){
            if($scope.combo.selected.sucursal && $scope.combo.selected.agencia){
                Agencia.$new($scope.combo.selected.agencia.id).$getTrabajadores($scope.filterOptions).then(function(response){
                    $scope.gridOptions.data = response;
                    angular.forEach($scope.gridOptions.data, function(row){
                        row.persona = PersonaNatural.$findByTipoNumeroDocumento(row.tipoDocumento, row.numeroDocumento).$object;
                    });
                });
            }
        };

    };

    module.controller('BuscarTrabajadorCtrl_Admin', function($injector, $scope, Sucursal){
        $injector.invoke(buscarTrabajadorCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();

        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('BuscarTrabajadorCtrl_Gerentegeneral', function($injector, $scope, Sucursal){
        $injector.invoke(buscarTrabajadorCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();

        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('BuscarTrabajadorCtrl_Administradorgeneral', function($injector, $rootScope, $scope, Sucursal, sucursal){
        $injector.invoke(buscarTrabajadorCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];;
        };
        $scope.loadCombo();

        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('BuscarTrabajadorCtrl_Administrador', function($injector, $rootScope, $scope, Sucursal, Agencia, sucursal, agencia){
        $injector.invoke(buscarTrabajadorCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];

            $scope.combo.agencia = [];
            $scope.combo.agencia[0] = angular.extend(agencia, Agencia.$new(agencia.id));
            $scope.combo.selected.agencia = $scope.combo.sucursal[0];
        };
        $scope.loadCombo();
    }).controller('BuscarTrabajadorCtrl_Jefecaja', function($injector, $rootScope, $scope, Sucursal, Agencia, sucursal, agencia){
        $injector.invoke(buscarTrabajadorCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];

            $scope.combo.agencia = [];
            $scope.combo.agencia[0] = angular.extend(agencia, Agencia.$new(agencia.id));
            $scope.combo.selected.agencia = $scope.combo.sucursal[0];
        };
        $scope.loadCombo();
    });

});