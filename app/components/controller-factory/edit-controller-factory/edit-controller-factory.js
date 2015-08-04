angular.module('controller-factory')
    .factory('EditControllerFactory',
        ['$rootScope', '$state', 'growl',
            function ($rootScope, $state, growl) {
                return function ($scope, options) {
                    options = options || {};
                    var resource = options.resource;
                    var collection = options.collection;
                    var overrideItemName = typeof options.overrideItemName !== 'undefined' ? options.overrideItemName : false;

                    var collectionName = collection.indexOf('.') != -1 ? collection.split('.').pop() : collection;
                    var variableName = overrideItemName ? 'item' : inflection.singularize(collectionName);
                    variableName = variableName.replace(/\-[a-z]/g, function (text) {
                        return text.charAt(1).toUpperCase();
                    });
                    var objectName = inflection.titleize(inflection.singularize(collectionName));
                    var formName = variableName + 'Form';

                    // assign a resource
                    if (_.size(resource) > 0) {
                        $scope[variableName] = resource.data;
                    }

                    // clone item
                    $scope.clone = function () {
                        $rootScope.loadingMessage = 'Cloning...';
                        $scope[variableName].clone().then(function (_newItem) {
                            $rootScope.loadingMessage = null;
                            growl.addSuccessMessage(objectName + ' has been cloned successfully.');
                            $state.go(collection + '.edit', {id: _newItem.data.id});
                        }, function (error) {
                            $rootScope.loadingMessage = null;
                            alert(error.data.message);
                        });
                    };

                    // submit item
                    $scope.submit = function (callback) {
                        if ($scope.submitting) {
                            return;
                        }
                        if (typeof $scope.onBeforeSubmit === 'function' && !$scope.onBeforeSubmit()) {
                            return;
                        }

                        $scope.submitted = true;
                        if ($scope[formName].$valid) {
                            $rootScope.loadingMessage = 'Saving...';
                            $scope.submitting = true;
                            $scope[variableName].save().then(function (response) {
                                if (typeof callback === 'function') {
                                    callback(response.data);
                                } else {
                                    $scope.onSuccess();
                                }
                            }, function (error) {
                                $scope.errors = error.data;
                            });
                        }
                    };

                    $scope.onSuccess = function () {
                        $rootScope.loadingMessage = null;
                        growl.addSuccessMessage(objectName + ' has been saved successfully');

                        $state.go(collection + '.list');
                    };

                    // delete item
                    $scope.delete = function () {
                        if (confirm('Are you sure')) {
                            $rootScope.loadingMessage = 'Deleting...';
                            $scope[variableName].remove().then(function () {
                                $rootScope.loadingMessage = null;
                                growl.addSuccessMessage(objectName + ' has been deleted successfully.');
                                $state.go(collection + '.list');
                            }, function (error) {
                                $rootScope.loadingMessage = null;
                                alert(error.data.message);
                            });
                        }
                    };
                };
            }]);