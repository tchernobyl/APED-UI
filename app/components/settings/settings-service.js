angular.module('authentication')
    .factory('SettingsService', [ '$http', 'Session', 'API_LOGIN_CONFIG', '$rootScope',
        function ($http, Session, API_LOGIN_CONFIG, $rootScope ) {
            var settingsService = {};

            settingsService.updateSettings = function () {

                return [];

            };
            settingsService.updateUserProfile = function () {
            return [];
            };
            settingsService.loadGlobalSettings = function () {
//                $rootScope.globalTaxationSettingsFromApi
                $rootScope.globalSettingsFromApi = this.getSystemSettings();
                $rootScope.globalBusinessSettingsFromApi = this.getBusinessSettings();
            };
            settingsService.getSystemSettings = function () {
                return [];
            };
            settingsService.getTaxationSettings = function () {
                return [];
            };
            settingsService.getBusinessSettings = function () {
                return [];
            };
            settingsService.getPiwikSettings = function () {
                return [];
            };
            return settingsService;
        }])
;
