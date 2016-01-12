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

                $.each($scope.workoutData, function(i, item){
                    if(i.toLowerCase() == $scope.currentWorkout) {
                        $scope.currentExcercise = item.excercises;
                    }
                });

            }
        });


        $scope.isClean = function() {
            return angular.equals(original, $scope.weight);

        }

    }
};