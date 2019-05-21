$(document).ready(function () {
    document.addEventListener('jquery.orderable.load', function (e) {
        console.log("Loaded")
    }, false);
    document.addEventListener('jquery.orderable.init', function (e) {
        console.log("Initiated")
    }, false);
    document.addEventListener('jquery.orderable.order.start', function (e) {
        console.log("Ordering started")
    }, false);
    document.addEventListener('jquery.orderable.order.cancel', function (e) {
        console.log("Ordering cancelled")
    }, false);
    document.addEventListener('jquery.orderable.order.finish', function (e) {
        console.log("Ordering finished")
    }, false);

    $("#byGroups").orderable({
        tbodyAsUnit: false
    });
});
