define(['../module'], function (module) {
    'use strict';

    module.controller('SucursalDatosPrincipalesCtrl', function($scope){

        $scope.refresh = function(){
            if(angular.isDefined($scope.view.sucursalDB))
                $scope.view.sucursal = angular.copy($scope.view.sucursalDB);
        };
        $scope.refresh();

    });

});