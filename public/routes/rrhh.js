'use strict';

angular.module('mean.rrhh').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('rrhh', {
          abstract: true,
          url: '/rrhh',
          templateUrl: 'rrhh/views/_body.html'
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
            controller: 'Rrhh.BuscarSucursalController'
        })
        .state('rrhh.app.organizacion.crearSucursal', {
            url: '/crearSucursal',
            templateUrl: 'rrhh/views/sucursal/form-crear-sucursal.html',
            controller: 'Rrhh.CrearSucursalController'
        })
        .state('rrhh.app.organizacion.editarSucursal', {
            url: '/sucursal/:id',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal.html',
            resolve: {
                sucursal: function($state, $stateParams, SGSucursal) {
                    return SGSucursal.$find($stateParams.id);
                }
            },
            controller: 'Rrhh.EditarSucursalController'
        })
        .state('rrhh.app.organizacion.editarSucursal.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-resumen.html',
            controller: 'Rrhh.EditarSucursal.ResumenController'
        })
        .state('rrhh.app.organizacion.editarSucursal.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/sucursal/form-editar-sucursal-datosPrincipales.html',
            controller: 'Rrhh.EditarSucursal.DatosPrincipalesController'
        })

        .state('rrhh.app.organizacion.buscarAgencias', {
            url: '/buscarAgencia',
            templateUrl: 'rrhh/views/agencia/form-buscar-agencia.html',
            controller: 'Rrhh.BuscarAgenciaController'
        })
        .state('rrhh.app.organizacion.crearAgencia', {
            url: '/crearAgencia',
            templateUrl: 'rrhh/views/agencia/form-crear-agencia.html',
            controller: 'Rrhh.CrearAgenciaController'
        })
        .state('rrhh.app.organizacion.editarAgencia', {
            url: '/agencia/:id',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia.html',
            resolve: {
                agencia: function($state, $stateParams, SGAgencia) {
                    return SGAgencia.$find($stateParams.id);
                }
            },
            controller: 'Rrhh.EditarAgenciaController'
        })
        .state('rrhh.app.organizacion.editarAgencia.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia-resumen.html',
            controller: 'Rrhh.EditarAgencia.ResumenController'
        })
        .state('rrhh.app.organizacion.editarAgencia.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/agencia/form-editar-agencia-datosPrincipales.html',
            controller: 'Rrhh.EditarAgencia.DatosPrincipalesController'
        })

        .state('rrhh.app.rrhh.buscarTrabajadores', {
            url: '/buscarTrabajador',
            templateUrl: 'rrhh/views/trabajador/form-buscar-trabajador.html',
            controller: 'Rrhh.BuscarTrabajadorController'
        })
        .state('rrhh.app.rrhh.crearTrabajador', {
            url: '/crearTrabajador',
            templateUrl: 'rrhh/views/trabajador/form-crear-trabajador.html',
            controller: 'Rrhh.CrearTrabajadorController'
        })
        .state('rrhh.app.rrhh.editarTrabajador', {
            url: '/trabajador/:id',
            templateUrl: 'rrhh/views/trabajador/form-editar-trabajador.html',
            resolve: {
                trabajador: function($state, $stateParams, SGTrabajador) {
                    return SGTrabajador.$find($stateParams.id);
                }
            },
            controller: 'Rrhh.EditarTrabajadorController'
        })
        .state('rrhh.app.rrhh.editarTrabajador.resumen', {
            url: '/resumen',
            templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-resumen.html',
            controller: 'Rrhh.EditarTrabajador.ResumenController'
        })
        .state('rrhh.app.rrhh.editarTrabajador.datosPrincipales', {
            url: '/datosPrincipales',
            templateUrl: 'rrhh/views/trabajador/form-editar-trabajador-datosPrincipales.html',
            controller: 'Rrhh.EditarTrabajador.DatosPrincipalesController'
        });
  }
]);
