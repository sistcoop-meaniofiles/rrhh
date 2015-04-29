define(['../../module'], function (module) {
    'use strict';

    module.controller('AgenciaDatosPrincipalesCtrl', function($scope){

        $scope.refresh = function(){
            if(angular.isDefined($scope.view.agenciaDB))
                $scope.view.agencia = angular.copy($scope.view.agenciaDB);
        };
        $scope.refresh();

    });
});