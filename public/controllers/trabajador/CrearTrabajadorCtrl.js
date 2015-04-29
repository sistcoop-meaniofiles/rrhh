define(['../../../module'], function (module) {
    'use strict';

    module.controller('CrearTrabajadorCtrl', function($scope, $state, Sucursal, Agencia, Trabajador, PersonaNatural, TipoDocumento, Notifications){

        $scope.view = {
            trabajador: Trabajador.$build()
        };

        $scope.view.loaded = {
            persona: undefined,
            trabajador: undefined
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined,
            tipoDocumento: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined,
            tipoDocumento: undefined
        };

        $scope.submit = function(){
            if ($scope.form.$valid) {
                if(angular.isUndefined($scope.view.loaded.persona)){
                    Notifications.warn("Debe de seleccionar una persona.");
                    return;
                }
                if(angular.isDefined($scope.view.loaded.trabajador)){
                    Notifications.warn("El trabajador ya fue registrado, no puede continuar.");
                    return;
                }

                $scope.view.trabajador.agencia = $scope.combo.selected.agencia;
                $scope.view.trabajador.tipoDocumento = $scope.combo.selected.tipoDocumento.abreviatura;
                Agencia.$new($scope.combo.selected.agencia.id).$addTrabajador($scope.view.trabajador).then(
                    function(response){
                        Notifications.success("Trabajador creado.");
                        $state.go('^.^.editarTrabajador.resumen', {id: response.id});

                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            }
        };

    });
});
       