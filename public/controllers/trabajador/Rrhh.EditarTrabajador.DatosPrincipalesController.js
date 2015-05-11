'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarTrabajador.DatosPrincipalesController',
    function($scope, trabajador, SGPersonaNatural, SGSucursal, SGAgencia, toastr) {

        $scope.view = {
            trabajador: trabajador
        };

        $scope.view.loaded = {
            persona: undefined,
            sucursal: undefined,
            agencia: undefined,
            id : 2
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
                    $scope.combo.selected.agencia = undefined;
                }
            }, true);
        };
        $scope.loadCombo();

        $scope.loadPersona = function(){
            var tipoDocumento = $scope.view.trabajador.tipoDocumento;
            var numeroDocumento = $scope.view.trabajador.numeroDocumento;
            $scope.view.loaded.persona = SGPersonaNatural.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).$object;
        };
        $scope.loadPersona();

        $scope.loadAgenciaSucursal = function(){
            var agenciaId = $scope.view.trabajador.agencia.id;
            SGAgencia.$find(agenciaId).then(function(response){
                $scope.view.loaded.agencia = response;
                $scope.view.loaded.sucursal = response.sucursal;
            });
        };
        $scope.loadAgenciaSucursal();

        $scope.submit = function(){

            if ($scope.form.$valid) {

                var trabajajador = {};
                angular.extend( trabajajador,
                    $scope.view.trabajador,
                    {
                        agencia: {
                            id: $scope.combo.selected.agencia.id,
                            codigo: $scope.combo.selected.agencia.codigo
                        }
                    }
                );

                trabajajador.$save().then(
                    function(response){
                        toastr.success('Trabajador actualizado satisfactoriamente');
                    },
                    function error(err){
                        toastr.error(err.data.message);
                    }
                );

            }

        };

    }

);