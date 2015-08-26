angular.module('marketing-vault')
    .directive('productsMarketingVault', [
        'marketingVaultFactory',
        function (marketingVaultFactory) {
            return marketingVaultFactory('products', true);

        }
    ])
    .controller('Vault-products-Controller',
        ['$scope', '$rootScope', 'ProductProducts',
            function ($scope, $rootScope, ProductProducts) {

                $scope.FindProduct = function (search) {

                    setTimeout(function () {
                        if (search === $scope.options.search) {

                            var FilterProducts = {
                                'per-page': 10

                            };
                            if (search) {
                                FilterProducts = $.extend(FilterProducts,
                                    {
                                        'query[1][type]': "like",
                                        'query[1][field]': "name",
                                        'query[1][value]': search
                                    }
                                );
                            }


                            ProductProducts.getList(
                                    FilterProducts
                                ).then(function (result) {
                                    $scope.options.products = result.data;

                                });
                        }

                    }, 1000);

                };
                $scope.FindProduct();
            }]);