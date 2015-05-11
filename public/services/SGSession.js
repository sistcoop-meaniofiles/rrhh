'use strict';

angular.module('mean.rrhh').factory('SGSession', function(){

    var auth = {
        sucursal: undefined,
        agencia: undefined,
        trabajador: undefined,
        caja: undefined
    };

    return auth;

});


angular.module('mean.rrhh').run(function(Auth, AuthRrhh, SGTrabajadorUsuario, SGTrabajador, SGAgencia, SGTrabajadorCaja){

    //cargar trabajador a travez de trabajador usuario
    SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).then(function(trabajadorUsuario){
        AuthRrhh.trabajador = angular.isDefined(trabajadorUsuario) ? trabajadorUsuario.trabajador : undefined;

        //cargar agencia y sucursal
        if(AuthRrhh.trabajador)
        {
            SGTrabajador.$new(AuthRrhh.trabajador.id).$getAgencia().then(function(agencia){
                AuthRrhh.agencia = agencia;

                if(AuthRrhh.agencia)
                {
                    AuthRrhh.sucursal =  SGAgencia.$new(AuthRrhh.agencia.id).$getSucursal().$object;
                }

            });
        }

        //cargar caja
        if(AuthRrhh.trabajador)
        {
            var tipoDocumento =  AuthRrhh.trabajador.tipoDocumento;
            var numeroDocumento =  AuthRrhh.trabajador.numeroDocumento;

            SGTrabajadorCaja.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).then(function(trabajadorCaja){
                AuthRrhh.caja = angular.isDefined(trabajadorCaja) ? trabajadorCaja.caja : undefined;
            });
        }

    });

});