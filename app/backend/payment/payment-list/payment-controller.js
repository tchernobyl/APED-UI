'use strict';
angular.module('backend-module.payment')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.payment.list', {
            url: '/list?nameSearch&perPage&page',
            templateUrl: 'backend/payment/payment-list/payment.html',
            controller: 'PaymentListController',
            authenticate: true,
            resolve: {
                _payments: [
                    'PaymentPayments', '$stateParams',
                    function (PaymentPayments, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersPayments = {
                            'sort': '-updatedAt',
                            expand: '',
                            'per-page': perPage,
                            page: page
                        };
                        return PaymentPayments.getList(FiltersPayments);
                    }
                ]
            }
        });
    }])
    .controller('PaymentListController',
        ['$scope', '$rootScope', '$modal', '$timeout', '_payments', 'PaymentPayments',
            function ($scope, $rootScope, $modal, $timeout, _payments, PaymentPayments) {
                $scope.search = {};
                $scope.payments = _payments.data;
                $scope.search.totalItems = _payments.headers('x-pagination-total-count');
                $scope.search.currentPage = _payments.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _payments.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToPaymentsList();

                };

                $scope.pageChanged = function () {

                    goToPaymentsList()
                };
                function goToPaymentsList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersPayments = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    PaymentPayments.getList(
                            FiltersPayments
                        ).then(function (result) {

                            $scope.payments = result.data;

                            $scope.search.totalItems = result.headers('x-pagination-total-count');
                            $scope.search.currentPage = result.headers('x-pagination-current-page');
                            $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                            $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                        });

                }
            }]);