'use strict'

var inMenu = true;

$(document).ready(function () {
    $("#favicon").attr('href', 'img/logo_34495e.png');
    setTimeout(function () {
        $("#after").fadeIn();
    }, 1500);

    setTimeout(function () {
        $(".menu-item").hover(function () {
                if (!inMenu)
                    return;
                $(this).siblings(".menu-item").find(".filling-rectangle").css("-webkit-filter", "opacity(60%)");
            },
            function () {
                $(".filling-rectangle").css("-webkit-filter", "none");
            });
    }, 500);
    recalculateRectangles();
});

$(window).resize(function () {
    $scope.$apply();
    recalculateRectangles();
});



function selectAbout() {
    inMenu = false;
    $(".about .filling-rectangle").css('width', 0);
    $(".contact .filling-rectangle").css('width', 0);
    $(".work span, .contact span, .rectangle-back").fadeOut();
    $(".menu").css("top", "20px");
    setTimeout(function () {
        $(".work .filling-rectangle").css("width", "3000px")
            .css("background-color", "white")
            .css("margin-left", "-500px")
            .css("height", "10px")
            .css("-webkit-filter", "opacity(100%)!important");
        $('.work').css("position", "fixed").css("top", "10vh");
        var barHeight = $(".work .filling-rectangle")[0].getBoundingClientRect().bottom + $(window)['scrollTop']();
        $("#about").css("margin-top", barHeight + "px");
        $("#about").show();
        setTimeout(function () {
            $("#about").css("height", "93vh");
        }, 500);
        var backHeight = Math.floor(($(".work .filling-rectangle")[0].getBoundingClientRect().bottom + $(window)['scrollTop']()) / 4);
        $(".back").css("top", backHeight);
        $(".back").show('slow');
    }, 400);
}

function goBack() {
    inMenu = true;
    $("#about").css("height", "0");
    $(".back").hide('slow');
    $(".work .filling-rectangle").css("width", "220px")
        .css("background-color", "white")
        .css("margin-left", "0")
        .css("height", "42px");
    setTimeout(function () {
        $('.work').css("position", "relative").css("top", 0);
        $("#about").hide();
        $(".menu").css("top", "150px");
        $(".work span, .contact span, .rectangle-back").fadeIn();
        $(".contact .filling-rectangle").css('width', '118px');
        $(".about .filling-rectangle").css('width', '200px');
        recalculateRectangles();
    }, 500);
    setTimeout(function () {
    }, 500);

}

function recalculateRectangles() {
    if (!inMenu)
        return;
    if ($(window).width() <= 760) {
        setTimeout(function () {

            $(".filling-rectangle").prev().css('font-size', Math.floor($(window).width() / 7));
            $(".filling-rectangle").each(function () {
                var textWidth = $(this).prev().width();
                var rectWidth = Math.floor(($(window).width() - textWidth) - 50);

                $(this).css('width', rectWidth);
                $(this).css('height', Math.floor($(this).prev().height()) / 2 + "px");
            });
        }, 800);
    }
    else {
        setTimeout(function () {
            $(".filling-rectangle").each(function () {
                var textWidth = $(this).prev().width();
                var rectWidth = Math.floor((400 - textWidth));

                $(this).css('width', rectWidth);
                $(this).css('height', Math.floor($(this).prev().height()) / 2 + "px");
            });
        }, 800);
    }
}













