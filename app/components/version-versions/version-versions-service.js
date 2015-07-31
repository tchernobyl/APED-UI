angular.module('version-versions')
    .factory('VersionVersions',
        ['Restangular', function (Restangular) {

            return Restangular.service('version/versions');
        }]);