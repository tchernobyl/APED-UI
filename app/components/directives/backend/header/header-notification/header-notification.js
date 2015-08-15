'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('headerNotificationBackend', function () {
        return {
            templateUrl: 'components/directives/backend/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.ameur = 'ameur';
            }
        }
    });


