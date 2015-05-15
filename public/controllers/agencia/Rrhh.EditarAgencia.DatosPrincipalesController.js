'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.EditarAgencia.DatosPrincipalesController',
    function ($scope, sucursal, agencia, toastr) {

        $scope.view = {
            sucursal: sucursal,
            agencia: agencia
        };

        $scope.save = function () {

            if ($scope.view.agencia.estado === false) {
                toastr.info('Agencia inactiva, no se puede actualizar');
                return;
            }

            $scope.view.agencia.$save($scope.view.sucursal.id).then(
                function (response) {
                    toastr.success('Agencia actualizada');
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );

        };

    }
);
