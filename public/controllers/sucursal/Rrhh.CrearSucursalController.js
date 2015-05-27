'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.CrearSucursalController', function ($scope, $state, SGSucursal, toastr) {

    $scope.view = {
        sucursal: SGSucursal.$build()
    };

    $scope.save = function () {
        $scope.view.sucursal.$save().then(
            function (response) {
                toastr.success('Sucursal creada satisfactoriamente');
                $state.go('^.editarSucursal.resumen', {sucursal: $scope.view.sucursal.denominacion});
            },
            function error(err) {
                toastr.error(err.data.message);
            }
        );
    };

});