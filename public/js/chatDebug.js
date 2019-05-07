$(function() {
    var $link = $('<a class="nav-link">Show debug</a>');
    $link.on('click', function() {
        console.log("A");
        $link.detach();

        $('#view-change-button').removeClass('hide');
        $('#payload-column').removeClass('hide');
    });

    var $navItem = $('<li class="nav-item"/>');
    $navItem.append($link);

    $('#nav-left').append($navItem);
});
