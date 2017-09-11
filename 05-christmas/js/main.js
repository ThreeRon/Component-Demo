/**
 * Created by luo on 2017/8/20.
 */

/**
 * 切换页面
 * @param elm
 * @param effect
 * @param callback
 */
function changePage(elm, effect, callback) {
    elm
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function () {
            callback && callback();
        });
}

/**
 * 中间调用
 * @constructor
 */
var Christmas = function () {
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    //观察者
    var observer = new Observer();
    // A场景页面
    new pageA(function () {
        observer.publish("completeA");
    });
    // 进入B场景
    observer.subscribe("pageB", function () {
        new pageB(function () {
           observer.publish("completeB");
        });
    });
    // 进入C场景
    observer.subscribe("pageC", function () {
        new pageC();
    });

    // 页面A-B场景切换
    observer.subscribe("completeA", function () {
        changePage($pageA, "effect-out", function () {
            observer.publish("pageB");
        });
    });
    // 页面B-C场景切换
    observer.subscribe("completeB", function () {
        changePage($pageB, "effect-in", function () {
            observer.publish("pageC");
        })
    });
}

var Christmas2 = function() {
    //页面容器元素
    var $pageB = $(".page-b");
    //构建第二个场景页面对象
    new pageB($pageB);
};

$(function () {
    // Christmas();
    Christmas2();
});
