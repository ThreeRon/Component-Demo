/**
 * Created by luo on 2017/8/25.
 */
$(function () {

    var container = $(".container");
    var loader = $(".loader");
    var imgSrc = "http://www.wookmark.com/api/json/popular?callback=?";
    var iWidth = 150; //列宽
    var iSpace = 10;  //列间距
    var iOuterWidth = iWidth + iSpace;
    var iCells = 0;
    var arrLeft = [], arrTop = [];
    var timeOutId = 0;

    init();
    loadData();

    function renderPos(element) {
        var colnum = getMin();
        element.animate({
            left : arrLeft[colnum],
            top  : arrTop[colnum],
            border:'1px solid #eee'
        });
        arrTop[colnum] = arrTop[colnum] + element.outerHeight() + 10;
    }

    function aa(data) {
        alert(data[0]);
    }

    /**
     * 加载图片
     */
    function loadData() {
        loader.show();
        $.getJSON(imgSrc, function (data) {
            for(var i=0; i<data.length; i++){
                var img = $("<img>");
                var imgHeight = 0;
                if(data[i].width != 0) {
                    imgHeight = iWidth / Number(data[i].width) * Number(data[i].height);
                }
                img.attr("src", data[i].image);
                img.css({
                    'width' : iWidth,
                    'height': imgHeight
                });
                renderPos(img);
                container.append(img);
                loader.hide();
            }
        });
    }

    /**
     * 初始化
     */
    function init() {
        iCells = getCells();  //列数
        resetPos(); //位置
    }

    /**
     * 获取最小列高
     * @returns {number}
     */
    function getMin() {
        var min = arrTop[0];
        var min_index = 0;
        for(var i=1; i<arrTop.length; i++){
            if(arrTop[i] < min){
                min = arrTop[i];
                min_index = i;
            }
        }
        return min_index;
    }

    /**
     * 重置位置
     */
    function resetPos() {
        arrLeft.length = 0;
        arrTop.length = 0;
        for(var i=0; i<iCells; i++){
            arrLeft.push(i*iOuterWidth);
            arrTop.push(0);
        }
    }

    /**
     * 获取列数
     * @returns {number}
     */
    function getCells() {
        var cellNum = Math.floor($(window).innerWidth()/iOuterWidth);
        container.css("width", iOuterWidth*cellNum - iSpace);
        return cellNum;
    }

    $(window).on('scroll', function () {
        var a_1 = arrTop[getMin()];
        var a_2 = container.offset().top;
        var b_1 = $(window).scrollTop();
        var b_2 = $(window).innerHeight();
        if(a_1+a_2 < b_1+b_2){
            loadData();
        }
    });

    $(window).resize( function () {
        if(iCells !== getCells()){
            clearTimeout(timeOutId);
            timeOutId = setTimeout(function () {
                init();
                var imgs = container.find("img");
                var len = imgs.length;
                for(var i=0; i<len; i++){
                    renderPos($(imgs[i]));
                }
            },1000);
        }
    });

});
