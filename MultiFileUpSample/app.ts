/// <reference path="scripts/typings/angularjs/angular.d.ts" />
module theApp {

    // extend scope.
    export interface IScope extends ng.IScope {
        // states
        serialNumber: number;
        files: FileModel[];
        is_empty: boolean;

        // actions
        file_changed: (a: JQuery) => void;
        reset: (a: number) => void;
    }

    // model class for tracking input:file element.
    export class FileModel {
        fileNumber: number;
        src: string;

        constructor(filenumber) {
            this.src = '';
            this.fileNumber = filenumber;
        }
    }

    // Controller
    export class FileUpController {

        constructor($scope: IScope) {
            // initialize states.
            $scope.is_empty = true;
            $scope.files = [];
            for (var i = 1; i <= 5; i++) {
                $scope.files.push(new FileModel(i));
            }
            $scope.serialNumber = $scope.files.length + 1;

            // handle DOM event
            $scope.file_changed = (element) => {
                var file = $scope.files[element.data('index')];
                file.src = element.val();
                $scope.$apply(() => {
                    this.updateState($scope);
                });
            };

            // hanlde reset action.
            $scope.reset = (index) => {
                $scope.serialNumber++;
                $scope.files.splice(index, 1, new FileModel($scope.serialNumber));
                this.updateState($scope);
            };
        }

        // update state
        private updateState($scope: IScope) {
            $scope.is_empty = $scope.files.every(f => f.src == '');
        }
    }
}