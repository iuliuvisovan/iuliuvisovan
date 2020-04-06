$(document).ready(function(){
    $(".separator").css("display", "block");
    $(".separator2").css("display", "block");
    $(".logo-reflected-small, .logo-reflected").css("display","inline-block");

    $(".logo-reflected-small, .logo-reflected").css("margin-left","-600px");
    $(".logo-reflected-small, .logo-reflected").animate({marginLeft: 0}, 2800);

    $(".separator").css("margin-left", "-600px");
    $(".separator").css("margin-right", "1000px");
    $(".separator").animate({marginLeft: -40}, 2000);
    $(".separator").animate({marginRight: 0}, 1200);

    $(".separator2").css("margin-left", "600px");
    $(".separator2").animate({marginLeft: 1}, 2500);

    $(".projects").css("opacity", "0");
    $(".projects").animate({opacity: 1}, 4000);

    $(".title").css("opacity", "0");
    $(".title").animate({opacity: 1}, 5000);

    $(".social").css("padding-left", "1200px");
    $(".social").animate({paddingLeft: 5}, 2000);
})