'use strict';

angular.module('sbAdminApp', [
        'ngSanitize'
        , 'ngResource'
        , 'restangular'
        , 'oc.lazyLoad'
        , 'ui.router'
        , 'ui.select2'
        , 'ui.bootstrap'
        , 'angular-loading-bar'
        , 'angular-growl'
        , 'ui.slimscroll'


        //components
        , 'device-devices'
        , 'version-versions'
        , 'brand-brands'
        , 'category-categories'
        , 'content-contents'


        //modules backend
        , 'backend-module'
        , 'backend-module.dashboard2'
        , 'backend-module.device'
        , 'backend-module.version'
        , 'backend-module.brand'
        , 'backend-module.category'

        //modules frontend
        , 'frontend-module'
        , 'frontend-module.dashboard'
        , 'frontend-module.home'
        , 'frontend-module.advertisements'


    ])
    .config([
        'RestangularProvider',
        function (RestangularProvider) {

            RestangularProvider
                .setBaseUrl("http://project/PortalsWay/APEDevices/backend/web/index.php/backend/")
                .setDefaultRequestParams({accessToken: "token"})
                .setFullResponse(true);
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

//        $urlRouterProvider.otherwise('/backend');


    }]);

    
