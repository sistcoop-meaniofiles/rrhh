define(['../module'], function (module) {
    'use strict';

    module.controller('EditarSucursalCtrl', function($scope, $state, Dialog, Notifications){

        $scope.view = {
            sucursal: undefined,
            sucursalDB: undefined
        };

        $scope.loadParams = function(){
            $scope.view.sucursal = $scope.params.object;
            $scope.view.sucursalDB = angular.copy($scope.params.object);
        };
        $scope.loadParams();

        $scope.submit = function(){
            if ($scope.form.$valid) {

                if($scope.view.sucursal.estado == false){
                    Notifications.info("Sucursal inactiva, no se puede actualizar.");
                    return;
                }

                $scope.view.sucursal.$save().then(
                    function(response){
                        Notifications.success("Sucursal actualizada");
                        $scope.view.sucursalDB = angular.copy($scope.view.sucursal);
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            }
        };

        $scope.desactivar = function(){
            if($scope.view.sucursalDB.estado == false){
                Notifications.info("Sucursal inactiva, no se puede actualizar.");
                return;
            }

            Dialog.confirmDelete($scope.view.sucursalDB.denominacion, 'sucursal', function() {
                $scope.view.sucursalDB.$desactivar().then(
                    function(response){
                        Notifications.success("Sucursal desactivada");
                        $state.go('^.^.buscarSucursal');
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            });
        };

    });
});