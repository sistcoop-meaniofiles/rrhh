'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.CrearTrabajadorController', function(
    $scope, $state, SGSucursal, SGAgencia, SGTrabajador, SGPersonaNatural, SGTipoDocumento, toastr){

    $scope.view = {
        trabajador: SGTrabajador.$build()
    };

    $scope.view.loaded = {
        persona: undefined,
        trabajador: undefined
    };

    $scope.combo = {
        sucursal: undefined,
        agencia: undefined,
        tipoDocumento: undefined
    };
    $scope.combo.selected = {
        sucursal: undefined,
        agencia: undefined,
        tipoDocumento: undefined
    };

    $scope.loadCombo = function() {
        $scope.combo.tipoDocumento = SGTipoDocumento.$search({tipoPersona: 'natural'}).$object;
        $scope.combo.sucursal = SGSucursal.$search().$object;
        $scope.$watch('combo.selected.sucursal', function(){
            if(angular.isDefined($scope.combo.selected.sucursal)){
                $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
            }
        }, true);
    };
    $scope.loadCombo();

    $scope.check = function($event){
        if(!angular.isUndefined($event)) {
            $event.preventDefault();
        }
        SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.trabajador.numeroDocumento).then(function(response){
            $scope.view.loaded.persona = response;
            if($scope.view.loaded.persona){
                toastr.info('Persona encontrada');
            } else {
                toastr.warning('Persona no encontrada');
            }
        });
        $scope.view.loaded.trabajador = SGTrabajador.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.trabajador.numeroDocumento).$object;
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {
            if(angular.isUndefined($scope.view.loaded.persona)){
                toastr.warning('Debe de seleccionar una persona.');
                return;
            }
            if(angular.isDefined($scope.view.loaded.trabajador.id)){
                toastr.warning('El trabajador ya fue registrado, no puede continuar.');
                return;
            }

            $scope.view.trabajador.tipoDocumento = $scope.combo.selected.tipoDocumento.abreviatura;
            SGAgencia.$new($scope.combo.selected.agencia.id).$addTrabajador($scope.view.trabajador).then(
                function(response){
                    toastr.success('Trabajador creado');
                    $state.go('^.editarTrabajador.resumen', {id: angular.isObject(response) ? response.id : response});
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        }
    };

});
       