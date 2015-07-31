angular.module('brand-brands')

    .controller('SelectBrandsModalController',
        ['$scope', '$modalInstance', '_brands', '_categoryBrands',
            function ($scope, $modalInstance, _brands, _categoryBrands) {

                var DefaultBrandCategories = angular.copy(_categoryBrands);
                var DefaultCategories = angular.copy(_brands);

                for (var cat = 0; cat < DefaultBrandCategories.length; cat++) {
                    var objectCat = DefaultBrandCategories[cat];
                    var indexCat = _.findIndex(DefaultCategories, {id: objectCat.id });

                    if (indexCat > -1) {
                        DefaultCategories.splice(indexCat, 1);
                    }
                }


                $scope.categoryBrands = angular.copy(DefaultBrandCategories);
                $scope.brands = angular.copy(DefaultCategories);


                $scope.resetDefault = function () {

                    $scope.categoryBrands = angular.copy(DefaultBrandCategories);
                    $scope.brands = angular.copy(DefaultCategories);
                };

                $scope.selectCategory = function (brand) {
                    var index = _.findIndex($scope.categoryBrands, {id: brand.id });
                    if (index < 0) {
                        $scope.categoryBrands.push(brand)

                        var index_cate = _.findIndex($scope.brands, {id: brand.id });
                        $scope.brands.splice(index_cate, 1);
                    }
                };
                $scope.deleteCategory = function (brand) {
                    console.log(brand)
                    var index = _.findIndex($scope.categoryBrands, {id: brand.id });
                    $scope.categoryBrands.splice(index, 1);
                    $scope.brands.push(brand);
                };
                $scope.closeAndReturnCategories = function () {

                    $modalInstance.close($scope.categoryBrands);
                };
                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]);