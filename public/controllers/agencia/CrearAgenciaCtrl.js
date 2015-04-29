define(['../../module'], function (module) {
    'use strict';

    var crearAgenciaCtrl = function($scope, $state, Notifications){

        $scope.view = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.combo = {
            sucursal: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined
        };

        $scope.addAgencia = function(){
            if($scope.form.$valid){

                if($scope.combo.selected.sucursal.estado == false){
                    Notifications.info("Sucursal inactiva, no se puede crear agencia.");
                    return;
                }

                $scope.combo.selected.sucursal.$addAgencia($scope.view.agencia).then(
                    function(response){
                        Notifications.success("Agencia creada.");
                        $state.go('^.^.editarAgencia.resumen', {id: response.id});
                    },
                    function error(error){
                        Notifications.error(error.data.message + ".");
                    }
                );
            } else {
                $scope.form.$setSubmitted();
            }
        };

    };

    module.controller('CrearAgenciaCtrl_Admin', function($injector, $scope, $state, Sucursal){
        $injector.invoke(crearAgenciaCtrl, this, {$scope: $scope});
        $scope.loadCombo = function(){
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();
    }).controller('CrearAgenciaCtrl_Gerentegeneral', function($injector, $scope, $state, Sucursal){
        $injector.invoke(crearAgenciaCtrl, this, {$scope: $scope});
        $scope.loadCombo = function(){
            $scope.combo.sucursal = Sucursal.$search().$object;
        };
        $scope.loadCombo();
    }).controller('CrearAgenciaCtrl_Administradorgeneral', function($injector, $rootScope, $scope, Sucursal, sucursal){
        $injector.invoke(crearAgenciaCtrl, this, {$scope: $scope});
        $scope.loadCombo = function(){
            $scope.combo.sucursal = [];
            $scope.combo.sucursal[0] = angular.extend(sucursal, Sucursal.$new(sucursal.id));
            $scope.combo.selected.sucursal = $scope.combo.sucursal[0];
        };
        $scope.loadCombo();
    });

    module.controller('CrearAgenciaFromSucursalCtrl', function($scope, $state, Notifications){

        $scope.view = {
            sucursal: $scope.$parent.view.sucursalDB,
            agencia: undefined
        };

        $scope.addAgencia = function(){
            if($scope.form.$valid){

                if($scope.view.sucursal.estado == false){
                    Notifications.info("Sucursal inactiva, no se puede actualizar.");
                    return;
                }

                $scope.view.sucursal.$addAgencia($scope.view.agencia).then(
                    function(response){
                        Notifications.success("Agencia creada");
                        $state.go('^.^.resumen');
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            } else {
                $scope.form.$setSubmitted();
            }
        };

    });
});
