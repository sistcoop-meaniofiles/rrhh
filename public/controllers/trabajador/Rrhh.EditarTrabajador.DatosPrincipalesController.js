'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarTrabajador.DatosPrincipalesController',
    function($scope, trabajador, SGPersonaNatural, SGSucursal, SGAgencia) {

        $scope.view = {
            trabajador: trabajador
        };

        $scope.view.loaded = {
            persona: SGPersonaNatural.$findByTipoNumeroDocumento($scope.view.trabajador.tipoDocumento, $scope.view.trabajador.numeroDocumento).$object,
            agencia: SGAgencia.$find($scope.view.trabajador.agencia.id).$object
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function() {
            $scope.combo.sucursal = SGSucursal.$search().$object;
            $scope.$watch('combo.selected.sucursal', function(){
                if(angular.isDefined($scope.combo.selected.sucursal)){
                    $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
                }
            }, true);
        };
        $scope.loadCombo();

        $scope.submit = function(){

            if ($scope.form.$valid) {
               alert('todavia no esta funcionando');
            }

        };

    }

);