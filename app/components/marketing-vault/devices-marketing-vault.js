angular.module('marketing-vault')
    .directive('devicesMarketingVault', [
        'marketingVaultFactory',
        function (marketingVaultFactory) {
            return marketingVaultFactory('devices', true);

        }
    ])
    .controller('Vault-devices-Controller',
        ['$scope', '$rootScope', 'DeviceDevices',
            function ($scope, $rootScope, DeviceDevices) {

                $scope.FindDevice = function (search) {

                    setTimeout(function () {
                        if (search === $scope.options.search) {

                            var FilterDevices = {
                                'per-page': 10

                            };
                            if (search) {
                                FilterDevices = $.extend(FilterDevices,
                                    {
                                        'query[1][type]': "like",
                                        'query[1][field]': "name",
                                        'query[1][value]': search
                                    }
                                );
                            }
                            if ($scope.options.product.id) {
                                FilterDevices = $.extend(FilterDevices,
                                    {
                                        'query[2][type]': "eq",
                                        'query[2][field]': "deviceProductId",
                                        'query[2][value]': $scope.options.product.id
                                    }
                                );
                            }

                            DeviceDevices.getList(
                                    FilterDevices
                                ).then(function (result) {
                                    $scope.options.devices = result.data;
                                });
                        }

                    }, 1000);

                };
                $scope.FindDevice();
            }]);