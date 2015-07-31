angular.module('backend-module.version', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.version', {
            url: '/version',
            templateUrl: 'backend/version/version-module.html'


        })
    }
    ]);
