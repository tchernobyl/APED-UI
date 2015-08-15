angular.module('frontend-module', ["frontend-module.dashboard"])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('frontend', {
            abstract: true,
            url: '/frontend',
            templateUrl: 'templates/frontend/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(

                        {
                            name: 'APEDevices',
                            files: [
                                'components/directives/frontend/header/header.js',
                                'components/directives/frontend/header/header-notification/header-notification.js',
                                'components/directives/frontend/sidebar/sidebar.js',
                                'components/directives/frontend/sidebar/sidebar-search/sidebar-search.js',

                                'components/directives/timeline/timeline.js',
                                'components/directives/notifications/notifications.js',
                                'components/directives/chat/chat.js',
                                'components/directives/dashboard/stats/stats.js',
                                'components/directives/truncate/truncate-text-filter.js'
                            ]
                        })

                }
            }

        });
    }]);