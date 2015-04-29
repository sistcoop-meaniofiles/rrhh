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
            url: '/app',
            template: '<ui-view></ui-view>'
        })
        .state('rrhh.app.rrhh', {
            url: '/app',
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
        });
  }
]);
