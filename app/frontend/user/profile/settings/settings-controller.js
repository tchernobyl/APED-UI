angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.settings', {
            url: '/settings',
            templateUrl: 'frontend/user/profile/settings/settings.html',
            controller: 'globalSettingsProfileController',
            resolve: {
                _profile: [
                    'UserUsers',
                    function (UserUsers) {
                        return UserUsers.getList();
                    }
                ]
            }


        });
    }])
    .controller('globalSettingsProfileController',
        ['$scope', '$modal', '_profile'
            , function ($scope, $modal, _profile) {

            $scope.profile = _profile.data;


        }]);
