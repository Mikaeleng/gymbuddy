var addEatable = {
    //this css will be loaded automatically
    css:['add-eatable/add-eatable.css'],
    index: function ($scope, $route, $location,$rootScope, $routeParams, $log, restApi, eatable) {
        var eatableID = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        var eatableEdit = ($routeParams.editable) ? parseInt($routeParams.editable) : null;
        $rootScope.title = (eatable.editable != 1) ? 'Food produce' : 'Add food produce';
        $scope.buttonText = (eatableID > 0) ? 'Update' : 'Save';

        var original = eatable.data;

        original.id = eatableID;
        $scope._eatable = angular.copy(original);
        $scope._eatable.id = eatableID;

        $scope.isClean = function() {
            return angular.equals(original, $scope.eatable);

        }

        $scope.editEatable = function() {
            $("#myForm").removeClass('ng-hide');
            $("#food-info").addClass('ng-hide');
        };

        $scope.deleteEatable = function(eatable) {
            if(confirm("Are you sure to delete the current product: "+$scope._eatable.name)==true)
                restApi.deleteEatable(eatable.id);
                $location.url('/eatables/index/');
        };


        $scope.saveEatable = function(eatable) {
            if (eatableID <= 0) {
                $scope._eatable.editable = (eatableEdit==null) ? 1 : eatableEdit;
                restApi.insertEatable(eatable);
                $location.path('/eatables/index').replace();
            }
            else {
                restApi.updateEatable(eatableID, eatable);
                $route.reload();
            }
        };
    }
};