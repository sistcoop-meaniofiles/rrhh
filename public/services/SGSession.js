'use strict';

angular.module('mean.rrhh').factory('SGSession', function(Auth, SGTrabajadorUsuario, SGTrabajador, SGAgencia, SGTrabajadorCaja){

    var auth = {
        sucursal: undefined,
        agencia: undefined,
        trabajadorCaja: undefined,
        caja: undefined
    };

    //cargar trabajador a travez de trabajador usuario
    auth.trabajadorCaja = SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).$object;

    SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).then(function(trabajadorUsuario){

        //cargar agencia y sucursal
        if(trabajadorUsuario.trabajador)
        {
            auth.agencia = SGTrabajador.$new(trabajadorUsuario.trabajador.id).$getAgencia().$object;
            SGTrabajador.$new(trabajadorUsuario.trabajador.id).$getAgencia().then(function(agencia){
                if(agencia)
                {
                    auth.sucursal =  SGAgencia.$new(auth.agencia.id).$getSucursal().$object;
                }
            });
        }

        //cargar caja
        if(trabajadorUsuario.trabajador)
        {
            var tipoDocumento =  trabajadorUsuario.trabajador.tipoDocumento;
            var numeroDocumento =  trabajadorUsuario.trabajador.numeroDocumento;

            auth.caja = SGTrabajadorCaja.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).$object;
        }

    });

    return auth;

});

/*
angular.module('mean.rrhh').run(function(Auth, SGSession, SGTrabajadorUsuario, SGTrabajador, SGAgencia, SGTrabajadorCaja){

    //cargar trabajador a travez de trabajador usuario
    SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).then(function(trabajadorUsuario){
        SGSession.trabajador = angular.isDefined(trabajadorUsuario) ? trabajadorUsuario.trabajador : undefined;

        //cargar agencia y sucursal
        if(SGSession.trabajador)
        {
            SGTrabajador.$new(SGSession.trabajador.id).$getAgencia().then(function(agencia){
                SGSession.agencia = agencia;

                if(SGSession.agencia)
                {
                    SGSession.sucursal =  SGAgencia.$new(SGSession.agencia.id).$getSucursal();
                }

            });
        }

        //cargar caja
        if(SGSession.trabajador)
        {
            var tipoDocumento =  SGSession.trabajador.tipoDocumento;
            var numeroDocumento =  SGSession.trabajador.numeroDocumento;

            SGTrabajadorCaja.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).then(function(trabajadorCaja){
                SGSession.caja = angular.isDefined(trabajadorCaja) ? trabajadorCaja.caja : undefined;
            });
        }

    });

});*/