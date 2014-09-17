/// <reference path="scripts/typings/angularjs/angular.d.ts" />
var theApp;
(function (theApp) {
    

    // model class for tracking input:file element.
    var FileModel = (function () {
        function FileModel(filenumber) {
            this.src = '';
            this.fileNumber = filenumber;
        }
        return FileModel;
    })();
    theApp.FileModel = FileModel;

    // Controller
    var FileUpController = (function () {
        function FileUpController($scope) {
            var _this = this;
            // initialize states.
            $scope.is_empty = true;
            $scope.serialNumber = 1;
            $scope.files = [new FileModel($scope.serialNumber)];

            // handle DOM event
            $scope.file_changed = function (element) {
                var file = $scope.files[element.data('index')];
                file.src = element.val();
                $scope.$apply(function () {
                    // if there is no empty input:file elements, then append file model.
                    if ($scope.files.every(function (f) {
                        return f.src != '';
                    })) {
                        $scope.serialNumber++;
                        $scope.files.push(new FileModel($scope.serialNumber));
                    }
                    _this.updateState($scope);
                });
            };

            // hanlde remove action.
            $scope.remove = function (index) {
                $scope.files.splice(index, 1);
                _this.updateState($scope);
            };
        }
        // update state
        FileUpController.prototype.updateState = function ($scope) {
            $scope.is_empty = $scope.files.every(function (f) {
                return f.src == '';
            });
        };
        return FileUpController;
    })();
    theApp.FileUpController = FileUpController;
})(theApp || (theApp = {}));
//# sourceMappingURL=app.js.map
