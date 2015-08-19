angular.module('user-users')
    .factory('UserUsers',
        ['Restangular', function (Restangular) {

            return Restangular.service('user/users');
        }]);