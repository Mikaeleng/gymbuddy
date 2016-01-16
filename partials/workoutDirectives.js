/**
 * Created by mikaelen on 01/06/15.
 */
'use strict';

angular.module('workoutDirectives', [])
    /*
        This directive controller returns the scope and handles all the functions in the exercise.
        It is important to understand that this is the hub for all the different sets that is created in the html markup.
        This scope has the ng-repeat that initiates all the sets for each exercises e.i. (chest, broad pull ups, Biceps, Triceps)
           Each exercise has a dynamically set of sets. This is set in the json file by its [SETS] key/value.

     */
    .directive('setDirective', function(){
      /*  var getNextExerciseLabel = function(workout, num){
            $.each( workout, function( key, value ) {
                if(value['order']== num) {
                    console.log(value['label']);
                    return value['label'];
                }
            });
        }*/
        return {
            restrict: 'E',
            templateUrl: 'partials/setDirective.html',
            replace: true,
            require:'^exerciseDirective',
            controller: function($scope, $element, $log){

                // vars for each set in an exercise
                $scope.weights = 40;
                $scope.reps = 6;

                /*
                    When a user clicks the complete set button in a set (unchecked character in UI) this event is triggered with ng-click
                     The function toggles the classes so the button changes appearance.
                      It sets the $parent scope var
                 */
                $scope.setCompletedButton = function(set, $event){
                    var span = $($event.currentTarget).find("span");

                    $(span).toggleClass("Avantgarde-checkmark-circle");
                    $(span).toggleClass("Avantgarde-checkmark-unchecked");

                    $scope.$parent.setCompleted(set, $scope.weights,$scope.reps, $event)
                }

            },
            link: function (scope, el, attrs, parentDirCtrl) {


            }
        };
    })
    .directive('exerciseDirective', function(){

        return {
            restrict: 'E',
            templateUrl: 'partials/setExercise.html',
            replace: true,
            controller: function($scope, $element, $log, restApi, $rootScope){
                // date variable for session id
                $scope.sessionID = new Date($.now());
                // exerciseData = the specific exercise and all it's metadata ex: {label: "Chest", sets: "3", order: "1", $$hashKey: "object:7"}
                // initiate the exercise variables on directive load
                // initate the $rootScope var exerciseLabel to use in the workout footer
                // initate the current $scope variabpe exerciseLabel to use localy as an id on the div element for each exercise

                $scope.exercise        = $scope.workout[$scope.$index];
                $scope.exerciseLabel    = $scope.workout[$scope.$index].label;

                if($scope.$index==0) {
                    $rootScope.exerciseLabel = $scope.workout[$scope.$index].label;
                    $rootScope.currentExerciseNum = 0;

                }

                // simulate a range with objects/array to use for ng-repeat to loop through
                $scope.range = function(count){

                    var sets = [];
                    for (var i = 0; i < count; i++) {
                        sets.push(i)
                    }
                    return sets;
                }

                // Each sets meta data of every exercise ex: {label: "Chest", order: "1", sets: "3"}
                $scope.setData      = $scope.workout[$scope.$index];
                $scope.setNum       = $scope.exercise.sets;

                //exercise scope vars for each exercise
                $scope.currentSetSaved = false;

                $scope.weightStep = 2.5;
                $scope.repsStep = 1;

                $scope.setTab = function(num, $event){
                    // handle tab class switches
                    $(".set-tab").removeClass("active-set-tab");
                    $(event.currentTarget).addClass("active-set-tab");
                    var tabNum = $($event.currentTarget).find('.itemIndex').text();
                    $scope.currentSet = tabNum;

                    $(".set-panel").removeClass('active-set-panel').addClass('inactive-set-panel');
                    $(".set-panel-" + tabNum).addClass('active-set-panel');
                }

                $(function() {
                    //Enable swiping...

                    $("#swipe-workout, .st-content").swipe( {
                        //Generic swipe handler for all directions
                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {


                            var appElement = $('.view');
                            var $scope      = angular.element(appElement).scope();
                            var objNum      = $scope.workout.length;
                            $(".set-tab").removeClass('active-set-panel').addClass('inactive-set-panel');
                            $(".set-tab-1").addClass('active-set-panel');

                            $rootScope.getNextExerciseLabel = function(workout, num){
                                $.each( workout, function( key, value ) {
                                    if(value['order']== num) {
                                        return value['label'];
                                    }
                                });
                            }

                            if($rootScope.currentExerciseNum>=0 && $rootScope.currentExerciseNum < objNum-1 && direction=="left") {
                                $scope.$apply(function () {
                                    $rootScope.currentExerciseNum = $rootScope.currentExerciseNum + 1;
                                    //$rootScope.exerciseLabel = $rootScope.getNextExerciseLabel($scope.workout, $rootScope.currentExerciseNum );
                                    $.each( $scope.workout, function( key, value ) {
                                        $log.info($rootScope.currentExerciseNum)
                                        if(value['order']== $rootScope.currentExerciseNum) {
                                            $rootScope.exerciseLabel =  value['label'];

                                        }
                                    });
                                });
                            }
                            if($rootScope.currentExerciseNum>= 1 && $rootScope.currentExerciseNum<= objNum && direction=="right") {
                                $scope.$apply(function () {
                                    $rootScope.currentExerciseNum = $rootScope.currentExerciseNum  - 1;
                                    $.each( $scope.workout, function( key, value ) {
                                        if(value['order']== $rootScope.currentExerciseNum) {
                                            $rootScope.exerciseLabel =  value['label'];
                                        }
                                    });
                                });
                            }


                        },
                        //Default is 75px, set to 0 for demo so any distance triggers swipe
                        threshold:0
                    });
                });


                $scope.setCompleted = function(set, weights, reps, $event){
                    // function call for saving the completed set
                    if($(event.currentTarget).find("span").hasClass("Avantgarde-checkmark-circle")) {

                        var apiObj = {
                            workout: $scope.setData['label'],
                            session_id: $scope.sessionID.toUTCString(),
                            user_id:$scope.user_id,
                            user_name:$scope.user_name,
                            exercise:$scope.exercise['label'],
                            set: set,
                            weights:weights,
                            reps: reps
                        }
                        $log.info(apiObj);

                        restApi.insertSet(apiObj);
                    }
                    // function call fo updating the modified set

                    // function call for handling UI-navigation to the next set or next exercise

                }

            },
            link: function (scope, el, attrs) {

            }
        };
    })
