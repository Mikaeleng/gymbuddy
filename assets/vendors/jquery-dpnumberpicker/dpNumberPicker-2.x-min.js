if (dpUI === undefined)var dpUI = {data: {}, helper: {}, options: {}, versions: {}};
dpUI.helper.data2obj = function (e) {
    if (e === undefined)return false;
    var t = {};
    for (var n = 0; n < e.attributes.length; n++) {
        if ((e.attributes[n].nodeName + "").indexOf("data-") > -1) {
            var r = (e.attributes[n].nodeName + "").substring(5);
            var i = e.attributes[n].value;
            if (i.toLowerCase() == "true")i = true; else if (i.toLowerCase() == "false")i = false; else if (parseFloat(i) + "" == i)i = parseFloat(i);
            t[r] = i
        }
    }
    return t
};
dpUI.helper.formatter = function (e, t) {
    if (!t || t.length == 0)return e + "";
    var n = Math.floor(e);
    var r = e - n;
    var i = t.indexOf(".");
    var s = t.length - i - 1;
    n = n + "";
    while (n.length < i)n = "0" + n;
    r = Math.round(r * Math.pow(10, s)) + "";
    while (r.length < s)r += "0";
    return n + "." + r
};
dpUI.helper.betterParseFloat = function (e) {
    if (isNaN(parseFloat(e))) {
        if (e.length < 2)return parseFloat(e);
        return dpUI.helper.betterParseFloat(e.substring(1))
    } else return parseFloat(e)
};
dpUI.versions.numberPicker = "2.0.0";
dpUI.numberPicker = function (e, t) {
    var n = {
        start: 0, min: false, max: false, step: 1, format: false, formatter: function (e) {
            return e
        }, increaseText: "+", decreaseText: "-", onReady: function () {
        }, onMin: function () {
        }, onMax: function () {
        }, beforeIncrease: function () {
        }, beforeDecrease: function () {
        }, beforeChange: function () {
        }, afterIncrease: function () {
        }, afterDecrease: function () {
        }, afterChange: function () {
        }
    };
    $(e).each(function () {
        function s(t) {
            t = dpUI.helper.betterParseFloat(t);
            if (isNaN(t))t = e.number;
            r.removeClass("dpui-numberPicker-min").removeClass("dpui-numberPicker-max");
            e.options.beforeChange.call(e, e, e.number);
            if (e.options.min !== false && t <= e.options.min) {
                r.addClass("dpui-numberPicker-min");
                e.number = e.options.min
            } else if (e.options.max !== false && t >= e.options.max) {
                r.addClass("dpui-numberPicker-max");
                e.number = e.options.max
            } else {
                e.number = t
            }
            i.val(e.options.formatter(dpUI.helper.formatter(e.number, e.options.format)));
            e.options.afterChange.call(e, e, e.number)
        }

        var e = this;
        var r = $(e);
        e.options = $.extend(n, t);
        e.options = $.extend(e.options, dpUI.helper.data2obj(e));
        e.number = dpUI.helper.betterParseFloat(e.options.start);
        r.addClass("dpui-numberPicker").html("<button class='dpui-numberPicker-decrease'>" + e.options.decreaseText + "</button><input type='text' class='dpui-numberPicker-input' /><button class='dpui-numberPicker-increase'>" + e.options.increaseText + "</button>");
        var i = r.find(".dpui-numberPicker-input");
        i.val(e.options.formatter(dpUI.helper.formatter(e.number, e.options.format)));
        if (e.options.min !== false && e.options.start == e.options.min)r.addClass("dpui-numberPicker-min");
        if (e.options.max !== false && e.options.start == e.options.max)r.addClass("dpui-numberPicker-max");
        e.set = function (e) {
            s(e)
        };
        e.increase = function () {
            e.options.beforeIncrease.call(e, e, e.number);
            s(e.number + e.options.step);
            e.options.afterIncrease.call(e, e, e.number)
        };
        e.decrease = function () {
            e.options.beforeDecrease.call(e, e, e.number);
            s(e.number - e.options.step);
            e.options.afterDecrease.call(e, e, e.number)
        };
        r.find(".dpui-numberPicker-decrease").on("click", e.decrease);
        r.find(".dpui-numberPicker-increase").on("click", e.increase);
        i.on("change", function () {
            e.set(i.val())
        })
    })
};
(function (e) {
    e.fn.dpNumberPicker = function (e) {
        if (typeof e == "string") {
            if (e.toLowerCase() == "increase")this.each(function () {
                this.increase()
            }); else if (e.toLowerCase() == "decrease")this.each(function () {
                this.decrease()
            }); else if (e.toLowerCase() == "set" && arguments.length > 1) {
                var t = arguments[1];
                this.each(function () {
                    this.set(t)
                })
            }
        } else dpUI.numberPicker(this.selector, e)
    }
})(jQuery);