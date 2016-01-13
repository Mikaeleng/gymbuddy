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

        $scope.excercise = false;
        $scope.workoutParam = ($routeParams.workoutname) ? $routeParams.workoutname : false;

        jsonRequest.getData (SETTINGS.JSON + 'workouts.json').then(function(d) {
            if($scope.workoutParam) {
                $scope.workoutData = d;
                $scope.user_id = ($routeParams.user_id) ? $routeParams.user_id : null;
                $scope.user_name = ($routeParams.user_name) ? $routeParams.user_name : null;
                //$scope.currentWorkout = $scope.workoutData[$scope.currentWorkout];

                // i : name of object in json file, item : object in json file
                $.each($scope.workoutData, function(i, item){
                    if(i.toLowerCase() == $scope.workoutParam) {
                        $scope.workout = item.excercises;
                            $scope.excerciseLabel = item.label;
                            $scope.excercise = item.excercises;
                        $log.info($scope.excercise)
                    }
                });
            }
        });
    }
};