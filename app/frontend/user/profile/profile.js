angular.module('frontend-module.user.profile', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile', {
            url: '/profile',
            templateUrl: 'frontend/user/profile/profile.html',
            controller: 'ProfileController',
            resolve: {
                _profile: [
                    'UserUsers',
                    function (UserUsers) {
                        return UserUsers.one(1).get({expand: "images"});

                    }
                ]
            }


        });
    }])
    .controller('ProfileController',
        ['$scope', '$modal', '_profile'
            , function ($scope, $modal, _profile) {

            $scope.profile = _profile.data;

            $scope.saveProfile = function () {

                $scope.profile.save().then(function () {

                    console.log("successes ")
                }, function () {
                    console.log("error ")
                });
            }
        }]);
