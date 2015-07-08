var userSettings = {
    //this css will be loaded automatically
    //css:['dashboard.css'],
    index: function ($scope, $location) {
        $scope.var2 = "Testing";
        $scope.pageName = $location.path();

    }
};