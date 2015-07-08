var Loader = {
    scripts: {},
    styles: {},
    intervals: {},
    interval_limit: 1000,
    debug: false,
    getDebugTime: function () {
        return (Loader.debugging) ? (new Date()).getTime() : 'standard';
    },
    check: function (objectName, callback) {
    //console.log(objectName);
        if (typeof callback != "function") return false;
        Loader.intervals[objectName] = { interval: null, count: 0 };
        Loader.intervals[objectName].interval = setInterval(function () {
            if (Loader.intervals[objectName].count == Loader.interval_limit) {
                clearInterval(Loader.intervals[objectName].interval);
                return false;
            }
            if (!window[objectName]) {
                Loader.intervals[objectName].count++;
                return false;
            }
            clearInterval(Loader.intervals[objectName].interval);
            callback();
            return objectName;
        }, 1);
    },
    load: {
        js: function (path) {
            var script = document.createElement("script");

            var c = path.split("/")[1];
            path = path.replace(".js", "")//.replace("_","-");

            if (Loader.scripts[path]) return;
            script.id = "controller-"  + c.setDash();
            script.src = path + '/' + c.setDash() +".js?version=" + (Loader.getDebugTime());
            document.body.appendChild(script);
            Loader.scripts[path] = true;
        },
        css: function (path) {
            path = path.replace(".css", "");
            if (Loader.styles[path]) return;
            var elm = document.createElement("link");
            elm.href = path + ".css?version=" + (Loader.getDebugTime());
            elm.rel = "stylesheet";
            document.head.appendChild(elm);
            Loader.styles[path] = true;
        }
    }
}