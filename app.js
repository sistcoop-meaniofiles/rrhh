'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rrhh = new Module('rrhh');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rrhh.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Rrhh.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Rrhh.menus.add({
    title: 'Rrhh',
    link: 'rrhh.app',
    roles: ['all'],
    menu: 'main'
  });
  
  //Rrhh.aggregateAsset('css', 'rrhh.css');

  return Rrhh;
});
