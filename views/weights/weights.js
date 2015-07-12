var weights = {
    //this css will be loaded automatically
    css:['weights/weights.css'],
    index: function ($scope, $location, restApi) {
        restApi.getWeights().then(function(data){
            $scope.weights = data.data;
        });

        $scope.editWeight = function(data){
            $location.path('add-weight/index/?id=' + data.id);
        }
    }
};