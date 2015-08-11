angular.module('product-products')

    .controller('SelectObjectsModalController',
        ['$scope', '$modalInstance', '_allObjects', '_oldObjects',
            function ($scope, $modalInstance, _allObjects, _oldObjects) {

                var oldObjects = angular.copy(_oldObjects);
                var allObjects = angular.copy(_allObjects);

                for (var cat = 0; cat < oldObjects.length; cat++) {
                    var objectCat = oldObjects[cat];
                    var indexCat = _.findIndex(allObjects, {id: objectCat.id });

                    if (indexCat > -1) {
                        allObjects.splice(indexCat, 1);
                    }
                }


                $scope.listOldObjects = angular.copy(oldObjects);
                $scope.listAllObjects = angular.copy(allObjects);


                $scope.resetDefault = function () {

                    $scope.listOldObjects = angular.copy(oldObjects);
                    $scope.listAllObjects = angular.copy(allObjects);
                };

                $scope.selectObject = function (object) {
                    var index = _.findIndex($scope.listOldObjects, {id: object.id });
                    if (index < 0) {
                        $scope.listOldObjects.push(object)
                        var index_cate = _.findIndex($scope.listAllObjects, {id: object.id });
                        $scope.listAllObjects.splice(index_cate, 1);
                    }
                };
                $scope.deleteObject = function (object) {
                    var index = _.findIndex($scope.listOldObjects, {id: object.id });
                    $scope.listOldObjects.splice(index, 1);
                    $scope.listAllObjects.push(object);
                };
                $scope.closeAndReturnObjects = function () {

                    $modalInstance.close($scope.listOldObjects);
                };
                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]);