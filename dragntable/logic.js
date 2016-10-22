$(document).ready(function () {
    InitMouseHook();
    Reordable($("table"));
});

function Reordable(table) {
    var rowHandler = $(table).find('tr');
    var draggedRow;

    $(document).on({
        mouseenter: function () {
            $(this).toggleClass('hovered');
        },
        mouseleave: function () {
            $(this).toggleClass('hovered');
        }
    }, '.reordering tr:not(.moving)');

    $('.reordering tr:not(.moving)').on('hover',
        function () {
            alert('cool');
            $(this).toggleClass('hovered');
        },
        function () {
            $(this).toggleClass('hovered');
        }
    );

    $(rowHandler).on('mousedown', function (event) {
        draggedRow = $(this).is('tr') ? this : $(this).parent('tr')[0];
        $(draggedRow).parents('table').addClass('reordering');
        $(draggedRow).addClass('moving');
    });
    $(document).on('mouseup', function (event) {
        if (!$('.moving').length)
            return;
        droppedRow = $(event.target).is('tr') ? event.target : $(event.target).parent('tr')[0];
        if (!$(droppedRow).is('tr')) {
            $('.moving').removeClass('moving');
            $('.reordering').removeClass('reordering');
            $('.hovered').removeClass('hovered');
            return;
        }
        $('.moving').removeClass('moving');
        $('.reordering').removeClass('reordering');
        $('.hovered').removeClass('hovered');
        $(draggedRow).insertAfter(event.target.parentElement);
        $(draggedRow).addClass('added');
    })
}

function InitMouseHook() {
    $(document).mousemove(function (event) {
        $('.moving').css({
            top: event.pageY - 15,
            left: event.pageX + 10
        });
    });
}