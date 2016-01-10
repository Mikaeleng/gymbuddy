var addWeight = {

    css:['add-weight/add-weight.css'],
    index: function ($scope, $location,$rootScope, $routeParams, $log, restApi, weight) {
        var weightID = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        $rootScope.title = (weightID > 0) ? 'Edit weight' : 'Add weight';
        $scope.buttonText = (weightID > 0) ? 'Update weight' : 'Add New weight';
        var original = weight.data;
        original.id = weightID;
        $scope.weight = angular.copy(original);
        $scope.weight.id = weightID;

        $scope.isClean = function() {
            return angular.equals(original, $scope.weight);

        }

        $scope.deleteWeight = function(weight) {
            if(confirm("Are you sure to delete the current weight: "+$scope.weight.id)==true)
                restApi.deleteWeight(weight.id);
            $location.url('/weights/index/');
        };


        $scope.saveWeight = function(weight) {

            $location.path('/weights/index').replace();
            if (weightID <= 0) {
                weight.user_id = 1;
                $log.info(weight)
                restApi.insertWeight(weight);
            }
            else {
                restApi.updateWeight(weightID, weight);
            }
        };
    }
};