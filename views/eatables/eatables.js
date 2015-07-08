///////////////////////////
//      Dont forget to rename function variable below to initate controller / ei. controller name
///////////////////////////

var eatables = {
    //this css will be loaded automatically
    css:['eatables/eatables.css'],
    index: function ($scope, $location, restApi, $filter, $log) {
        $scope.filteredData = [];
        $scope.eatables;
        $scope.eatable = {};
        restApi.getEatables()
            .then(function(data){
            $scope.eatables = data.data;
        });

        $scope.saveEatable = function(eatable) {
            window.location.reload();
            restApi.insertEatable(eatable);

        };

        $scope.onEditChange = function(){
           $log.info($scope.filteredData.length);
            if($scope.filteredData.length <=0){

            }
        };
    }
};