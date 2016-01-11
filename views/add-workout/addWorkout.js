var addWorkout = {

    css:['add-workout/add-workout.css'],
    index: function ($scope, $location,$rootScope, $routeParams, SETTINGS, $log, restApi, jsonRequest) {
       /* var weightID = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        $rootScope.title = (weightID > 0) ? 'Edit weight' : 'Add weight';
        $scope.buttonText = (weightID > 0) ? 'Update weight' : 'Add New weight';
        var original = weight.data;
        original.id = weightID;
        $scope.weight = angular.copy(original);
        $scope.weight.id = weightID;*/

        $scope.currentExcercise = false;
        $scope.currentWorkout = ($routeParams.workoutname) ? $routeParams.workoutname : false;

        jsonRequest.getData (SETTINGS.JSON + 'workouts.json').then(function(d) {
            if($scope.currentWorkout) {
                $scope.workoutData = d;
                $scope.currentSet = 1;
                $scope.currentExcercise = $scope.workoutData[$scope.currentWorkout];

            }
        });
        //$scope.workoutData = jsonRequest.getData("http://localhost:8080/workouts");
        // workout variables --


        $scope.$watch($scope.currentWorkout, function() {

        });

        $scope.isClean = function() {
            return angular.equals(original, $scope.weight);

        }



        $scope.deleteWeight = function(weight) {
           /* if(confirm("Are you sure to delete the current weight: "+$scope.weight.id)==true)
                restApi.deleteWeight(weight.id);
            $location.url('/weights/index/');*/
        };


        $scope.saveWeight = function(weight) {

            $location.path('/weights/index').replace();
           /* if (weightID <= 0) {
                weight.user_id = 1;
                $log.info(weight)
                restApi.insertWeight(weight);
            }
            else {
                restApi.updateWeight(weightID, weight);
            }*/
        };
    }
};