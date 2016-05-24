'use strict';
angular.module('backend-module.country')
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('backend.country.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/country/country-edit/country-edit.html',
            controller: 'CountryEditController',
            authenticate: true,
            role: "admin",
            resolve: {
                _country: [
                    'CountryCountrys', '$stateParams',
                    function (CountryCountrys, $stateParams) {

                        if ($stateParams.id) {
                            return CountryCountrys.one($stateParams.id).get({expand: "categories"});
                        } else {
                            var object = {data: CountryCountrys.one()};
                            object.data.categories = [];
                            object.data.images = [];

                            return object;
                        }

                    }
                ]
            }
        });
    }])
    .controller('CountryEditController',
        ['$scope', '$modal', '$state', '$timeout', '_country',
            function ($scope, $modal, $state, $timeout, _country) {
                console.log(5)
                $scope.country = _country.data;


                $scope.saveCountry = function () {

                    $scope.country.save().then(function () {

                        // $state.go("backend.country.list");
                    }, function () {

                    });
                }


            }]);