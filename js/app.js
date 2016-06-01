'use strict'

var iuliudotnetModule = angular.module('iuliudotnetModule', []);

iuliudotnetModule.controller('IndexController', function ($scope) {
    $scope.squares = new Array(100 * 36);
    $scope.squareStyle = {
        "width": $(window).width() / 30,
        "height": $(window).width() / 30
    };
    $(window).resize(function () {
        $scope.squareStyle.width = $(window).width() / 30;
        $scope.squareStyle.height = $(window).width() / 30;
        $scope.$apply();
    });
});


function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
}

$(document).ready(function () {
    var coolColors = ['#1abc9c', '#3498db', '#34495e', '#e74c3c', '#2c3e50', '#27ae60', '#16a085', '#e67e22', '#2e8ece'];
    $('body').addClass('random-color');
    setTimeout(function() {
        $('.random-color').css("background-color", coolColors[new Date().getTime() % 9]);
        $(".menu-item").hover(function () {
                $(this).siblings(".menu-item").find(".filling-rectangle").css("-webkit-filter", "opacity(60%)");
            },
            function () {
                $(".filling-rectangle").css("-webkit-filter", "none");
            });

    }, 1000);

    setTimeout(function () {
        $('.dot').addClass('small');
    }, 500);

    $(".square").each(function () {
        var randSize = Math.floor(Math.random() * 15) + 10;
        $(this).css("width", randSize % 3 == 0 ? "10" : randSize);
        $(this).css("height", randSize % 3 == 0 ? "10" : randSize);
    });1

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