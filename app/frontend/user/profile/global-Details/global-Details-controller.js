angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.details', {
            url: '/details',
            templateUrl: 'frontend/user/profile/global-Details/global-Details.html',
            controller: 'globalDetailsProfileController',
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
    .controller('globalDetailsProfileController',
        ['$scope', '$modal', '_profile'
            , function ($scope, $modal, _profile) {

            $scope.profile = _profile.data;


        }]);
