angular.module('message-messages')
    .factory('MessageMessages',
        ['Restangular', function (Restangular) {

            return Restangular.service('message/messages');
        }]);