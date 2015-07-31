'use strict';
angular.module('backend-module.dashboard2')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.index', {
            url: '',

            templateUrl: 'backend/dashboard/dashboard.html',
            controller: 'DashboardController',
            authenticate: true
        });
    }])
    .controller('DashboardController',
        ['$scope', '$modal', '$timeout',
            function ($scope, $modal, $timeout) {

            }]);