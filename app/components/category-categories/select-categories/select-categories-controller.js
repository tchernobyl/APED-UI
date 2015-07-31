angular.module('category-categories')

    .controller('SelectCategoriesModalController',
        ['$scope', '$modalInstance', '_categories', '_brandCategories',
            function ($scope, $modalInstance, _categories, _brandCategories) {

                var DefaultBrandCategories = angular.copy(_brandCategories);
                var DefaultCategories = angular.copy(_categories);

                for (var cat = 0; cat < DefaultBrandCategories.length; cat++) {
                    var objectCat = DefaultBrandCategories[cat];
                    var indexCat = _.findIndex(DefaultCategories, {id: objectCat.id });

                    if (indexCat > -1) {
                        DefaultCategories.splice(indexCat, 1);
                    }
                }


                $scope.brandCategories = angular.copy(DefaultBrandCategories);
                $scope.categories = angular.copy(DefaultCategories);


                $scope.resetDefault = function () {

                    $scope.brandCategories = angular.copy(DefaultBrandCategories);
                    $scope.categories = angular.copy(DefaultCategories);
                };

                $scope.selectCategory = function (category) {
                    var index = _.findIndex($scope.brandCategories, {id: category.id });
                    if (index < 0) {
                        $scope.brandCategories.push(category)
                        var index_cate = _.findIndex($scope.categories, {id: category.id });
                        $scope.categories.splice(index_cate, 1);
                    }
                };
                $scope.deleteCategory = function (category) {
                    var index = _.findIndex($scope.brandCategories, {id: category.id });
                    $scope.brandCategories.splice(index, 1);
                    $scope.categories.push(category);
                };
                $scope.closeAndReturnCategories = function () {

                    $modalInstance.close($scope.brandCategories);
                };
                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]);