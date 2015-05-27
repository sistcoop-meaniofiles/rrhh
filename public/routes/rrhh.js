'use strict';

angular.module('mean.rrhh').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // Check if user has role
        var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

            // Initialize a new promise
            var deferred = $q.defer();

            // Authenticated
            if (Auth.authz.hasResourceRole(role, 'rrhh')) {
                $timeout(deferred.resolve);
            }

            // Not Authenticated
            else {
                $timeout(deferred.reject);
                //$location.url('/auth/login');
                alert('No tiene los permisos para poder acceder a esta pagina');
            }

            return deferred.promise;
        };

        $urlRouterProvider.when('/rrhh', '/rrhh/config');

        $stateProvider
            .state('rrhh', {
                abstract: true,
                url: '/rrhh',
                templateUrl: 'rrhh/views/_body.html',
                controller: 'RrhhController'
            })
            .state('rrhh.home', {
                url: '/home',
                templateUrl: 'rrhh/views/index.html'
            })

            .state('rrhh.app', {
                url: '/app',
                templateUrl: 'rrhh/views/app.html'
            })

            .state('rrhh.app.organizacion', {
                url: '/organizacion',
                template: '<ui-view></ui-view>'
            })
            .state('rrhh.app.rrhh', {
                url: '/rrhh',
                template: '<ui-view></ui-view>'
            })

            .state('rrhh.app.organizacion.buscarSucursales', {
                url: '/buscarSucursal',
                templateUrl: 'rrhh/views/sucursal/form-buscar-sucursal.html',
                controller: 'Rrhh.BuscarSucursalController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.crearSucursal', {
                url: '/crearSucursal',
                templateUrl: 'rrhh/views/sucursal/form-crear-sucursal.html',
                controller: 'Rrhh.CrearSucursalController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarSucursal', {
                url: '/sucursal/:denominacion',
                templateUrl: 'rrhh/views/sucursal/form-editar-sucursal.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    },
                    sucursal: function ($state, $stateParams, SGSucursal) {
                        return SGSucursal.$find($stateParams.denominacion);
                    }
                },
                controller: 'Rrhh.EditarSucursalController'
            })
            .state('rrhh.app.organizacion.editarSucursal.resumen', {
                url: '/resumen',
                templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-resumen.html',
                controller: 'Rrhh.EditarSucursal.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarSucursal.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-datosPrincipales.html',
                controller: 'Rrhh.EditarSucursal.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })

            .state('rrhh.app.organizacion.buscarAgencias', {
                url: '/buscarAgencia',
                templateUrl: 'rrhh/views/agencia/form-buscar-agencia.html',
                controller: 'Rrhh.BuscarAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-agencias', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.crearAgencia', {
                url: '/crearAgencia',
                templateUrl: 'rrhh/views/agencia/form-crear-agencia.html',
                controller: 'Rrhh.CrearAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-agencias', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarAgencia', {
                url: '/agencia/:id?sucursal',
                templateUrl: 'rrhh/views/agencia/form-editar-agencia.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-agencias', $q, $timeout, $http, $location, Auth)
                    },
                    agencia: function ($state, $stateParams, SGAgencia) {
                        return SGAgencia.$find($stateParams.sucursal, $stateParams.id);
                    },
                    sucursal: function ($state, $stateParams, SGSucursal) {
                        return SGSucursal.$find($stateParams.sucursal);
                    }
                },
                controller: 'Rrhh.EditarAgenciaController'
            })
            .state('rrhh.app.organizacion.editarAgencia.resumen', {
                url: '/resumen',
                templateUrl: 'rrhh/views/agencia/form-editar-agencia-resumen.html',
                controller: 'Rrhh.EditarAgencia.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-agencias', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarAgencia.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'rrhh/views/agencia/form-editar-agencia-datosPrincipales.html',
                controller: 'Rrhh.EditarAgencia.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-agencias', $q, $timeout, $http, $location, Auth)
                    }
                }
            })

            .state('rrhh.app.rrhh.buscarTrabajadores', {
                url: '/buscarTrabajador',
                templateUrl: 'rrhh/views/trabajador/form-buscar-trabajador.html',
                controller: 'Rrhh.BuscarTrabajadorController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.rrhh.crearTrabajador', {
                url: '/crearTrabajador',
                templateUrl: 'rrhh/views/trabajador/form-crear-trabajador.html',
                controller: 'Rrhh.CrearTrabajadorController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador', {
                url: '/trabajador/:id',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth)
                    },
                    trabajador: function ($state, $stateParams, SGTrabajador) {
                        return SGTrabajador.$find($stateParams.id);
                    }
                },
                controller: 'Rrhh.EditarTrabajadorController'
            })
            .state('rrhh.app.rrhh.editarTrabajador.resumen', {
                url: '/resumen',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-resumen.html',
                controller: 'Rrhh.EditarTrabajador.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-datosPrincipales.html',
                controller: 'Rrhh.EditarTrabajador.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador.accesoSistema', {
                url: '/accesoSistema',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-accesoSistema.html',
                controller: 'Rrhh.EditarTrabajador.AccesoSistemaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth)
                    }
                }
            });
    }
]);
