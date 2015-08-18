angular.module('device-devices')

    .controller('AddImagesModalController',
        ['$scope', 'FileUploader', '$modalInstance', 'FileFiles', 'Restangular', '$state',
            function ($scope, FileUploader, $modalInstance, FileFiles, Restangular, $state) {

                //TODO correct the url upload if there is another method or change it in service maybe it's better to make the folder url in the app.js
                var url = FileFiles.one().getRestangularUrl() + "?folder=products/images&accessToken=" + Restangular.requestParams.common.accessToken;

                $scope.alertSuccess = false;
                $scope.alertDanger = false;
                $scope.uploader = new FileUploader({
                    url: url,
                    headers: {Accept: "application/json"}
                });
                var IdsImages = "";

                $scope.uploader.filters.push({
                    name: 'customFilter',
                    fn: function (item, options) {
                        return this.queue.length < 10;
                    }
                });
                $scope.uploader.onWhenAddingFileFailed = function (item) {

                    $scope.alertSuccess = false;
                    $scope.alertDanger = true;
                    $scope.messageAlertDanger = "there's a problem when uploaded file!!"
                };
                $scope.uploader.onSuccessItem = function (item) {
                    $scope.alertSuccess = true;
                    $scope.alertDanger = false;

                };
                $scope.uploader.onBeforeUploadItem = function (item) {
                    $scope.alertSuccess = false;
                    $scope.alertDanger = false;

                };
                $scope.uploader.onErrorItem = function (item) {
                    $scope.alertSuccess = false;
                    $scope.alertDanger = true;
                    $scope.messageAlertDanger = "Files not uploaded successfully !!"
                };
                $scope.uploader.onCancelItem = function (item) {
                    $scope.alertSuccess = false;
                    $scope.alertDanger = true;
                    $scope.messageAlertDanger = "Aborted !!"
                };
                $scope.uploader.onCompleteItem = function (fileItem, response, status, headers) {

                    if (IdsImages == "") {
                        IdsImages = "id=" + response.id;
                    } else {
                        IdsImages = IdsImages + "||id=" + response.id;
                    }

                };

                $scope.saveAction = function () {
                    FileFiles.getList({

                        filter: IdsImages

                    }).then(function (response) {
                            $modalInstance.close(response.data);
                        });
//
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };


                $scope.closeAlert = function () {
                    $scope.alertSuccess = false;
                    $scope.alertDanger = false;

                };
            }]);