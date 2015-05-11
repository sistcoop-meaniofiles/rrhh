'use strict';

angular.module('mean.rrhh').factory('AuthRrhh', function(){

    var auth = {
        sucursal: undefined,
        agencia: undefined,
        trabajador: undefined
    };

    return auth;

});


angular.module('mean.rrhh').run(function(Auth, AuthRrhh, SGTrabajadorUsuario, SGTrabajador, SGAgencia){

    //cargar trabajador a travez de trabajador usuario
    SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).then(function(trabajadorUsuario){
        AuthRrhh.trabajador = trabajadorUsuario.trabajador;

        //cargar agencia y sucursal
        SGTrabajador.$new(AuthRrhh.trabajador.id).$getAgencia().then(function(agencia){
            AuthRrhh.agencia = agencia;
            AuthRrhh.sucursal =  SGAgencia.$new(AuthRrhh.agencia.id).$getSucursal().$object;
        });
    });

});