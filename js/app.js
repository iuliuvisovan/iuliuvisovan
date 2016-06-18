'use strict'

var inMenu = true;
var currentSection;

$(document).ready(function () {
    // showWork();
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
    recalculateRectangles();
});

//About
function showAbout() {
    currentSection = 1;
    if (!inMenu) {
        hideAbout();
        return;
    }
    inMenu = false;
    $(".about .filling-rectangle").css('width', 0);
    $(".contact .filling-rectangle").css('width', 0);
    $(".work span, .contact span, .work .rectangle-back, .contact .rectangle-back").fadeOut();
    $(".menu").css("top", "0");
    $("#after").css('-webkit-filter', 'blur(20px)');
    $("#after").css('filter', 'blur(20px)');
    $(".work .filling-rectangle").css("height", "10px");
    setTimeout(function () {
        $(".work .filling-rectangle").css("width", "3000px")
            .css("background-color", "white")
            .css("margin-left", "-500px");
        $('.work').css("position", "fixed").css("top", "32px").css('z-index', '-10');
        var barHeight = $(".work .filling-rectangle")[0].getBoundingClientRect().bottom;
        $("#about").css("margin-top", barHeight + "px");
        $("#about").show();
        setTimeout(function () {
            $("#about").css("height", "93vh");
        }, 500);
    }, 500);

}
function hideAbout() {
    inMenu = true;
    $("#about").css("height", "0");
    $(".work .filling-rectangle").css("width", "0px")
        .css("background-color", "white")
        .css("margin-left", "0");
    setTimeout(function () {
        $('.work').css("position", "relative").css("top", "initial").css('z-index', '1');
        $("#about").hide();
        $(".menu").css("top", "150px");
        $(".work span, .contact span, .rectangle-back").fadeIn();
        $(".contact .filling-rectangle").css('width', '118px');
        $(".about .filling-rectangle").css('width', '200px');
        $("#after").css('-webkit-filter', 'blur(0)');
        $("#after").css('filter', 'blur(0)');
        $(".work .filling-rectangle").css("height", "42px");
        recalculateRectangles();
    }, 500);
    setTimeout(function () {
    }, 500);
    currentSection = 0;
}

var initialWorkWidth;

//Work
function showWork() {
    currentSection = 2;
    if (!inMenu) {
        hideWork();
        return;
    }
    inMenu = false;

    $("#after").css('-webkit-filter', 'blur(20px)');
    $("#after").css('filter', 'blur(20px)');

    $('.about').addClass('animated fadeOutLeftBig');
    $('.contact').addClass('animated fadeOutRightBig');
    $('.about, .contact').hide();
    $(".menu").css("top", "0");
    $("#work").show();
    $("#work").css('width', initialWorkWidth);
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
    currentSection = 0;
    inMenu = true;
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
        $("#work").css('width', '0');
        $("#after").css('-webkit-filter', 'blur(0)');
        $("#after").css('filter', 'blur(0)');
        recalculateRectangles();
    }, 500);
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













