'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('APEDevices')
    .directive('sidebarSearchBackend', function () {
        return {
            templateUrl: 'components/directives/backend/sidebar/sidebar-search/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller: function ($scope) {
                $scope.selectedMenu = 'home';
            }
        }
    });
