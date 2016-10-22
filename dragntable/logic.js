$(document).ready(function () {
    $("table").orderable();
});

+function ($) {
    $.fn.orderable = function () {
        var self = this;

        var draggedRow; //Reference to the currently dragged/pulled table row
        var mouseY;     //The position on the Y axis of the mouse

        self.mouseDown = mouseDown;
        self.mouseUp = mouseUp;
        self.resetTable = resetTable;

        const EVENT = {
            MOUSEDOWN: 'mousedown touchstart',
            MOUSEUP: 'mouseup touchend'
        };
        const STATE = {
            MOVING: 'moving',
            HOVERED: 'hovered',
            REORDERING: 'reordering',
        };

        init();

        $($(this).find('tbody tr')).on(EVENT.MOUSEDOWN, self.mouseDown);  //Listen for drag attempts on all rows of current table
        $(document).on(EVENT.MOUSEUP, self.mouseUp);                  //Listen for drop attempts on the entire document

        function mouseDown(event) {
            draggedRow = event.currentTarget;   //Definitely a row (read e.target vs e.currentTarget)
            $(draggedRow).parents('table').addClass(STATE.REORDERING);  //Set table's style
            $(draggedRow).css({ //Set its position equal to its current position, so it's ready for 'fixed'
                top: draggedRow.getBoundingClientRect().top,
                left: draggedRow.getBoundingClientRect().left
            });
            $(draggedRow).addClass(STATE.MOVING);   //Row becomes fixed, 'movable'  and can start moving
        };

        function mouseUp(event) {
            if (!$('.' + STATE.MOVING).length)
                return;
            var movingRowPosition = $('.' + STATE.MOVING)[0].getBoundingClientRect();
            var movingRowX = movingRowPosition.left + 20;
            var movingRowTop = movingRowPosition.top;
            var rowBefore = document.elementFromPoint(movingRowX, movingRowTop).parentElement;

            if (!$(rowBefore).is('tr')) {
                resetTable();
                return;
            }

            resetTable();
            $(draggedRow).insertAfter(rowBefore);
            $(draggedRow).addClass('added');
            setTimeout(function () {
                $(draggedRow).removeClass('added');
            }, 2000);
        };

        function resetTable() {
            $('.moving').removeClass('moving');
            $('.reordering').removeClass('reordering');
            $('.hovered').removeClass('hovered');
        }

        function init() {
            $(document).on({
                mouseenter: function () {
                    $('.hovered').removeClass('hovered');
                    $(this).addClass('hovered');
                }
            }, '.reordering tbody tr');

            $(document).on('touchmove mousemove', function (event) {
                if (event.changedTouches) {
                    mouseY = event.changedTouches[event.changedTouches.length - 1].pageY;
                } else {
                    mouseY = event.pageY;
                }
                if (!$('.moving')[0])
                    return;
                var movingRowPosition = $('.moving')[0].getBoundingClientRect();
                var movingRowX = movingRowPosition.left + 20; //Make sure its not a border or something
                var movingRowTop = movingRowPosition.top;
                var rowBefore = document.elementFromPoint(movingRowX, movingRowTop).parentElement;
                $('.hovered').removeClass('hovered');
                $(rowBefore).addClass('hovered');
                $('.moving').css({
                    top: mouseY - 15,
                });
            });
        }


        return this;
    };
} (jQuery);