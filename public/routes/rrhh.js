'use strict';

angular.module('mean.rrhh').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('rrhh', {
          abstract: true,
          url: '/rrhh',
          templateUrl: 'rrhh/views/tpls/layout/body.html'
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
            controller: 'BuscarSucursalController'
        })
        .state('rrhh.app.organizacion.crearSucursal', {
            url: '/crearSucursal',
            templateUrl: 'rrhh/views/sucursal/form-crear-sucursal.html',
            controller: 'CrearSucursalController'
        })
        .state('rrhh.app.organizacion.editarSucursal', {
            url: '/sucursal/:id',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal.html',
            resolve: {
                sucursal: function($state, $stateParams, SGSucursal) {
                    return SGSucursal.$find($stateParams.id);
                }
            },
            controller: 'EditarSucursalController'
        })
        .state('rrhh.app.organizacion.editarSucursal.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-resumen.html',
            controller: 'SucursalResumenController'
        })
        .state('rrhh.app.organizacion.editarSucursal.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-datosPrincipales.html',
            controller: 'SucursalDatosPrincipalesController'
        })

        .state('rrhh.app.organizacion.buscarAgencias', {
            url: '/buscarAgencia',
            templateUrl: 'rrhh/views/agencia/form-buscar-agencia.html',
            controller: 'BuscarAgenciaController'
        })
        .state('rrhh.app.organizacion.crearAgencia', {
            url: '/crearAgencia',
            templateUrl: 'rrhh/views/agencia/form-crear-agencia.html',
            controller: 'CrearAgenciaController'
        })
        .state('rrhh.app.organizacion.editarAgencia', {
            url: '/agencia/:id',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia.html',
            resolve: {
                agencia: function($state, $stateParams, SGAgencia) {
                    return SGAgencia.$find($stateParams.id);
                }
            },
            controller: 'EditarAgenciaController'
        })
        .state('rrhh.app.organizacion.editarAgencia.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia-resumen.html',
            controller: 'AgenciaResumenController'
        })
        .state('rrhh.app.organizacion.editarAgencia.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia-datosPrincipales.html',
            controller: 'AgenciaDatosPrincipalesController'
        })

        .state('rrhh.app.rrhh.buscarTrabajadores', {
            url: '/buscarTrabajador',
            templateUrl: 'rrhh/views/trabajador/form-buscar-trabajador.html',
            controller: 'BuscarTrabajadorController'
        })
        .state('rrhh.app.rrhh.crearTrabajador', {
            url: '/crearTrabajador',
            templateUrl: 'rrhh/views/trabajador/form-crear-trabajador.html',
            controller: 'CrearTrabajadorController'
        })
        .state('rrhh.app.rrhh.editarTrabajador', {
            url: '/trabajador/:id',
            templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-resumen.html',
            resolve: {
                trabajador: function($state, $stateParams, SGTrabajador) {
                    return SGTrabajador.$find($stateParams.id);
                }
            },
            controller: 'EditarTrabajadorController'
        })
        .state('rrhh.app.rrhh.editarTrabajador.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-resumen.html',
            controller: 'TrabajadorResumenController'
        })
        .state('rrhh.app.rrhh.editarTrabajador.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/sucursal/form-editar-trabajador-datosPrincipales.html',
            controller: 'TrabajadorDatosPrincipalesController'
        });
  }
]);