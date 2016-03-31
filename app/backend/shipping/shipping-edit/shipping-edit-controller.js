'use strict';
angular.module('backend-module.shipping')
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('backend.shipping.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/shipping/shipping-edit/shipping-edit.html',
            controller: 'ShippingEditController',
            authenticate: true,
            resolve: {
                _shipping: [
                    'ShippingShippings', '$stateParams',
                    function (ShippingShippings, $stateParams) {

                        if ($stateParams.id) {
                            return ShippingShippings.one($stateParams.id).get({expand: "categories"});
                        } else {
                            var object = {data: ShippingShippings.one()};
                            object.data.categories = [];
                            object.data.images = [];

                            return object;
                        }

                    }
                ]
            }
        });
    }])
    .controller('ShippingEditController',
        ['$scope', '$modal', '$state', '$timeout', '_shipping',
            function ($scope, $modal, $state, $timeout, _shipping) {
                console.log(5)
                $scope.shipping = _shipping.data;


                $scope.saveShipping = function () {

                    $scope.shipping.save().then(function () {

                        // $state.go("backend.shipping.list");
                    }, function () {

                    });
                }


            }]);