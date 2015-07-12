var userSettings = {
    //this css will be loaded automatically
    css:['user-settings/user-settings.css'],
    index: function ($scope, $location) {
        $scope.var2 = "Testing";
        $scope.pageName = $location.path();

    }
};