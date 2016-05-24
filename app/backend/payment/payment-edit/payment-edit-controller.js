'use strict';
angular.module('backend-module.payment')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.payment.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/payment/payment-edit/payment-edit.html',
            controller: 'PaymentEditController',
            authenticate: true,
            role: "admin",
            resolve: {
                _payment: [
                    'PaymentPayments', '$stateParams',
                    function (PaymentPayments, $stateParams) {
                        if ($stateParams.id) {
                            return PaymentPayments.one($stateParams.id).get({expand: "categories"});
                        } else {
                            var object = {data: PaymentPayments.one()};
                            object.data.categories = [];
                            object.data.images = [];

                            return object;
                        }

                    }
                ]
            }
        });
    }])
    .controller('PaymentEditController',
        ['$scope', '$modal', '$state', '$timeout', '_payment', '_categories',
            function ($scope, $modal, $state, $timeout, _payment, _categories) {
                $scope.payment = _payment.data;
                $scope.categories = _categories.data;




                $scope.savePayment = function () {

                    $scope.payment.save().then(function () {

                       // $state.go("backend.payment.list");
                    }, function () {

                    });
                }


            }]);