/**
 * Created by mikaelen on 01/06/15.
 */
'use strict';

angular.module('notificationDirectives', [])
    .directive('notificationHeader', function(){

        return {
            restrict: 'E',
            templateUrl: 'partials/notificationHeader.html',
            replace: true,
            controller: function($scope, $element, $log){


            },
            link: function (scope, el, attrs) {

            }
        };
    })
