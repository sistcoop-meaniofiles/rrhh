'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarAgenciaController', function ($scope, $state, sucursal, agencia, toastr) {

    $scope.view = {
        sucursal: sucursal,
        agencia: agencia,
        agenciaDB: angular.copy(agencia)
    };

    $scope.save = function () {

        $scope.view.sucursal.$updateAgencia($scope.view.agenciaDB.denominacion, $scope.view.agencia).then(
            function (response) {
                toastr.success('Agencia actualizada');
                $state.go('^.editarAgencia', {agencia: $scope.view.agencia.denominacion});
            },
            function error(err) {
                toastr.error(err.data.message);
            }
        );

    };

});

