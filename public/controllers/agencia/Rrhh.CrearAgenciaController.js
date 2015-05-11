'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.CrearAgenciaController', function($scope, $state, toastr, SGSucursal, SGAgencia){

    $scope.view = {
        agencia: SGAgencia.$build()
    };

    $scope.combo = {
        sucursal: undefined
    };
    $scope.combo.selected = {
        sucursal: undefined
    };

    $scope.loadCombo = function(){
        $scope.combo.sucursal = SGSucursal.$search().$object;
    };
    $scope.loadCombo();

    $scope.submit = function(){
        if($scope.form.$valid){

            $scope.combo.selected.sucursal.$addAgencia($scope.view.agencia).then(
                function(response){
                    toastr.success('Agencia creada');
                    $state.go('^.editarAgencia.resumen', {id: angular.isObject(response) ? response.id : response});
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );

        }
    };

});