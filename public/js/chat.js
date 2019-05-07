$(function() {
    $('body').on('click', '.option-button', function() {
        var $btn = $(this);
        $btn.removeClass('btn-outline-primary').addClass('btn-primary');

        var $btns = $btn.closest('.response-options').find('.option-button');
        console.log($btns);
        $btns.attr('disabled', true);
    });
});
