define(['../../../module'], function (module) {
    'use strict';

    var trabajadorDatosPrincipalesCtrl = function($scope, $state, Trabajador, PersonaNatural, Notifications){

        $scope.refresh = function(){
            if(angular.isDefined($scope.view.trabajadorDB)){
                $scope.view.trabajador = angular.copy($scope.view.trabajadorDB);
            }
        };
        $scope.refresh();

        $scope.check = function($event){
            if(!angular.isUndefined($event))
                $event.preventDefault();
            if(!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.trabajador.numeroDocumento)){
                PersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.trabajador.numeroDocumento).then(function(data){
                    if(!data){
                        Notifications.warn("Persona no encontrada.");
                        $scope.view.loaded.persona = undefined;
                    } else {
                        $scope.view.loaded.persona = data;
                    }
                });

                Trabajador.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.trabajador.numeroDocumento).then(function(data){
                    if(data){
                        Notifications.warn("El trabajador ya fue registrado, no puede continuar.");
                        $scope.view.loaded.trabajador = data;
                    } else {
                        $scope.view.loaded.trabajador = undefined;
                    }
                });
            }
        };

        $scope.addPersona = function(){
            $state.go('app.common.administracion.personas.crearPersonaNatural.datosPrincipales');
        };

    };

    module.controller('TrabajadorDatosPrincipalesCtrl_Admin', function($injector, $scope, Sucursal, TipoDocumento){
        $injector.invoke(trabajadorDatosPrincipalesCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.tipoDocumento = TipoDocumento.$search({tipoPersona: 'natural'}).$object
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();
        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('TrabajadorDatosPrincipalesCtrl_Gerentegeneral', function($injector, $scope, Sucursal, TipoDocumento){
        $injector.invoke(trabajadorDatosPrincipalesCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.tipoDocumento = TipoDocumento.$search({tipoPersona: 'natural'}).$object
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();
        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('TrabajadorDatosPrincipalesCtrl_Administradorgeneral', function($injector, $rootScope, $scope, TipoDocumento, Sucursal, sucursal){
        $injector.invoke(trabajadorDatosPrincipalesCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.tipoDocumento = TipoDocumento.$search({tipoPersona: 'natural'}).$object

            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];
        };
        $scope.loadCombo();
        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    }).controller('TrabajadorDatosPrincipalesCtrl_Administrador', function($injector, $rootScope, $scope, TipoDocumento, Sucursal, Agencia, sucursal, agencia){
        $injector.invoke(trabajadorDatosPrincipalesCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.tipoDocumento = TipoDocumento.$search({tipoPersona: 'natural'}).$object

            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];

            $scope.combo.agencia = [];
            $scope.combo.agencia[0] = angular.extend(agencia, Agencia.$new(agencia.id));
            $scope.combo.selected.agencia = $scope.combo.sucursal[0];
        };
        $scope.loadCombo();
    }).controller('TrabajadorDatosPrincipalesCtrl_Jefecaja', function($injector, $rootScope, $scope, TipoDocumento,  Sucursal, Agencia, sucursal, agencia){
        $injector.invoke(trabajadorDatosPrincipalesCtrl, this, {$scope: $scope});

        $scope.loadCombo = function(){
            $scope.combo.tipoDocumento = TipoDocumento.$search({tipoPersona: 'natural'}).$object

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
       