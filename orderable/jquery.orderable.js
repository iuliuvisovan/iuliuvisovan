if (typeof jQuery === 'undefined') {
    throw new Error('jQuery Orderable plugin requires jQuery! Make sure you load jquery.orderable after jQuery.')
}

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

        var events = {
            loaded: new Event('jquery.orderable.load'),
            initiated: new Event('jquery.orderable.init'),
            orderingStarted: new Event('jquery.orderable.order.start'),
            orderingCancelled: new Event('jquery.orderable.order.cancel'),
            orderingFinished: new Event('jquery.orderable.order.finish'),
        }

        document.dispatchEvent(events.loaded);

        init(this);

        $($(this).find('tbody tr.reordable')).on(EVENT.MOUSEDOWN, self.mouseDown);  //Listen for drag attempts on all rows of current table
        $(document).on(EVENT.MOUSEUP, self.mouseUp);                  //Listen for drop attempts on the entire document

        function mouseDown(event) {
            draggedRow = event.currentTarget;   //Definitely a row (read e.target vs e.currentTarget)
            $(draggedRow).parents('table').addClass(STATE.REORDERING);  //Set table's style
            $(draggedRow).css({ //Set its position equal to its current position, so it's ready for 'fixed'
                top: draggedRow.getBoundingClientRect().top,
                left: draggedRow.getBoundingClientRect().left
            });
            $(draggedRow).addClass(STATE.MOVING);   //Row becomes fixed, 'movable'  and can start moving
            document.dispatchEvent(events.orderingStarted);
        };

        function mouseUp(event) {
            if (!$('.' + STATE.MOVING).length)
                return;
            var movingRowPosition = $('.' + STATE.MOVING)[0].getBoundingClientRect();
            var movingRowX = movingRowPosition.left + 20;
            var movingRowTop = movingRowPosition.top;
            var movingRowBottom = movingRowPosition.bottom;
            var rowBefore = document.elementFromPoint(movingRowX, movingRowTop).parentElement;

            if (!isValidRow(rowBefore)) {
                //Check if parent row is not valid because of being at top
                var rowAfter = $(rowBefore).parent().next('tbody').find('tr').first();
                if (!isValidRow(rowAfter)) {
                    resetTable();
                    document.dispatchEvent(events.orderingCancelled);
                    return;
                }
            }

            rowAfter && $(draggedRow).insertBefore(rowAfter);
            !rowAfter && $(draggedRow).insertAfter(rowBefore);
            $(draggedRow).addClass('added');
            setTimeout(function () {
                $(draggedRow).removeClass('added');
            }, 1000);
            resetTable();
            document.dispatchEvent(events.orderingFinished);
        };

        function isValidRow(row) {
            return $(row).is('tr') && $(row).parent('tbody').length;
        }

        function resetTable() {
            $('td').css('height', '27px!important');
            $('.moving').removeClass('moving');
            $('.reordering').removeClass('reordering');
            $('.hovered').removeClass('hovered');
        }

        function init(currentElement) {
            $(currentElement).addClass('jq-ordable');

            $(document).on({
                mouseenter: function () {
                    $('.jq-ordable .hovered').removeClass('hovered');
                    $(this).addClass('hovered');
                }
            }, '.jq-ordable.reordering tbody tr');

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

            document.dispatchEvent(events.initiated);
        }


        return this;
    };
} (jQuery);