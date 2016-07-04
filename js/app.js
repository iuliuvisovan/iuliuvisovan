'use strict'

var inMenu = true;
var currentSection;

$(function () {
    var $bigCircle = $(".circle");
    var $square = $(".contact-square");
    var $title = $(".contact-title");
    rotate(0);
    function rotate(degree) {
        $bigCircle.css({
            '-webkit-transform': 'rotate(' + degree + 'deg)',
            '-moz-transform': 'rotate(' + degree + 'deg)',
            '-ms-transform': 'rotate(' + degree + 'deg)',
            'transform': 'rotate(' + degree + 'deg)'
        });
        $square.css({
            '-webkit-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-moz-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-ms-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)'
        });

        $title.css({
            '-webkit-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-moz-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-ms-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)',
            '-transform': 'rotate(' + (180 + (180 - degree)) + 'deg)'
        });

        setTimeout(function () {
            rotate(degree = degree + 0.1);
        }, 10);
    }
});

$(document).ready(function () {
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

    history.pushState('home', 'iuliu.net - A developer\'s website | Home', '#');
    window.addEventListener('popstate', function () {
        if (currentSection == 1) {
            hideAbout();
            return;
        }
        if (currentSection == 2) {
            hideWork();
            return;
        }
        if (currentSection == 3) {
            hideContact();
            return;
        }
    });
    recalculateRectangles();
});

$(window).resize(function () {
    recalculateCircleSize();
    recalculateRectangles();
});

var initialTopWork;

//About
function showAbout() {
    history.pushState('about', 'iuliu.net - A developer\'s website | About', '#about');
    currentSection = 1;
    if (!inMenu) {
        hideAbout();
        return;
    }
    ga('send', 'event', 'Menu', 'show', 'About');
    inMenu = false;
    $(".about .filling-rectangle").css('width', 0);
    $(".contact .filling-rectangle").css('width', 0);
    $(".work span, .contact span, .work .rectangle-back, .contact .rectangle-back").fadeOut();
    $(".menu").css("top", "0");
    $("#after").css('-webkit-filter', 'blur(10px)');
    $("#after").css('filter', 'blur(10px)');
    $(".work .filling-rectangle").css("height", "10px");
    setTimeout(function () {
        $(".work .filling-rectangle").css("width", "3000px")
            .css("background-color", "white")
            .css("margin-left", "-500px");
        initialTopWork = $('.work').css("top");
        $('.work').css("position", "fixed").css("top", "32px").css('z-index', '-10');
        var barHeight = $(".work .filling-rectangle")[0].getBoundingClientRect().bottom;
        $("#about").css("margin-top", barHeight + "px");
        setTimeout(function () {
            $("#about").css('margin-top', $(".work .filling-rectangle")[0].getBoundingClientRect().bottom)
        }, 700);
        $("#about").show();
        setTimeout(function () {
            $("#about").css("height", "93vh");
        }, 500);
    }, 500);

}
function hideAbout() {
    history.pushState('home', 'iuliu.net - A developer\'s website | Home', '#');
    currentSection = 0;
    ga('send', 'event', 'Menu', 'hide', 'About');
    $("#about").css("height", "0");
    $(".work .filling-rectangle")
        .css("width", "0px")
        .css("background-color", "white")
        .css("margin-left", "0");
    setTimeout(function () {
        $('.work').css("position", "relative").css("top", initialTopWork).css('z-index', '1');
        $("#about").hide();
        $(".menu").css("top", "150px");
        $(".work span, .contact span, .rectangle-back").fadeIn();
        $(".contact .filling-rectangle").css('width', '118px');
        $(".about .filling-rectangle").css('width', '200px');
        $("#after").css('-webkit-filter', 'blur(0)');
        $("#after").css('-moz-filter', 'blur(0)');
        $("#after").css('-o-filter', 'blur(0)');
        $("#after").css('-ms-filter', 'blur(0)');
        $("#after").css('filter', 'blur(0)');
        $(".work .filling-rectangle").css("height", "42px");
        setTimeout(function () {
            inMenu = true;
            recalculateRectangles();
        }, 500);
    }, 500);
}

var initialWorkWidth;

//Work
function showWork() {
    history.pushState('work', 'iuliu.net - A developer\'s website | Work', '#work');
    currentSection = 2;
    if (!inMenu) {
        hideWork();
        return;
    }
    ga('send', 'event', 'Menu', 'show', 'Work');
    inMenu = false;

    $("#after").css('-webkit-filter', 'blur(15px)');
    $("#after").css('filter', 'blur(15px)');

    $('.about').addClass('animated fadeOutLeftBig');
    $('.contact').addClass('animated fadeOutRightBig');
    $('.about, .contact').hide();
    $(".menu").css("top", "0");
    $("#work").show();
    $("#work").css('width', initialWorkWidth).css("left", "0");
    setTimeout(function () {
        $("#work").css("height", "90vh");
    }, 500);

    $(".project-framework-icon").hover(function () {
        $(this).next().show('fast');
    }, function () {
        $(this).next().hide('fast');
    });
    $(".project-link").hover(function () {
        $(this).find('.icon-description').show('fast');
    }, function () {
        $(this).find('.icon-description').hide('fast');
    });

    showFrameworks();
}

function showFrameworks() {
    setTimeout(function () {
        $('.project-frameworks').each(function () {
            var currentProject = $(this);
            showFrameworksForProject(currentProject);
        });
    }, 1000);
}

function showFrameworksForProject(project) {
    var projectFrameworks = project.find('.project-framework-icon');
    projectFrameworks.each(function (index) {
        var self = $(this);
        setTimeout(function () {
            self.trigger('mouseover');
            setTimeout(function () {
                self.trigger('mouseout');
            }, 2000);
        }, index * 2000);
    });
    setTimeout(function () {
        showFrameworksForProject(project);
    }, projectFrameworks.length * 2000);

}

function hideWork() {
    history.pushState('home', 'iuliu.net - A developer\'s website | Home', '#');
    currentSection = 0;
    ga('send', 'event', 'Menu', 'hide', 'Work');

    $("#work").css("height", "0");
    setTimeout(function () {
        $(".menu").css("top", "150px");
        $('.about').removeClass('animated fadeOutLeftBig');
        $('.contact').removeClass('animated fadeOutRightBig');
        $('.about').addClass('animated fadeInLeftBig');
        $('.contact').addClass('animated fadeInRightBig');
        $(".work span, .contact span, .rectangle-back").fadeIn();
        $('.about, .contact').show();
        initialWorkWidth = $("#work").width();
        $("#work").css('width', '0').css("left", "-25px");
        $("#after").css('-webkit-filter', 'blur(0)');
        $("#after").css('filter', 'blur(0)');
        setTimeout(function () {
            $("#work").hide();
            inMenu = true;
        }, 500);
        recalculateRectangles();
    }, 500);
}

//Contact
function showContact() {
    history.pushState('contact', 'iuliu.net - A developer\'s website | Contact', '#contact');
    currentSection = 3;
    if (!inMenu) {
        hideContact();
        return;
    }
    inMenu = false;
    ga('send', 'event', 'Menu', 'show', 'Contact');
    recalculateCircleSize();

    //Hide menu
    $('.about').addClass('animated fadeOutLeftBig');
    $('.work').addClass('animated fadeOutRightBig');
    $(".contact").addClass('animated fadeOutDown');

    setTimeout(function () {
        $(".menu").hide();
        $("#contact").fadeIn();
    }, 1000);

    //Setup contact
    $(".circle a").hover(function () {
        $(".contact-link").html($(this).find(".logo-link").html());
    });
}

function hideContact() {
    history.pushState('home', 'iuliu.net - A developer\'s website | Home', '#');
    currentSection = 0;
    ga('send', 'event', 'Menu', 'hide', 'Contact');

    $(".menu").show();
    $("#contact").fadeOut();
    //Hide menu

    $('.about').removeClass('animated fadeOutLeftBig');
    $('.work').removeClass('animated fadeOutRightBig');
    $(".contact").removeClass('animated fadeOutDown');


    $('.about').addClass('animated fadeInLeftBig');
    $('.work').addClass('animated fadeInRightBig');
    $(".contact").removeClass('animated fadeInDown');
    setTimeout(function() {
        inMenu = true;
    }, 1000);

    recalculateRectangles();
}

function recalculateCircleSize() {
    var coefficient = $(window).width() / 500;
    if(coefficient > 1)
        coefficient = 1;
    $(".circle").css("-moz-transform", "scale(" + coefficient + ", " + coefficient + ");")
        .css("zoom", "0.5")
        .css("zoom", coefficient * 100 + "%");
}

function recalculateRectangles() {
    if (!inMenu)
        return;
    if ($(window).width() <= 760) {
        $(".filling-rectangle").prev().css('font-size', Math.floor($(window).width() / 7));
        setTimeout(function () {
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













