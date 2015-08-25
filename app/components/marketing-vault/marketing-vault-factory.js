angular.module('marketing-vault')
    .factory('marketingVaultFactory', [
        function () {
            return function (collectionName, haveController) {
                var result = {
                    restrict: 'E',
                    scope: {
                        options: '='
                    },
                    link: function (scope, element) {
                        var links = $('a[href=#' + collectionName + '-marketing-vault]');
                        var $container = element.children();
                        links.on('click', function (event) {
                            event.preventDefault();
                            if ($container.hasClass('on')) {
                                scope.$apply(function () {
                                    scope.options.search = '';
                                });
                                if (typeof scope.options.onClose == 'function') {
                                    scope.$apply(function () {
                                        scope.options.onClose();
                                    });
                                }
                            } else {
                                $('.marketing-vault-container.on').removeClass('on');
                            }
                            $container.toggleClass('on');
                        });

                        scope.options.close = function () {
                            if ($container.hasClass('on')) {
                                scope.options.search = '';
                                if (typeof scope.options.onClose == 'function') {
                                    scope.options.onClose();
                                }
                            } else {
                                $('.marketing-vault-container.on').removeClass('on');
                            }
                            $container.toggleClass('on');
                        };
                        scope.options.open = scope.options.close;
                    },
                    templateUrl: 'components/marketing-vault/' + collectionName + '-marketing-vault.html'

                };

                if (haveController) {
                    result.controller = 'Vault-' + collectionName + '-Controller'
                }
                return result;
            };
        }
    ]);