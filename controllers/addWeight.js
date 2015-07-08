'use strict';
var addWeight = {
    //this css will be loaded automatically
    css:['dashboard.css'],
    index: function ($scope, $location) {
        $scope.var1 = "Testing add-weight";
        $scope.pageName = $location.path();
    }
};