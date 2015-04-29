define(['../module'], function (module) {
    'use strict';

    module.controller('CrearSucursalCtrl', function($scope, $state, Sucursal, Notifications){

        $scope.view = {
            sucursal: Sucursal.$build()
        };

        $scope.submit = function(){
            if ($scope.form.$valid) {
                $scope.view.sucursal.$save().then(
                    function(response){
                        Notifications.success("Sucursal creada.");
                        $state.go('^.^.editarSucursal.resumen', {id: response.id});
                    },
                    function error(error){
                        Notifications.error(error.data.message+".");
                    }
                );
            }
        };

    });
});