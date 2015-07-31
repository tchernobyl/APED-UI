angular.module('backend-module.category', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.category', {
            url: '/category?id_cat&list',
            templateUrl: 'backend/category/category-module.html',
            controller: 'CategoryController',
            resolve: {
                _categoryFieldsHome: [
                    'CategoryCategoriesFormatted', '$stateParams',
                    function (CategoryCategoriesFormatted, $stateParams) {
                        if ($stateParams.id_cat) {
                            return CategoryCategoriesFormatted.getList({"parent_id": $stateParams.id_cat});
                        }
                        else {
                            return CategoryCategoriesFormatted.getList();
                        }
                    }
                ],
                _newestCategories: [
                    'CategoryCategories', '$stateParams',
                    function (CategoryCategories) {
                        return CategoryCategories.getList({
                            'sort': '-updatedAt',
                            'per-page': 4
                        });
                    }
                ]
            }


        })
    }
    ])
    .controller('CategoryController',
        ['$scope', '$modal', '$timeout', '$state', '$stateParams', '_categoryFieldsHome', '_newestCategories',
            function ($scope, $modal, $timeout, $state, $stateParams, _categoryFieldsHome, _newestCategories) {
                $scope.newestCategories = _newestCategories.data;


                $scope.listCategoriesExpanded = [];
                if ($stateParams.list) {

                    $scope.listCategoriesExpanded = JSON.parse("[" + $stateParams.list + "]");
                    ;
                }

                $scope.idCategory = $stateParams.list;


                $scope.state = $state;
                $scope.categoryFieldsHome = _categoryFieldsHome.data;
                $scope.goInCategory = function (idCategory) {
                    $scope.listCategoriesExpanded.push(idCategory);

                    goToTheCurrentState(idCategory, $scope.listCategoriesExpanded.toString());

                };
                $scope.deleteLastRecord = function () {
                    $scope.listCategoriesExpanded.pop();
                    var idCategory = $scope.listCategoriesExpanded[$scope.listCategoriesExpanded.length - 1];
                    goToTheCurrentState(idCategory, $scope.listCategoriesExpanded.toString());
                };

                function goToTheCurrentState(idCategory, listStringCategories) {
                    $state.go(".",
                        {
                            id_cat: idCategory,
                            list: listStringCategories
                        });
                }
            }]);
