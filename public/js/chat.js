(function () {

    window.ChatController = function ChatController() {
        /** @type {string} */
        this.activeOptionSet = undefined;

        this.disableActiveOptions = function () {
            $('.response-options[data-option-set="' + this.activeOptionSet + '"]').find('.option-button').attr('disabled', true);
            this.activeOptionSet = undefined;
        }.bind(this);
    };

    $(function () {
        $('body').on('click', '.option-button', function () {
            var $btn = $(this);
            $btn.removeClass('btn-outline-primary').addClass('btn-primary');

            var $btns = $btn.closest('.response-options').find('.option-button');
            $btns.attr('disabled', true);
        });
    });
})();
