'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('EditarTrabajadorController', function($scope, $state, PersonaNatural, Usuario, activeProfile, Notifications, Dialog){

    $scope.view = {
        trabajador: undefined,
        trabajadorDB: undefined
    };

    $scope.view.loaded = {
        persona: undefined,
        userKeycloak: {
            rolesAssigned: []
        }
    };

    $scope.loadParams = function(){
        $scope.view.trabajador = $scope.params.object;
        $scope.view.trabajadorDB = angular.copy($scope.view.trabajador);

        $scope.view.loaded.persona = PersonaNatural.$findByTipoNumeroDocumento($scope.view.trabajador.tipoDocumento, $scope.view.trabajador.numeroDocumento).$object;

        /*if(activeProfile.hasRole('ORGANIZACION', ['ADMIN'], 'OR')){
            Usuario.$roleMappings($scope.params.object.usuario).then(
                function(response){
                    var rolesAvailable = activeProfile.getModule('ORGANIZACION').roles.available;
                    for(var i = 0 ; i < response.realmMappings.length; i++){
                        for(var j = 0 ; j < rolesAvailable.length; j++){
                            if(response.realmMappings[i].name === rolesAvailable[j].rol){
                                $scope.view.loaded.userKeycloak.rolesAssigned.push(rolesAvailable[j].rol);
                                break;
                            }
                        }
                    }
                    if($scope.view.loaded.userKeycloak.rolesAssigned.length === 0){
                        $scope.view.loaded.userKeycloak.rolesAssigned = 'No tiene roles asignados.';
                    }
                },
                function error(err){
                    $scope.view.loaded.userKeycloak.rolesAssigned = 'Usuario no existe en Keycloak.';
                }
            );
        }*/
    };
    $scope.loadParams();

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

    $scope.desactivar = function(){

        if($scope.view.trabajadorDB.estado === false){
            Notifications.info('Trabajador inactivo, no se puede actualizar.');
            return;
        }

        Dialog.confirmDelete('', 'trabajador', function() {
            $scope.view.trabajadorDB.$desactivar().then(
                function(response){
                    Notifications.success('Trabajador desactivado');
                    $state.go('^.^.buscarTrabajador');
                },
                function error(err){
                    Notifications.error(err.data.message+'.');
                }
            );
        });
    };

});

