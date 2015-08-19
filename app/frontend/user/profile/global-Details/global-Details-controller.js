angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.details', {
            url: '/details',
            templateUrl: 'frontend/user/profile/global-Details/global-Details.html',
            controller: 'globalDetailsProfileController'



        });
    }])
    .controller('globalDetailsProfileController',
        ['$scope', '$modal'
            , function ($scope, $modal) {


        }]);
