'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('SucursalDatosPrincipalesController', function($scope, toastr, sucursal){

    $scope.view = {
        sucursal: sucursal
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {

            if($scope.view.sucursal.estado === false){
                toastr.info('Sucursal inactiva, no se puede actualizar', 'Info');
                return;
            }

            $scope.view.sucursal.$save().then(
                function(response){
                    toastr.success('Sucursal actualizada', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        }
    };

});