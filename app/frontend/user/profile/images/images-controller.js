angular.module('frontend-module.user.profile')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile.images', {
            url: '/images',
            templateUrl: 'frontend/user/profile/images/images.html',
            controller: 'globalImagesProfileController'



        });
    }])
    .controller('globalImagesProfileController',
        ['$scope', '$modal', '_profile'
            , function ($scope, $modal) {


            $scope.UploadFile = {
                open: function () {

                    var actionConfiguration = $modal.open({
                        templateUrl: 'components/device-devices/add-images-modal/add-images-modal.html',
                        controller: 'AddImagesModalController'

                    });
                    actionConfiguration.result.then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            $scope.profile.images.push(result[i]);
                        }

                    }, function () {

                    });
                }
            };


        }]);
