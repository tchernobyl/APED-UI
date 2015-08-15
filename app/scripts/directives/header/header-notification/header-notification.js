'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('headerNotification', function () {
        return {
            templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.ameur = 'ameur';
            }
        }
    });


