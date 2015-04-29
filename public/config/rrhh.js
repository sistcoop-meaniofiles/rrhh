'use strict';

/* jshint -W098 */

angular.module('mean.rrhh').controller('RrhhSidebarController', ['$scope', '$menuItemsRrhh',
    function($scope, $menuItemsRrhh) {

        $scope.menuItems = $menuItemsRrhh.prepareSidebarMenu().getAll();

    }
]);