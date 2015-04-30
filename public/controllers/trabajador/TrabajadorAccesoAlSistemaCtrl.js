'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('TrabajadorAccesoAlSistemaCtrl', function($scope, Usuario, Notifications, Dialog){

    $scope.combo = {
        usuario: undefined
    };
    $scope.combo.selected = {
        usuario: undefined
    };

    $scope.refreshComboUsuario = function(filterText){
        var queryParams = {
            search: filterText,
            first: 0,
            max: 5
        };
        if($scope.combo.usuario){
            $scope.combo.usuario = Usuario.$search(queryParams).$object;
        }
        else {
            queryParams.search = $scope.view.trabajador.usuario;
            $scope.combo.usuario = Usuario.$search(queryParams).$object;
        }
    };

    $scope.desvincular = function(){
        Dialog.confirm('Desvincular', 'Estas seguro de quitar el usuario para el trabajador?', function() {
            $scope.view.trabajador.usuario = undefined;
            $scope.view.trabajador.$save().then(
                function(response){
                    Notifications.success('Trabajador actualizado.');
                    $scope.combo.selected.usuario = undefined;
                    $scope.view.trabajadorDB = angular.copy($scope.view.trabajador);
                },
                function error(err){
                    Notifications.error(err.data.message+'.');
                }
            );
        });
    };

    $scope.setUsuario = function(){
        if ($scope.form.$valid) {
            $scope.view.trabajador.usuario = $scope.combo.selected.usuario.username;
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

       