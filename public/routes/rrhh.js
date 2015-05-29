'use strict';

angular.module('mean.rrhh').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'rrhh';

        // Check if user has role
        var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

            // Initialize a new promise
            var deferred = $q.defer();

            // Authenticated
            if (Auth.authz.hasResourceRole(role, moduleName)) {
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

        // Get session sucursal
        var getSucursalesAutorizadasParaAdministrarTrabajadores = function ($q, $timeout, $http, $location, Auth, SGSucursal) {
            if (Auth.authz.hasResourceRole('administrar-trabajadores', moduleName)) {
                return SGSucursal.$search();
            } else if(Auth.authz.hasResourceRole('administrar-trabajadores-agencia', moduleName)){
                return SGSucursal.$find(Auth.sistcoop.sucursal);
            } else {
                return undefined;
            }
        };
        // Get session agencia
        var getAgenciasAutorizadasParaAdministrarTrabajadores = function ($q, $timeout, $http, $location, Auth, SGAgencia) {
            if (Auth.authz.hasResourceRole('administrar-trabajadores', moduleName)) {
                return undefined;
            } else if(Auth.authz.hasResourceRole('administrar-trabajadores-agencia', moduleName)){
                return SGAgencia.$find(Auth.sistcoop.sucursal, Auth.sistcoop.agencia);
            } else {
                return undefined;
            }
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
                url: '/sucursal/:sucursal',
                templateUrl: 'rrhh/views/sucursal/form-editar-sucursal.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    },
                    sucursal: function ($state, $stateParams, SGSucursal) {
                        return SGSucursal.$find($stateParams.sucursal);
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
            .state('rrhh.app.organizacion.editarSucursal.agencias', {
                url: '/agencias',
                template: '<ui-view></ui-view>'
            })
            .state('rrhh.app.organizacion.editarSucursal.agencias.buscarAgencias', {
                url: '/buscarAgencias',
                templateUrl: 'rrhh/views/sucursal/agencia/form-buscar-agencia.html',
                controller: 'Rrhh.BuscarAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarSucursal.agencias.crearAgencia', {
                url: '/crearAgencia',
                templateUrl: 'rrhh/views/sucursal/agencia/form-crear-agencia.html',
                controller: 'Rrhh.CrearAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.organizacion.editarSucursal.agencias.editarAgencia', {
                url: '/editarAgencia/:agencia',
                templateUrl: 'rrhh/views/sucursal/agencia/form-editar-agencia-datosPrincipales.html',
                controller: 'Rrhh.EditarAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth)
                    },
                    agencia: function ($state, $stateParams, sucursal, SGSucursal) {
                        return SGSucursal.$new($stateParams.sucursal).$findAgencia($stateParams.agencia);
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
                    },
                    sucursales: function($q, $timeout, $http, $location, Auth, SGSucursal){
                        return getSucursalesAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGSucursal);
                    },
                    agencias: function($q, $timeout, $http, $location, Auth, SGAgencia){
                        return getAgenciasAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGAgencia);
                    }
                }
            })
            .state('rrhh.app.rrhh.crearTrabajador', {
                url: '/crearTrabajador',
                templateUrl: 'rrhh/views/trabajador/form-crear-trabajador.html',
                controller: 'Rrhh.CrearTrabajadorController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth)
                    },
                    sucursales: function($q, $timeout, $http, $location, Auth, SGSucursal){
                        return getSucursalesAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGSucursal);
                    },
                    agencias: function($q, $timeout, $http, $location, Auth, SGAgencia){
                        return getAgenciasAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGAgencia);
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador', {
                url: '/trabajador/:id',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth)
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
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth)
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-datosPrincipales.html',
                controller: 'Rrhh.EditarTrabajador.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth)
                    },
                    sucursales: function($q, $timeout, $http, $location, Auth, SGSucursal){
                        return getSucursalesAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGSucursal);
                    },
                    agencias: function($q, $timeout, $http, $location, Auth, SGAgencia){
                        return getAgenciasAutorizadasParaAdministrarTrabajadores($q, $timeout, $http, $location, Auth, SGAgencia);
                    }
                }
            })
            .state('rrhh.app.rrhh.editarTrabajador.accesoSistema', {
                url: '/accesoSistema',
                templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-accesoSistema.html',
                controller: 'Rrhh.EditarTrabajador.AccesoSistemaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('administrar-trabajadores', $q, $timeout, $http, $location, Auth)
                    }
                }
            });
    }
]);
