/**
 * Created by mikaelen on 10/01/16.
 */

gymbuddy.factory('jsonRequest', function($http, $log, $q){
    return {
        getData: function(path){
            var deffered = $q.defer();

            $http({method:'GET', url: path,  headers: {
                'Content-type': 'application/json'
            }}).
                success(function (data, status, headers,config){
                    deffered.resolve(data);
                    //$log.info(data,status,headers,config);
                }).
                error(function(data,status,headers,config){
                    deffered.reject(status);
                    //log.warn(data,status, headers, config);
                })
            return deffered.promise;
        }
    }
})