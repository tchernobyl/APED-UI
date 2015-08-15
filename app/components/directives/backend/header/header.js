'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('headerBackend', function () {
        return {
            templateUrl: 'components/directives/backend/header/header.html',
            restrict: 'E',
            replace: true,
        }
    });


