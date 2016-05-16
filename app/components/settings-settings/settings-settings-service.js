angular.module('settings-settings')
    .factory('SettingsSettings',
    ['Restangular', function (Restangular) {
        return Restangular.service('settings/settings');
    }]);