/**
 * Created by mikaelen on 01/06/15.
 */
'use strict';

angular.module('workoutDirectives', [])
    .directive('setDirective', function(){

        return {
            restrict: 'E',
            templateUrl: 'partials/setDirective.html',
            replace: true,
            controller: function($scope, $element, $log){



            },
            link: function (scope, el, attrs) {


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
                $scope.excerciseData = $scope.currentExcercise[$scope.$index];

                // Each sets meta data of every excercise ex: {label: "Chest", order: "1", sets: "3"}
                $scope.workoutItems = $scope.currentExcercise;
                $scope.tabNum = $scope.workoutItems[$scope.$index].sets;

                //excercise scope vars for each excercise
                $scope.currentSetSaved = "gunnar";
                $scope.weight = 42;
                $scope.weightStep = 1.25;
                $scope.reps = 6;
                $scope.repsStep = 1;

                $scope.setTab = function(num, $event){
                    // handle tab class switches
                    $(".set-tab").removeClass("active-set-tab");
                    $(event.currentTarget).addClass("active-set-tab");
                    var tabNum = $($event.currentTarget).find('.itemIndex').text();

                    $scope.currentSet = tabNum;
                    $log.info("rest: " , $scope.workoutData[$scope.currentWorkout], $scope.excerciseData)
                    $(".set-panel").removeClass('active-set-panel').addClass('inactive-set-panel');
                    $(".set-panel-" + tabNum).addClass('active-set-panel');
                }

                $scope.setCurrentSetSaved = function(value){
                    $scope.currentSetSaved = value;
                }

                $scope.range = function(count){

                    var sets = [];
                    for (var i = 0; i < count; i++) {
                        sets.push(i)
                    }
                    return sets;
                }

                $scope.setCompletedButton = function(num, $event){
                    var span = $($event.currentTarget).find("span");

                    $(span).toggleClass("Avantgarde-checkmark-circle");
                    $(span).toggleClass("Avantgarde-checkmark-unchecked");

                    $scope.setCompleted(num);
                }

                $scope.setCompleted = function(num, $event){
                    // function call for saving the completed set
                    if($(event.currentTarget).find("span").hasClass("Avantgarde-checkmark-circle")) {

                        var apiObj = {
                            workout: $scope.workoutData,
                            set: $scope.currentSet,
                            session_id: $scope.sessionID,

                        }
                        $log.info(apiObj);
                        $scope.saveSet(num);
                    }
                    // function call fo updating the modified set

                    // function call for handling UI-navigation to the next set or next excercise

                }

                $scope.saveSet = function(num){
                    /*var parent =  $scope.$parent.currentSetSaved;
                     $log.info(parent);
                     $scope.$parent.setCurrentSetSaved("troy");
                     $log.info(parent);*/


                    $log.info("rest: " , $scope.currentSet, $scope.excerciseData)

                    //$log.info($scope.currentExcercise[$scope.currentSet-1]);
                    restApi.insertSet(num);
                }
            },
            link: function (scope, el, attrs, $log) {

               // $log.info(scope.currentExcercise[scope.$index]);
            }
        };
    })
