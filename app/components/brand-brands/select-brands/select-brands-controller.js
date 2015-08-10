angular.module('brand-brands')

    .controller('SelectBrandsModalController',
        ['$scope', '$modalInstance', '_brands', '_oldBrands',
            function ($scope, $modalInstance, _brands, _oldBrands) {

                var DefaultBrandObjects = angular.copy(_oldBrands);
                var DefaultObjects = angular.copy(_brands);

                for (var cat = 0; cat < DefaultBrandObjects.length; cat++) {
                    var objectCat = DefaultBrandObjects[cat];
                    var indexCat = _.findIndex(DefaultObjects, {id: objectCat.id });

                    if (indexCat > -1) {
                        DefaultObjects.splice(indexCat, 1);
                    }
                }


                $scope.oldBrands = angular.copy(DefaultBrandObjects);
                $scope.brands = angular.copy(DefaultObjects);


                $scope.resetDefault = function () {

                    $scope.oldBrands = angular.copy(DefaultBrandObjects);
                    $scope.brands = angular.copy(DefaultObjects);
                };

                $scope.selectObject = function (brand) {
                    var index = _.findIndex($scope.oldBrands, {id: brand.id });
                    if (index < 0) {
                        $scope.oldBrands.push(brand)

                        var index_cate = _.findIndex($scope.brands, {id: brand.id });
                        $scope.brands.splice(index_cate, 1);
                    }
                };
                $scope.deleteObject = function (brand) {

                    var index = _.findIndex($scope.oldBrands, {id: brand.id });
                    $scope.oldBrands.splice(index, 1);
                    $scope.brands.push(brand);
                };
                $scope.closeAndReturnBrands = function () {

                    $modalInstance.close($scope.oldBrands);
                };
                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]);