angular.module('controller-factory')
    .factory('ListControllerFactory',
        ['$rootScope', '$state', 'Restangular', 'growl',
            function ($rootScope, $state, Restangular, growl) {
                return function ($scope, options) {
                    options = options || {};
                    var resource = options.resource;
                    var collection = options.collection;
                    var overrideCollectionName = typeof options.overrideCollectionName !== 'undefined' ? options.overrideCollectionName : true;

                    var collectionName = collection.indexOf('.') != -1 ? collection.split('.').pop() : collection;
                    var listName = overrideCollectionName ? 'list' : collectionName;
                    listName = listName.replace(/\-[a-z]/g, function (text) {
                        return text.charAt(1).toUpperCase();
                    });
                    var objectName = inflection.titleize(inflection.singularize(collectionName));

                    // assign a resource
                    if (_.size(resource) > 0) {
                        $scope[listName] = resource.data;
                    }

                    // pagination setup
                    $scope.totalItems = options.totalItems || resource.headers('x-pagination-total-count');
                    $scope.currentPage = options.currentPage || resource.headers('x-pagination-current-page');
                    $scope.itemsPerPage = options.itemsPerPage || resource.headers('x-pagination-per-page');
                    $scope.maxPageSize = 5;
                    $scope.displayPageBoundaryLinks = Math.ceil($scope.totalItems / $scope.itemsPerPage) > $scope.maxPageSize;
                    $scope.pageChanged = function () {
                        $state.go(collection + '.list', {page: $scope.currentPage});
                    };

                    // edit item
                    $scope.edit = function (item) {
                        $state.go(collection + '.edit', {id: item.id});
                    };

                    // clone item
                    $scope.clone = function (item) {
                        $rootScope.loadingMessage = 'Cloning...';
                        item.clone().then(function (_newItem) {
                            $rootScope.loadingMessage = null;
                            growl.addSuccessMessage(objectName + ' has been cloned successfully.');
                            $state.go(collection + '.edit', {id: _newItem.data.id});
                        }, function (error) {
                            $rootScope.loadingMessage = null;
                            alert(error.data.message);
                        });
                    };

                    // delete item
                    $scope.delete = function (item) {
                        if (confirm('Are you sure')) {
                            $rootScope.loadingMessage = 'Deleting...';
                            item.remove().then(function () {
                                $rootScope.loadingMessage = null;
                                growl.addSuccessMessage(objectName + ' has been deleted successfully.');
                                $scope[listName] = _.without($scope[listName], item);
                            }, function (error) {
                                $rootScope.loadingMessage = null;
                                alert(error.data.message);
                            });
                        }
                    };
                };
            }]);