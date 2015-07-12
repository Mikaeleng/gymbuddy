///////////////////////////
//      Dont forget to rename function variable below to initate controller / ei. controller name
///////////////////////////

var eatables = {
    //this css will be loaded automatically
    css:['eatables/eatables.css'],
    index: function ($scope, $location, restApi, $filter,$route, $log) {
        $scope.filteredData = [];
        $scope.eatables;
        $scope.eatable = {};
        restApi.getEatables()
            .then(function(data){
            $scope.eatables = data.data;
        })
            .catch(function(response) {
                console.error('Tell notification framework that something went wrong: ->', response.status, response.data);
            })
            .finally(function() {
                console.log("Tell notification framework you are finished");
            });

        $scope.cancelEdit = function(){
          $route.reload();
        };

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