'use strict';

// Declare app level module which depends on views, and components


String.prototype.upperCaseFirst  = function () {
    var f = this.charAt(0).toUpperCase();
    return f + this.substr(1);
}

String.prototype.setDash  = function () {
    var b = this.split("-");
    var c = '';
    for (var i in b) {
        if (i == 1) {
            c += b[i].upperCaseFirst();
        } else {
            c += b[i].toLowerCase();
        }
    }
    return c;
}

var gymbuddy = angular.module('gymbuddy', ['ngRoute','frameworkDirectives', 'notificationDirectives', 'workoutDirectives','revolunet.stepper'])

    .constant('SETTINGS', (function() {
    // Define your variable
    // Use the variable in your constants
    return {

        DEFAULT_ROUTE: 'dashboard/index',
        APP: 'api/info',
        VIEWS: 'views/',
        CONTROLLERS: 'views/',
        SERVICES: 'vendors/',
        PARTIALS: 'partials/',
        NAVIGATION:'navigation/',
        CSS: 'views/',
        JSON: 'assets/json/'
    }
})());


gymbuddy.config(['$routeProvider', 'SETTINGS' ,
    function ($routeProvider, SETTINGS) {
        $routeProvider.
            when('/:name*', {
                templateUrl: function (a) {
                    var name = a.name == undefined ? a : a.name;
                    var parts = a.name.split('/');
                    //console.log(parts);
                    var page = '', part;
                    for (var i in parts) {
                        part = parts[i].split("=");
                        if (part[1] != undefined) continue;
                        if (parts[i] == '') continue;
                        page += parts[i] + '/';
                    }
                    var page = page.substr(0, page.length - 1);

                    return SETTINGS.VIEWS + page + '.html';
                },resolve: {
                    weight: function(restApi, $route){
                        var weightID = $route.current.params.id;
                        return restApi.getWeight(weightID);
                    },
                    eatable: function(restApi, $route){
                        var eatableID = $route.current.params.id;
                        return restApi.getEatable(eatableID);
                    },
                    workout: function($route){
                        var workoutname = $route.current.params.workoutname;
                        return workoutname;
                    }
                },
                controller: 'Router'
            }).
            otherwise({
                redirectTo: SETTINGS.DEFAULT_ROUTE
            });
    }]);

gymbuddy.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if(current.$$route)$rootScope.title = current.$$route.title;

    });
}]);