'use strict';
angular.module('backend-module.category')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.category.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/category/category-edit/category-edit.html',
            controller: 'CategoryEditController',
            authenticate: true,
            resolve: {
                _category: [
                    'CategoryCategories', '$stateParams',
                    function (CategoryCategories, $stateParams) {
                        if ($stateParams.id) {
                            return CategoryCategories.one($stateParams.id).get({expand: "brands"});
                        } else {
                            var object = {data: CategoryCategories.one()};
                            object.data.brands = [];
                            object.data.images = [];
                            return object;
                        }

                    }
                ],
                _categories: [
                    'CategoryCategoriesFormatted',
                    function (CategoryCategoriesFormatted) {
                        return CategoryCategoriesFormatted.getList();
                    }
                ],
                _categoryFields: [
                    'CategoryCategoriesFormatted', '$stateParams',
                    function (CategoryCategoriesFormatted, $stateParams) {
                        if ($stateParams.id) {
                            return CategoryCategoriesFormatted.getList({"parent_id": $stateParams.id});
                        }
                        else {
                            var object = {data: []};
                            object.data.brands = [];
                            return object;
                        }
                    }
                ],
                _brands: [
                    'BrandBrands',
                    function (BrandBrands) {
                        return BrandBrands.getList();
                    }
                ]
            }
        });
    }])
    .controller('CategoryEditController',
        ['$scope', '$modal', '$state', '$timeout', '_category', '_categories', '_brands', '_categoryFields',
            function ($scope, $modal, $state, $timeout, _category, _categories, _brands, _categoryFields) {
                $scope.category = _category.data;
                $scope.categories = _categories.data;
                $scope.categoryFields = _categoryFields.data;

                $scope.brands = _brands.data;
                $scope.AddBrands = {

                    open: function (brands, $index) {
                        var brands_list = angular.copy($scope.category.brands);
                        var addBrands = $modal.open({
                            templateUrl: 'components/brand-brands/select-brands/select-brands.html',
                            controller: 'SelectBrandsModalController',
                            resolve: {
                                _oldBrands: function () {
                                    return brands_list;
                                },
                                _brands: function () {
                                    return $scope.brands;
                                }
                            }
                        });
                        addBrands.result.then(function (result) {

                            $scope.category.brands = result;
                        }, function () {


                        });
                    }
                };
                $scope.UploadFile = {
                    open: function () {

                        var actionConfiguration = $modal.open({
                            templateUrl: 'components/device-devices/add-images-modal/add-images-modal.html',
                            controller: 'AddImagesModalController'

                        });
                        actionConfiguration.result.then(function (result) {
                            console.log(result)
                            for (var i = 0; i < result.length; i++) {
                                $scope.category.images.push(result[i]);
                            }

                        }, function () {

                        });
                    }
                };
                $scope.saveCategory = function () {
                    $scope.category.save().then(function () {

                        $state.go("backend.category.list");
                    }, function () {

                    });
                }


            }]);