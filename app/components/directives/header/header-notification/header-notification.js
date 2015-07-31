'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('headerNotification', function () {
        return {
            templateUrl: 'components/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.ameur = 'ameur';
            }
        }
    });


