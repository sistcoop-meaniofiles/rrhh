'use strict';

angular.module('mean.rrhh').factory('SGSession', function(Auth, SGTrabajadorUsuario, SGTrabajador, SGAgencia, SGTrabajadorCaja){

    var auth = {
        sucursal: undefined,
        agencia: undefined,
        trabajador: undefined,
        caja: undefined
    };

    //cargar trabajador a travez de trabajador usuario
    SGTrabajadorUsuario.$findByUsuario(Auth.authz.idTokenParsed.preferred_username).then(function(trabajadorUsuario){
        auth.trabajador = angular.isDefined(trabajadorUsuario) ? trabajadorUsuario.trabajador : undefined;

        //cargar agencia y sucursal
        if(auth.trabajador)
        {
            SGTrabajador.$new(auth.trabajador.id).$getAgencia().then(function(agencia){
                auth.agencia = agencia;

                if(auth.agencia)
                {
                    auth.sucursal =  SGAgencia.$new(auth.agencia.id).$getSucursal();
                }

            });
        }

        //cargar caja
        if(auth.trabajador)
        {
            var tipoDocumento =  auth.trabajador.tipoDocumento;
            var numeroDocumento =  auth.trabajador.numeroDocumento;

            SGTrabajadorCaja.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).then(function(trabajadorCaja){
                auth.caja = angular.isDefined(trabajadorCaja) ? trabajadorCaja.caja : undefined;
            });
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