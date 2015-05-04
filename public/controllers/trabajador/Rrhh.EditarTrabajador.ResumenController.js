'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarTrabajador.ResumenController', function(
    $scope, trabajador, SGAgencia, SGPersonaNatural){

    $scope.view = {
        trabajador: trabajador
    };

    $scope.view.loaded = {
        persona: SGPersonaNatural.$findByTipoNumeroDocumento($scope.view.trabajador.tipoDocumento, $scope.view.trabajador.numeroDocumento).$object,
        agencia: SGAgencia.$find($scope.view.trabajador.agencia.id).$object,
        userKeycloak: {
            rolesAssigned: []
        }
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

            if($scope.view.trabajador.estado === false){
                Notifications.info('Trabajador inactivo, no se puede actualizar.');
                return;
            }

            if(angular.isUndefined($scope.view.loaded.persona)){
                Notifications.warn('Debe de seleccionar una persona.');
                return;
            }
            $scope.view.trabajador.agencia = $scope.combo.selected.agencia;
            $scope.view.trabajador.$save().then(
                function(response){
                    Notifications.success('Trabajador actualizado.');
                    $scope.view.trabajadorDB = angular.copy($scope.view.trabajador);
                },
                function error(err){
                    Notifications.error(err.data.message+'.');
                }
            );
        }
    };


});


