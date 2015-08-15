'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('timeline', function () {
        return {
            templateUrl: 'scripts/directives/timeline/timeline.html',
            restrict: 'E',
            replace: true
        }
    });
