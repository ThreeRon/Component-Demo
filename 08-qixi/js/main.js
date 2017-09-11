/**
 * Created by luo on 2017/9/1.
 */

$(function () {
    var container = $("#content");
    var slides = container.find("li");

    var swipe =  Swipe(container);

    var boy = Boy();
    boy.walkRun(2000, 0.2, 0)
        .then(function () {
            swipe.scrollTo(container.width()*(slides.length-2) , 50000);
        })
        .then(function () {
            return boy.walkRun(2000, 0.4, 0);
        });


});

function Swipe(container) {

    var slideWrap = container.find("ul");
    var slides = container.find("li");

    //获取页面宽高
    var slideWidth = container.width();
    var slideHeight = container.height();

    //设置容器总宽高
    slideWrap.css({
        width:(slides.length * slideWidth) + 'px',
        height:slideHeight + 'px'
    });

    // 设置每个页面的宽高
    $.each(slides, function (index) {
        var slide = slides.eq(index);
        slide.css({
            width: slideWidth + 'px',
            height:slideHeight + 'px'
        });
    })

    var swipe = {};
    /**
     *
     * @param x         水平滚动距离
     * @param speed     滚动速度
     * @returns {swipe}
     */
    swipe.scrollTo = function (x, speed) {
        slideWrap.css({
            'transition-timing-function' : 'linear',
            'transition-duration' : speed + 'ms',
            'transform' : 'translate3d(-'+x+'px, 0px, 0px)'
        });
        return this;
    }
    return swipe;
}

function Boy() {

    var $boy = $(".charector");
    //设置小男孩位置
    var boyTop = $(".a-bg-middle").position().top + $(".a-bg-middle").height()/2 - $boy.height();
    $boy.css({
        top: boyTop+25
    });

    /**
     * 计算每段路径的移动距离
     * @param direction   方向（x，y）
     * @param proportion  相对视口的比例
     * @returns {number}  返回移动距离
     */
    function calculateDist(direction, proportion) {
        var container = $("#content");
        return (direction == 'x' ? container.width() : container.height()) * proportion;
    }
    //恢复脚步动作
    function restoreWalk() {
        $boy.removeClass("pauseWalk");
    }
    // 脚步动作
    function slowWalk() {
        $boy.addClass("slowWalk")
    }
    // 人物移动
    function run(options, runTime) {
        var dfd = $.Deferred();
        //恢复脚步动作
        restoreWalk();
        $boy.transition(options, runTime, 'linear', function () {
            dfd.resolve(); //动画完成
        });
        return dfd;
    }

    /**
     * 小男孩行走
     * @param time   行走路径花费时间
     * @param proportionX  路径X方向移动相对与视口比例
     * @param proportionX  路径Y方向移动相对与视口比例
     * @returns {*}  dfd对象
     */
    function walkRun(time, proportionX, proportionY) {
        time = time || 3000;
        //计算路径在X和Y方向移动距离
        var distX = calculateDist('x', proportionX);
        var distY = calculateDist('y', proportionY);
        //启动脚步动作
        slowWalk();
        // 移动人物距离
        var dfd = run({
            'left':distX + 'px',
            'top': distY ? distY : undefined
        },time);
        return dfd;
    }

    return {
        calculateDist : calculateDist,
        walkRun : walkRun
    }
}

