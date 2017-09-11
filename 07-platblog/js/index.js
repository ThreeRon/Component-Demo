/**
 * Created by luo on 2017/8/31.
 */
$(function () {
   $(window).scroll(function () {
      if($(window).scrollTop() > 600){
          $('.go-top').show();
      }else {
          $('.go-top').hide();
      }
   });

   $('.go-top').click(function () {
      $('html, body').animate({scrollTop:0}, 1000);
   });

   $('.nav a').click(function () {
       //remove and add class
       $(this).addClass("active")
           .parents("li")
           .siblings("li")
           .children("a").removeClass("active");
       //slide to
       var href = $(this).attr("href");
       var pos = $(href).offset().top;
       $("html,body").animate({ scrollTop: pos }, 1000);
   });

});



