'use strict';
angular.module('frontend-module.dashboard')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.index', {
            url: '/',

            templateUrl: 'frontend/dashboard/dashboard.html',
            controller: 'DashboardFrontendController',
            authenticate: true
        });
    }])
    .controller('DashboardFrontendController',
        ['$scope', '$modal', '$timeout',
            function ($scope, $modal, $timeout) {


            }]);