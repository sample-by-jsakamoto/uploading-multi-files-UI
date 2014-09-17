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
            $scope.files = [];
            for (var i = 1; i <= 5; i++) {
                $scope.files.push(new FileModel(i));
            }
            $scope.serialNumber = $scope.files.length + 1;

            // handle DOM event
            $scope.file_changed = function (element) {
                var file = $scope.files[element.data('index')];
                file.src = element.val();
                $scope.$apply(function () {
                    _this.updateState($scope);
                });
            };

            // hanlde reset action.
            $scope.reset = function (index) {
                $scope.serialNumber++;
                $scope.files.splice(index, 1, new FileModel($scope.serialNumber));
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
