'use strict';
angular.module('backend-module.version')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.version.list', {
            url: '/list',
            templateUrl: 'backend/version/version-list/version.html',
            controller: 'VersionListController',
            authenticate: true,
            resolve: {
                _versions: [
                    'VersionVersions', '$stateParams',
                    function (VersionVersions, $stateParams) {
                        return VersionVersions.getList({expand: "brand"});
                    }
                ]
            }
        });
    }])
    .controller('VersionListController',
        ['$scope', '$modal', '$timeout', '_versions',
            function ($scope, $modal, $timeout, _versions) {
                $scope.versions = _versions.data;
                console.log(15151);

            }]);