angular.module('loginuser', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            console.log("login module ")
            $stateProvider
                .state('login', {
                    notAuthenticate: true,
                    userAuthenticated: false,
                    abstract: true,
                    url: '/login',
                    templateUrl: 'templates/frontend/main.html'

                });
        }]);