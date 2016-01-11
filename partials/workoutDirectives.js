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

                $(".set-tab-1, .set-tab-2, .set-tab-3").click(function (event) {
                    // handle tab class switches

                    $(".set-tab").removeClass("active-set-tab");
                    $(event.currentTarget).addClass("active-set-tab");
                    var tabNum = $(this).find('.itemIndex').text();

                    $scope.currentSet = tabNum;
                    $log.info($scope.currentSet , $scope.currentWorkout);
                    $(".set-panel").removeClass('active-set-panel').addClass('inactive-set-panel');
                    $(".set-panel-" + tabNum).addClass('active-set-panel');


                });

            },
            link: function (scope, el, attrs) {
                $(".repsPicker").dpNumberPicker({
                    value: 5,
                    min: 1,
                    max: 20,
                    step: 1
                });

                $(".weightPicker").dpNumberPicker({
                    value: 20,
                    step: 1.25,
                    format: "#.##",
                    formatter: function(val){
                        return val;
                    }
                })



                $(".set-finished").click(function (event) {
                    if($(event.target).hasClass("Avantgarde-checkmark-unchecked")){
                        $(event.target).removeClass("Avantgarde-checkmark-unchecked");
                        $(event.target).addClass("Avantgarde-checkmark-circle");
                    }else if($(event.target).hasClass("Avantgarde-checkmark-circle")){
                        $(event.target).addClass("Avantgarde-checkmark-unchecked");
                        $(event.target).removeClass("Avantgarde-checkmark-circle");
                    }
                });
            }
        };
    })
    .directive('excerciseDirective', function(){

        return {
            restrict: 'E',
            templateUrl: 'partials/setExcercise.html',
            replace: true,
            controller: function($scope, $element, $log){
                $scope.excerciseData = $scope.currentExcercise[$scope.$index];
                $scope.workoutItems = $scope.currentExcercise;

                $scope.tabNum = $scope.workoutItems[$scope.$index].sets;

                $scope.range = function(count){

                    var sets = [];

                    for (var i = 0; i < count; i++) {
                        sets.push(i)
                    }

                    return sets;
                }
            },
            link: function (scope, el, attrs, $log) {
               // $log.info(scope.currentExcercise[scope.$index]);
            }
        };
    })
