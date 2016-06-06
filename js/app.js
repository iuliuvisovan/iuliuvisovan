'use strict'

var iuliudotnetModule = angular.module('iuliudotnetModule', []);
var coolColors = ['#1abc9c', '#3498db', '#34495e', '#e74c3c', '#2c3e50', '#27ae60', '#16a085', '#e67e22', '#2e8ece'];
var currentThemeColor = '#1abc9c';
var inMenu = true;

iuliudotnetModule.controller('IndexController', function ($scope) {
    var width = $(window).width() / 15;
    var height = $(window).height() / 15;
    $scope.squares = new Array(Math.floor(width * height));
    $scope.squareStyle = {
        "width": $(window).width() / 30,
        "height": $(window).width() / 30
    };
    $(window).resize(function () {
        $scope.squareStyle.width = $(window).width() / 30;
        $scope.squareStyle.height = $(window).width() / 30;
        $scope.$apply();
        recalculateRectangles();
    });
    $("#favicon").attr('href', 'img/logo_34495e.png');
    setTimeout(function () {
        $("#after").fadeIn();
    }, 1500);
});

function removeTransition(item) {
    item.css('transition', '');
    item.css('-webkit-transition', '');
    item.css('-o-transition', '');
}

function addTransition(item) {
    item.css('transition', 'all 0.5s ease-in-out');
    item.css('-webkit-transition', 'all 0.5s ease-in-out');
    item.css('-o-transition', 'all 0.5s ease-in-out');
}


function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
}


$(document).ready(function () {
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


    setTimeout(function () {
        recalculateRectangles();
    }, 500);

    $(".square").each(function () {
        var randSize = Math.floor(Math.random() * 25) + 10;
        $(this).css("width", randSize % 3 == 0 ? "10" : randSize);
        $(this).css("height", randSize % 3 == 0 ? "10" : randSize);
    });
    1

    $(".square").mouseout(function (item) {
        var self = $(this);
        self.css("background-color", "rgba(255, 255, 255, 0." + ((new Date().getTime() % 3) * 3));
        setTimeout(function () {
            self.css("background-color", "rgba(255, 255, 255, 0)");
        }, 700);
    });

    function randomColor() {
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;
        return "rgba(" + r + "," + g + "," + b + ",1)";
    }

    function randomGold() {
        var r = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
        var g = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
        var b = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
        return "rgba(" + (218 + r) + "," + (165 + g) + "," + (32 + b) + ",0.4)";

    }

    function discoDot() {
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;
        $(".dot").css("background-color", randomColor());
    }

    function makeWhite() {
        var numberOfSquares = $(".square").length;
        var randIndex = Math.floor(Math.random() * numberOfSquares) + 1;
        var square = $(".square").eq(randIndex);
        var initialColor = square.css("background-color");
        square.css("background-color", "white");
    }

    function sparkle() {
        var numberOfSquares = $(".square").length;
        var randIndex = Math.floor(Math.random() * numberOfSquares) + 1;
        var square = $(".square").eq(randIndex);
        var initialColor = square.css("background-color");
        square.css("background-color", "goldenrod");
        setTimeout(function () {
            square.css("background-color", initialColor);
        }, 100);
    }

    // (function loop() {
    //     var rand = Math.round(Math.random() * (500));
    //     setTimeout(function () {
    //         if (rand > 400)
    //             sparkle();
    //         makeWhite();
    //         discoDot();
    //         loop();
    //     }, rand);
    // })();
});


function shakeLogo() {
    var animations = ['shake', 'bounce', 'flash', 'pulse', 'rubberBand', 'swing', 'tada', 'wobble', 'jello']
    var effect = animations[new Date().getTime() % 9];

    var logo = $("#logo");
    logo.removeClass();
    logo.addClass('animated ' + effect);
}

var Color = function Color(hexVal) { //define a Color class for the color objects
    this.hex = hexVal;
};

function constructColor(colorObj) {
    var hex = colorObj.hex.substring(1);
    /* Get the RGB values to calculate the Hue. */
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;

    /* Getting the Max and Min values for Chroma. */
    var max = Math.max.apply(Math, [r, g, b]);
    var min = Math.min.apply(Math, [r, g, b]);


    /* Variables for HSV value of hex color. */
    var chr = max - min;
    var hue = 0;
    var val = max;
    var sat = 0;


    if (val > 0) {
        /* Calculate Saturation only if Value isn't 0. */
        sat = chr / val;
        if (sat > 0) {
            if (r == max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g == max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b == max) {
                hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
        }
    }
    colorObj.chroma = chr;
    colorObj.hue = hue;
    colorObj.sat = sat;
    colorObj.val = val;
    colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
    colorObj.red = parseInt(hex.substring(0, 2), 16);
    colorObj.green = parseInt(hex.substring(2, 4), 16);
    colorObj.blue = parseInt(hex.substring(4, 6), 16);
    return colorObj;
};

function sortColorsByHue(colors) {
    return colors.sort(function (a, b) {
        return b.hue - a.hue;
    });
};

function sortHexArray(hexArray, domClass) {
    var colors = [];
    $.each(hexArray, function (i, v) {
        var color = new Color(v);
        constructColor(color);
        colors.push(color);
    });

    sortColorsByHue(colors);
    return colors;
}

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
    }, 500);
}

function goBack() {
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
        inMenu = true;
    }, 500);
    setTimeout(function () {
    }, 500);

}

function recalculateRectangles() {
    if ($(window).width() <= 760) {
        $(".filling-rectangle").prev().css('font-size', Math.floor($(window).width() / 7));
        setTimeout(function() {
            $(".filling-rectangle").each(function () {
                var textWidth = $(this).prev().width();
                var rectWidth = Math.floor(($(window).width() - textWidth) - 50);

                $(this).css('width', rectWidth);
                $(this).css('height', Math.floor($(this).prev().height()) / 2 + "px");
            });
        }, 500);
    }
    else {
        setTimeout(function() {
            $(".filling-rectangle").each(function () {
                var textWidth = $(this).prev().width();
                var rectWidth = Math.floor((400 - textWidth));

                $(this).css('width', rectWidth);
                $(this).css('height', Math.floor($(this).prev().height()) / 2 + "px");
            });
        }, 500);
    }
}













