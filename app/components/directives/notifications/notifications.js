'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('notifications', function () {
        return {
            templateUrl: 'components/directives/notifications/notifications.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.ameur = 'oumayma';
            }
        }
    });


