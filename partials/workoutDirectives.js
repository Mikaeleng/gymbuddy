/**
 * Created by mikaelen on 01/06/15.
 */
'use strict';

angular.module('workoutDirectives', [])
    .directive('setDirective', function(){
        var parDir;

        return {
            restrict: 'E',
            templateUrl: 'partials/setDirective.html',
            replace: true,
            require:'^excerciseDirective',
            controller: function($scope, $element, $log){

                // vars for each set in an excercise
                $scope.weights = 40;
                $scope.reps = 6;

                $scope.setNotSelected = function($event){
                    var span = $($event.currentTarget).parents('set-panel').find("span");
                    $log.info(span)
                }

                $scope.setCompletedButton = function(set, $event){
                    var span = $($event.currentTarget).find("span");

                    $(span).toggleClass("Avantgarde-checkmark-circle");
                    $(span).toggleClass("Avantgarde-checkmark-unchecked");

                    $scope.$parent.setCompleted(set, $scope.weights,$scope.reps, $event);
                }

            },
            link: function (scope, el, attrs, parentDirCtrl) {


            }
        };
    })
    .directive('excerciseDirective', function(){

        return {
            restrict: 'E',
            templateUrl: 'partials/setExcercise.html',
            replace: true,
            controller: function($scope, $element, $log, restApi){
                // date variable for session id
                $scope.sessionID = new Date($.now());

                // excerciseData = the specific excercise and all it's metadata ex: {label: "Chest", sets: "3", order: "1", $$hashKey: "object:7"}
                $scope.excerciseData = $scope.workout[$scope.$index];
                $scope.excercise    = $scope.workout[$scope.$index];

                // simulate a range with objects/array to use for ng-repeat to loop through
                $scope.range = function(count){

                    var sets = [];
                    for (var i = 0; i < count; i++) {
                        sets.push(i)
                    }
                    return sets;
                }

                // Each sets meta data of every excercise ex: {label: "Chest", order: "1", sets: "3"}
                $scope.setData      = $scope.workout[$scope.$index];
                $scope.setNum       = $scope.excercise.sets;

                //excercise scope vars for each excercise
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
                /*this.setCurrentSetSaved = function(value){
                    $scope.currentSetSaved = value;
                        $log.info($scope.currentSetSaved);
                }*/



                $scope.setCompleted = function(set, weights, reps, $event){
                    // function call for saving the completed set
                    if($(event.currentTarget).find("span").hasClass("Avantgarde-checkmark-circle")) {

                        var apiObj = {
                            workout: $scope.setData['label'],
                            session_id: $scope.sessionID.toUTCString(),
                            user_id:$scope.user_id,
                            user_name:$scope.user_name,
                            excercise:$scope.excerciseData['label'],
                            set: set,
                            weights:weights,
                            reps: reps
                        }
                        $log.info(apiObj);

                        restApi.insertSet(apiObj);
                    }
                    // function call fo updating the modified set

                    // function call for handling UI-navigation to the next set or next excercise

                }

            },
            link: function (scope, el, attrs, $log) {

               // $log.info(scope.currentExcercise[scope.$index]);
            }
        };
    })
