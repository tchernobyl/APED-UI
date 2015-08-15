'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('APEDevices')
    .directive('sidebarSearchFrontend', function () {
        return {
            templateUrl: 'components/directives/frontend/sidebar/sidebar-search/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller: function ($scope) {
                $scope.selectedMenu = 'home';
            }
        }
    });
