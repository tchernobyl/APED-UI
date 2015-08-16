angular.module('extra-fields')

    .controller('ExtraFieldsModalController',
        ['$scope', '$modalInstance', '_extraFields',
            function ($scope, $modalInstance, _extraFields) {


                $scope.extraFields = _extraFields;
                $scope.extraFieldObject = {
                    id: "",
                    name: "",
                    field: "",
                    content: "",
                    type: "",
                    enabled: "",
                    length: ""

                };
                $scope.bodyContent = 'list';
                $scope.editView = {};


                $scope.editField = function ($index) {
                    $scope.editView.currentField = angular.copy($scope.extraFields[$index]);
                    $scope.editView.index = $index;
                    $scope.bodyContent = 'edit';

                };
                $scope.addNewField = function ($index) {
                    $scope.editView.currentField = angular.copy($scope.extraFieldObject);
                    $scope.editView.index = null;
                    $scope.bodyContent = 'edit';

                };
                $scope.saveFieldObject = function () {
                    if ($scope.editView.currentField) {
                        if ($scope.editView.index || $scope.editView.index == 0) {
                            $scope.extraFields[$scope.editView.index] = $scope.editView.currentField;
                        } else {
                            $scope.extraFields.push($scope.editView.currentField);
                        }
                        $scope.bodyContent = 'list';
                    }
                };
                $scope.cancelSaveFieldObject = function () {
                    $scope.editView = {};
                    $scope.bodyContent = 'list';
                };


                $scope.closeAndReturnBrands = function () {

                    $modalInstance.close($scope.extraFields);
                };
                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]);