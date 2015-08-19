angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.images', {
            url: '/images',
            templateUrl: 'frontend/user/profile/images/images.html',
            controller: 'globalImagesProfileController',
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
    .controller('globalImagesProfileController',
        ['$scope', '$modal', '_profile'
            , function ($scope, $modal, _profile) {

            $scope.profile = _profile.data;


        }]);
