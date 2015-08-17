angular.module('frontend-module.user.message')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.messages.sent', {
            url: '/sent',
            templateUrl: 'frontend/user/messages/sent/sent.html',
            controller: 'SentMessageController',
            resolve: {
                _listMessage: [
                    'MessageMessages',
                    function (MessageMessages) {
                        return MessageMessages.getList(

                            {
                                'query[1][type]': "eq",
                                'query[1][field]': "sender_id",
                                'query[1][value]': 1,
                                expand: "sender,receiver"
                            }
                        );
                    }
                ]
            }


        });
    }])

    .controller('SentMessageController',
        ['$scope', '$modal', '_listMessage', 'MessageMessages'
            , function ($scope, $modal, _listMessage, MessageMessages) {
            $scope.search = {};
            $scope.listMessage = _listMessage.data;

            $scope.search.totalItems = _listMessage.headers('x-pagination-total-count');
            $scope.search.currentPage = _listMessage.headers('x-pagination-current-page');
            $scope.search.itemsPerPage = _listMessage.headers('x-pagination-per-page');
            $scope.search.maxPageSize = 4;
            $scope.setPerPage = function (perPage) {
                $scope.search.itemsPerPage = perPage;
                goToMessagesList();

            };

            $scope.pageChanged = function () {

                goToMessagesList()
            };
            function goToMessagesList() {

                var page = $scope.search.currentPage;
                var perPage = $scope.search.itemsPerPage;

                var FiltersListMessage = {
                    'query[1][type]': "eq",
                    'query[1][field]': "sender_id",
                    'query[1][value]': 1,
                    expand: "sender,receiver",
                    'sort': '-updatedAt',
                    'per-page': perPage,
                    page: page
                };


                MessageMessages.getList(
                        FiltersListMessage
                    ).then(function (result) {

                        $scope.listMessage = result.data;

                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

            }
        }]);
