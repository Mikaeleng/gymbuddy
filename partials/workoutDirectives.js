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

                $("#set-one-tab").click(function (event) {
                    $("#set-one-panel").removeClass("hidden");
                    $("#set-one-tab").addClass("active-set-tab");
                    $("#set-two-tab, #set-three-tab").removeClass("active-set-tab");
                    $("#set-two-panel, #set-three-panel").addClass("hidden");
                });

                $("#set-two-tab").click(function (event) {
                    $("#set-two-panel").removeClass("hidden");
                    $("#set-two-tab").addClass("active-set-tab");
                    $("#set-one-tab, #set-three-tab").removeClass("active-set-tab");
                    $("#set-one-panel, #set-three-panel").addClass("hidden");
                });

                $("#set-three-tab").click(function (event) {
                    $("#set-three-panel").removeClass("hidden");
                    $("#set-three-tab").addClass("active-set-tab");
                    $("#set-one-tab, #set-two-tab").removeClass("active-set-tab");
                    $("#set-one-panel, #set-two-panel").addClass("hidden");
                });

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
