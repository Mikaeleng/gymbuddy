/**
 * Created by mikaelen on 02/06/15.
 */

/*gymbuddy.factory('initEvent', function($http, $log, $q){
    return {
        getData: function(path){
            var deffered = $q.defer();

            $http({method:'GET', url: path}).
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

 //$tree - menu data array
 //$parent - 0
 function formatTree($tree, $parent){
 $tree2 = array();
 foreach($tree as $i => $item){
 if($item['parent_id'] == $parent){
 $tree2[$item['id']] = $item;
 $tree2[$item['id']]['submenu'] = formatTree($tree, $item['id']);
 }
 }

 return $tree2;
 }

})*/

gymbuddy.factory('buildNavigation', function($http, $log, $q){
    return {
        initBuild: function(json,level){
            $log.info(json);
            var nav = [];

            initBuild(json,level);
            function initBuild(jsonObject,currentlevel){
                /*$tree2 = array();
                foreach($tree as $i => $item){
                    if($item['parent_id'] == $parent){
                        $tree2[$item['id']] = $item;
                        $tree2[$item['id']]['submenu'] = formatTree($tree, $item['id']);
                    }
                }*/

               /* nav.push({level: 'level'+currentlevel, label : jsonObject.label, location: jsonObject.location});

                //now if this object contains groups
                if (jsonObject.hasOwnProperty('groups')) {
                    //and if it is an array
                    if (jsonObject.groups.length > 0) {
                        var nextlevel = currentlevel + 1;
                        //then for each object in groups of this object, call the function again.
                        $(jsonObject.groups).each(function (i, innerObject) {

                            //make a recursive call to the function.
                            initBuild(innerObject, nextlevel);

                        });

                    }

                }*/
            }
            return nav;
        }
    }
})