var APEDevices = angular.module('APEDevices', [
    'ngSanitize'
    , 'APEDevices'
    , 'ngResource'
    , 'restangular'
    , 'oc.lazyLoad'
    , 'ui.router'
    , 'ui.select2'
    , 'ui.bootstrap'
    , 'angular-loading-bar'
    , 'angular-growl'
    , 'ui.slimscroll'
    , 'angularFileUpload'


    //components
    , 'controller-factory'
    , 'device-devices'
    , 'product-products'
    , 'brand-brands'
    , 'category-categories'
    , 'content-contents'
    , 'extra-fields'
    , 'message-messages'
    , 'file-files'
    , 'user-users'
    , 'marketing-vault'


    //modules backend
    , 'backend-module'
    , 'backend-module.dashboard2'
    , 'backend-module.device'
    , 'backend-module.product'
    , 'backend-module.brand'
    , 'backend-module.category'
    , 'backend-module.shipping'
    , 'backend-module.payment'

    //modules frontend
    , 'frontend-module'
    , 'frontend-module.dashboard'
    , 'frontend-module.home'
    , 'frontend-module.advertisements'
    , 'frontend-module.brands'
    , 'frontend-module.products'
    , 'frontend-module.devices'
    , 'frontend-module.user'
    , 'frontend-module.user.message'
    , 'frontend-module.user.profile'
    , 'frontend-module.compare'
    , 'payment-payments'
    , 'shipping-shippings'



]);
angular.module('APEDevices')
    .config([
        '$urlRouterProvider',
        function ($urlRouteProvider) {
            $urlRouteProvider.otherwise('/frontend');
        }])
    .config([
        'growlProvider', function (growlProvider) {
            growlProvider.globalTimeToLive(3000);
        }
    ])
    .config([
        'RestangularProvider','API_CONFIG',
        function (RestangularProvider,API_CONFIG) {

            RestangularProvider
                .setBaseUrl(API_CONFIG.baseUrl)
                .setDefaultRequestParams({accessToken: API_CONFIG.accessToken})
                .setFullResponse(true);
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: false
        });

//        $urlRouterProvider.otherwise('/backend');


    }]);

    
