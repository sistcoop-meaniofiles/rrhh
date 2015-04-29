define(['../module'], function (module) {
    'use strict';

    module.controller('SucursalDesactivarCtrl', function($scope, Agencia, Caja){

        $scope.validation = {
            objects: []
        };

        $scope.verificar = function(){

            $scope.view.sucursal.$getAgencias().then(
                function(agencias){

                    angular.forEach(agencias, function(agencia, indexAgencia){

                        var error = {
                            agencia: undefined,
                            bovedas: {
                                abierto: [],
                                saldo: []
                            },
                            cajas: {
                                abierto: [],
                                saldo: []
                            }
                        };
                        error.agencia = agencia;
                        $scope.validation.objects.push(error);


                        Agencia.$new(agencia.id).$getBovedas().then(
                            function(bovedas){
                                angular.forEach(bovedas, function(boveda){
                                    if(boveda.abierto == true){
                                        $scope.validation.objects[indexAgencia].bovedas.abierto.push(boveda);
                                    }
                                    if(boveda.saldo != 0){
                                        $scope.validation.objects[indexAgencia].bovedas.saldo.push(boveda);
                                    }
                                });
                            }, function error(){

                            }
                        );


                        Agencia.$new(agencia.id).$getCajas().then(
                            function(cajas){
                                angular.forEach(cajas, function(caja, indexCaja){
                                    if(caja.abierto == true){
                                        $scope.validation.objects[indexAgencia].cajas.abierto.push(caja);
                                    }
                                    Caja.$new(caja.id).$getBovedasCaja().then(
                                        function(bovedaCajas){
                                            angular.forEach(bovedaCajas, function(bovedaCaja, indexBovedaCaja){
                                                if(bovedaCaja.saldo != 0){
                                                    $scope.validation.objects[indexAgencia].cajas.saldo.push(bovedaCaja);
                                                }
                                            });
                                        }, function error(){

                                        }
                                    );
                                });
                            }, function error(){

                            }
                        );

                    });

                },
                function error(response){

                }
            );

        };

    });

});