/* !Info*/
/*
    The index definition is the same as what the html page template has to be named
    and the webb adress in the browser path has to end with.
    e.i. the function in index is the controller function.

    This controller sets the following vars and functions:
    exercise:
        it looks at the routParams and evals if it should show the workout or the list of workouts
        it looks after the user_id in the routeParams and assigns it to the scope var for the same
        it looks for the user_name that is returned from the routParams and sets the scope for the same
        it iterates through the list of exercises and if the workoutData var has the same workoutname ast the routParams

 */
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

        $scope.exercise = false;
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
                        $scope.workout = item.exercises;
                        $rootScope.workout = $scope.workout;
                            $scope.workoutLabel = item.label;
                            $scope.exercise = item.exercises;
                    }
                });
            }
        });
    }
};