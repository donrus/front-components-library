(function($){
    if ($('.js-select-animal').length){
        $('.js-select-animal').children().click(function(){
            if ($(this).siblings('input').is(':disabled')){
                return false;
            }
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $(this).siblings('input').val($(this).data('value'));
        });
    }
})(jQuery)