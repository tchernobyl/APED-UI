angular.module('content-contents')
    .factory('ContentContents',
        ['Restangular', function (Restangular) {

            return Restangular.service('content/content');
        }]);