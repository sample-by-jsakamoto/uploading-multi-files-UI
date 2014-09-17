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
        remove: (a: number) => void;
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
            $scope.serialNumber = 1;
            $scope.files = [new FileModel($scope.serialNumber)];

            // handle DOM event
            $scope.file_changed = (element) => {
                var file = $scope.files[element.data('index')];
                file.src = element.val();
                $scope.$apply(() => {
                    // if there is no empty input:file elements, then append file model.
                    if ($scope.files.every(f => f.src != '')) {
                        $scope.serialNumber++;
                        $scope.files.push(new FileModel($scope.serialNumber));
                    }
                    this.updateState($scope);
                });
            };

            // hanlde remove action.
            $scope.remove = (index) => {
                $scope.files.splice(index, 1);
                this.updateState($scope);
            };
        }

        // update state
        private updateState($scope: IScope) {
            $scope.is_empty = $scope.files.every(f => f.src == '');
        }
    }
}