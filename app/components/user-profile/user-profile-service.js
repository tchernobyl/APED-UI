angular.module('user-users')
    .factory('UserProfile',
        ['Restangular',
            function (Restangular) {
                return Restangular.service('customer/portals/profile');
            }]);
