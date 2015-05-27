'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarAgenciaController', function ($scope, $state, SGDialog, sucursal, agencia, toastr) {

    $scope.view = {
        agencia: agencia,
        agenciaDB: angular.copy(agencia)
    };

    $scope.desactivar = function () {
        SGDialog.confirm('Desactivar', '¿Estas seguro de querer desactivar la agencia?', function () {
            alert('No esta permitido desactivar agencias');
        });
    };

    $scope.save = function () {

        $scope.view.agenciaDB.$save(sucursal.denominacion, $scope.view.agencia).then(
            function (response) {
                toastr.success('Agencia actualizada');
            },
            function error(err) {
                toastr.error(err.data.message);
            }
        );

    };

});

