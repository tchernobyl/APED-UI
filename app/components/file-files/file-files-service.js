angular.module('file-files')
    .factory('FileFiles',
        ['Restangular',
            function (Restangular) {
                Restangular
                    .extendCollection('file/files', function (collection) {
                        collection.add = function (data) {
                            var model = Restangular.restangularizeElement(this.parentResource, data, 'file/files');
                            this.push(model);
                        };
                        return collection;
                    })
                    .extendModel('file/files', function (model) {
                        model.getUrl = function () {
                            return model.url;

                        };
                        return model;
                    });
                return Restangular.service('file/files');
            }]);