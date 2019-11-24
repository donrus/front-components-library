import './es-custom-select-tsikloferon.scss';
import './es-custom-select-tsikloferon-feedback.scss';

export default class EsCustomSelect{
  constructor(){
    this.init();
  }
  init(){

    $('.custom-select').each(function() {
      var classes = $(this).attr('class'),
        id      = $(this).attr('id'),
        name    = $(this).attr('name');
      //var template = '<div class="custom-select__validation-output-container"><span class="custom-select__validation-output-field">Неверное значение</span></div>';
      var template =  '<div class="' + classes + '">';
      template += '<div class="custom-select-trigger">' + $(this).attr('data-placeholder') + '</div>';
      template += '<div class="custom-options-caption">' + $(this).attr('data-placeholder') + '</div>';
      template += '<div class="custom-options">';
      $(this).find('option').each(function() {
        if($(this).attr('value') === ''){

        }
        else {
          template += '<div class="custom-option ' + $(this).attr('class') + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</div>';
        }
      });
      template += '</div></div>';

      $(this).wrap('<div class="custom-select-wrapper"></div>');
      //$(this).hide();
      $(this).before(template);
    });


    $('.custom-option:first-of-type').hover(function() {
      $(this).parents('.custom-options').addClass('option-hover');
    }, function() {
      $(this).parents('.custom-options').removeClass('option-hover');
    });
    $('.custom-select-trigger').on('click', function(e) {
      $('.custom-select').removeClass('opened');
      $('html').one('click',function() {
        $('.custom-select').removeClass('opened');
      });

      $(this).parents('.custom-select').toggleClass('opened');
      e.stopPropagation();
    });
    $('.custom-option').on('click', function() {
      $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
      $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
      $(this).addClass('selection');
      $(this).parents('.custom-select').removeClass('opened');
      $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());
    });
  }
}