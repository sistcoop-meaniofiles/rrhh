'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('RrhhController', function ($state, $stateParams, $scope, Global, Rrhh, Auth) {

    $scope.global = Global;
    $scope.package = {
        name: 'rrhh'
    };

    function getAccess(role) {
        if (!Auth) {
            return false;
        }

        var rolesSession = Auth.authz.resourceAccess.rrhh.roles;
        if (rolesSession.indexOf(role) != -1) {
            return true;
        }

        return false;
    }

    $scope.session = {
        idSucursal: undefined
    };

    $scope.loadSession = function () {

        var realmAccess = Auth.authz.realmAccess;
        var roles = realmAccess.roles;

        //cargar la sucursal por defecto del usuario
        if (roles.indexOf('ADMIN') != -1) {
            $scope.session.idSucursal = 'master';
        } else {
            $scope.session.idSucursal = 1;
        }

    };
    $scope.loadSession();

    $scope.access = {

        get createRealm() {
            return Auth.user && Auth.user.createRealm;
        },


        get verSucursales() {
            return getAccess('ver-sucursales');
        },
        get verAgencias() {
            return getAccess('ver-agencias')
        },


        get verTrabajadores() {
            return getAccess('ver-trabajadores')
        },
        get administrarSucursales() {
            return getAccess('administrar-sucursales');
        },
        get administrarAgencias() {
            return getAccess('administrar-agencias');
        },
        get administrarTrabajadores() {
            return getAccess('administrar-trabajadores');
        },


        get elminarSucursales() {
            return getAccess('elminar-sucursales');
        },
        get elminarAgencias() {
            return getAccess('elminar-agencias');
        },
        get elminarTrabajadores() {
            return getAccess('elminar-trabajadores');
        }


    };

});
