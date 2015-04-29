define(['../../module'], function (module) {
    'use strict';

    module.controller('EditarAgenciaCtrl', function($scope, $state, Notifications, Dialog){

        $scope.view = {
            agencia: undefined,
            agenciaDB: undefined
        };

        $scope.loadParams = function(){
            $scope.view.agencia = $scope.params.object;
            $scope.view.agenciaDB = angular.copy($scope.params.object);
        };
        $scope.loadParams();

        $scope.submit = function(){
            if ($scope.form.$valid) {

                if($scope.view.agencia.estado == false){
                    Notifications.info("Agencia inactiva, no se puede actualizar.");
                    return;
                }

                $scope.view.agencia.$save().then(
                    function(response){
                        Notifications.success("Agencia actualizada");
                        $scope.view.agenciaDB = angular.copy($scope.view.agencia);
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            }
        };

        $scope.desactivar = function(){

            if($scope.view.agenciaDB.estado == false){
                Notifications.info("Agencia inactiva, no se puede actualizar.");
                return;
            }

            Dialog.confirmDelete($scope.view.agenciaDB.denominacion, 'agencia', function() {
                $scope.view.agenciaDB.$desactivar().then(
                    function(response){
                        Notifications.success("Agencia desactivada");
                        $state.go('^.^.buscarAgencia');
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            });
        };

    });
});

