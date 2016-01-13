gymbuddy.controller("Router", function ($scope, $route, $http, $routeParams, $filter, $injector, $location, SETTINGS, $rootScope) {
    var a = window.location.hash.replace("#/","").split("/"), b = a[0].replace("-","_"), c = '', d, e = '', f, g = {}, h, i;
    /*
    a = array with controller name and page/template name
    b = page, and name of template
    c = name of controller(String)
    d = Controller (Object)
    e = page, and name of template
    f = controller function script (function)
    h = page, and name of template
    */
    if(b =="add_workout"){
        $rootScope.add_workout = true;
    }else{
        $rootScope.add_workout = false;
    }
    c = a[0];
    // makes dynamic controller for template
    d = { $scope: $scope, $http: $http, $routeParams: $routeParams, $filter: $filter, $location: $location };
    for (var i in a) {
        if (a[i] == '') continue; h = a[i].split("=");
        if (h[1] == undefined) { e = a[i]; continue; }
        e[h[0]] = h[1]; g[h[0]] = h[1];
    }
    d['$action'] = e;
    Loader.load.js(SETTINGS.CONTROLLERS + c);

    // assigns controller to template (( needs add-weight for search path to route
    var j = c.setDash();
    Loader.check(j, function () {
        f = window[j][e];
        if (window[j].css != undefined && window[j].css.length > 0) {
            for (var i in window[j].css) Loader.load.css(SETTINGS.CSS + window[j].css[i].replace(".css", "") + ".css");
        }
        $route.routes['/:name*'].controller = f;
        $route.reload();
        setInterval(function () {
            $route.routes['/:name*'].controller = 'Router';
        }, 200);
    });
});