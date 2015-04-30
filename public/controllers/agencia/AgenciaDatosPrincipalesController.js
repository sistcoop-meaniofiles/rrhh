'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('AgenciaDatosPrincipalesController', function($scope, agencia, toastr){

    $scope.view = {
        agencia: agencia
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {

            if($scope.view.agencia.estado === false){
                toastr.info('Agencia inactiva, no se puede actualizar', 'Info');
                return;
            }

            $scope.view.agencia.$save().then(
                function(response){
                    toastr.success('Agencia actualizada', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        }
    };

});
