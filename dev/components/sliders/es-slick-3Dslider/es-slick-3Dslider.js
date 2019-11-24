import './es-slick-3Dslider.scss';

import $ from 'jquery';
import 'slick-carousel';

export default class EsSlick3DSlider{
  constructor(){
    this.init();
  }
  init(){

    var rev = $('.es-slick-slider');
    rev.on('init', function(event, slick, currentSlide) {
      let cur = $(slick.$slides[slick.currentSlide]),
        next = cur.next(),
        prev = cur.prev();
      prev.addClass('slick-3Dprev');
      next.addClass('slick-3Dnext');
      cur.removeClass('slick-3Dnext').removeClass('slick-3Dprev');
      slick.$prev = prev;
      slick.$next = next;
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      //console.log('beforeChange');
      let
        cur = $(slick.$slides[nextSlide]);
      //console.log(slick.$prev, slick.$next);
      slick.$prev.removeClass('slick-3Dprev');
      slick.$next.removeClass('slick-3Dnext');
      let next = cur.next(),
        prev = cur.prev();
      prev.prev();
      prev.next();
      prev.addClass('slick-3Dprev');
      next.addClass('slick-3Dnext');
      slick.$prev = prev;
      slick.$next = next;
      cur.removeClass('slick-next').removeClass('slick-3Dprev');
    });

    rev.slick({
      speed: 1000,
      arrows: true,
      dots: false,
      focusOnSelect: true,
      prevArrow: '<button class="es-slick-3Dslider__prev-button"></button>',
      nextArrow: '<button class="es-slick-3Dslider__next-button"></button>',
      infinite: true,
      centerMode: true,
      slidesPerRow: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0',
      swipe: true,
      customPaging: function(slider, i) {
        return '';
      },
    });


  }
}