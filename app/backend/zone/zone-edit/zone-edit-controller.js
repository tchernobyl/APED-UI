'use strict';
angular.module('backend-module.zone')
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('backend.zone.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/zone/zone-edit/zone-edit.html',
            controller: 'ZoneEditController',
            authenticate: true,
            role: "admin",
            resolve: {
                _zone: [
                    'ZoneZones', '$stateParams',
                    function (ZoneZones, $stateParams) {

                        if ($stateParams.id) {
                            return ZoneZones.one($stateParams.id).get({expand: "categories"});
                        } else {
                            var object = {data: ZoneZones.one()};
                            object.data.categories = [];
                            object.data.images = [];

                            return object;
                        }

                    }
                ]
            }
        });
    }])
    .controller('ZoneEditController',
        ['$scope', '$modal', '$state', '$timeout', '_zone',
            function ($scope, $modal, $state, $timeout, _zone) {
                console.log(5)
                $scope.zone = _zone.data;


                $scope.saveZone = function () {

                    $scope.zone.save().then(function () {

                        // $state.go("backend.zone.list");
                    }, function () {

                    });
                }


            }]);