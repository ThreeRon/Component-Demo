/**
 * Created by luo on 2017/8/20.
 */
function pageB(element, pageComplete) {

    var $boy = element.find(".christmas-boy");
    var $girl = element.find(".girl");

    var animationEnd = "animationend webkitAnimationEnd";
    
    var boyAction = {
        //走路
        walk: function () {
            var dfd = $.Deferred();
            $boy.transition({
                "right":"4.5rem"
            }, 40000, "linear", function () {
                dfd.resolve();
            });
            return dfd;
        },
        //停止走路
        stopWalk: function () {
            $boy.removeClass("boy-walk");
            $boy.addClass("boy-stand")
        },
        // 继续走路
        runWalk: function () {
            $boy.addClass("boy-run");
        },
        //解开包裹
        unwrapp: function () {
            var dfd = $.Deferred();
            $boy.addClass("boy-unwrapp");
            $boy.removeClass("boy-stand");
            $boy.one(animationEnd, function () {
                dfd.resolve();
            });
            return dfd;
        },
        // 脱衣动作
        strip: function (count) {
            $boy.addClass("boy-strip-"+count)
                .removeClass("boy-unwrapp");
        },
        // 任务拥抱（任务重叠问题处理）
        hug: function () {
            $boy.addClass("boy-hug").one(animationEnd, function () {
                $(".christmas-boy-head").show();
            });
        }
    };

    var girlAction = {
        // 站立
        standUp: function () {
            var dfd = $.Deferred();
            //站立
            setTimeout(function () {
                $girl.addClass("girl-standUp");
            }, 200)
            // 抛书
            setTimeout(function () {
                $girl.addClass(".girl-throwBook");
                dfd.resolve();
            }, 500)
            return dfd;
        },
        // 走路
        walk: function () {
            var dfd = $.Deferred();
            $girl.addClass("girl-walk");
            $girl.transition({
                "left":"4.5rem"
            }, 4000, "linear", function () {
                dfd.resolve();
            });
            return dfd;
        },
        // 停止走路
        stopWalk: function () {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand");
        },
        // 选择3D
        choose: function (callback) {
            $girl.addClass("girl-choose")
                .removeClass("walk-stop");
            $girl.one(animationEnd, function () {
                callback();
            });
        },
        // 泪奔
        weepWalk: function (callback) {
            $girl.addClass("girl-weep");
            $girl.transition({"left":"7rem"}, 1000, "linear", function () {
                $girl.addClass("walk-stop")
                    .removeClass("girl-weep");
                callback();
            });
        },
        // 拥抱
        hug: function () {
            
        }
    };

    //开始走路
    boyAction.walk()
        .then(function () {
            boyAction.stopWalk();
        })
        .then(function () {
            return boyAction.unwrapp();
        })
        .then(function () {
            setTimeout(function () {
                boyAction.strip(1);
            }, 1000);
            setTimeout(function () {
                boyAction.strip(2);
            }, 2000);
            setTimeout(function () {
                boyAction.strip(3);
            }, 3000);

            setTimeout(function () {
                boyAction.hug();
            }, 4000);
        });

    girlAction.standUp()
        .then(function () {
            return girlAction.stopWalk();
        })
        .then(function () {
            return girlAction.walk();
        })
        .then(function () {
            girlAction.choose(function () {
                girlAction.weepWalk(function () {
                    girlAction.hug();
                });
            });
        });
}