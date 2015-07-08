'use strict';

angular.module('gymbuddy.add-weight', ['ngRoute'])

    .controller('addWeight', ['$scope', '$location', '$log', function($scope, $location, $log) {

        $scope.pageName = $location.path();
}]);