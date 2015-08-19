angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.settings', {
            url: '/settings',
            templateUrl: 'frontend/user/profile/settings/settings.html',
            controller: 'globalSettingsProfileController'



        });
    }])
    .controller('globalSettingsProfileController',
        ['$scope', '$modal'
            , function ($scope, $modal) {

            console.log($scope.profile)


        }]);
