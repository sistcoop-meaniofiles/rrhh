'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('CrearSucursalController', function($scope, $state, SGSucursal, toastr){

    $scope.view = {
        sucursal: SGSucursal.$build()
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {
            $scope.view.sucursal.$save().then(
                function(response){
                    toastr.success('Sucursal creada', 'Success');
                    $state.go('^.editarSucursal.resumen', {id: response.id});
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        }
    };

});