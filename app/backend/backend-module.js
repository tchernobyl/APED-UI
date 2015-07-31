angular.module('backend-module', ['backend-module.dashboard2'])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('backend', {
            abstract: true,
            url: '/backend',
            templateUrl: 'templates/backend/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'sbAdminApp',
                            files: [
                                'components/directives/header/header.js',
                                'components/directives/header/header-notification/header-notification.js',
                                'components/directives/sidebar/sidebar.js',
                                'components/directives/sidebar/sidebar-search/sidebar-search.js',

                                'components/directives/timeline/timeline.js',
                                'components/directives/notifications/notifications.js',
                                'components/directives/chat/chat.js',
                                'components/directives/dashboard/stats/stats.js'
                            ]
                        })

                }
            }

        });
    }]);