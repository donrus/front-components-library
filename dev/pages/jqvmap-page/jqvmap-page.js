import '../../common/scss/main.scss';
import './jqvmap-page.scss';

jQuery(document).ready(function () {
  jQuery('#vmap').vectorMap({
    map: 'russia_ru',
    pins: {
      cr: {
        x: -40,
        y: -20,
        id: 'cr-pin',
      },
    },
    pinMode: 'id',
    backgroundColor: '#000',
    borderColor: '#fff',
    borderOpacity: 0.25,
    borderWidth: 1,
    color: '#000',
    enableZoom: false,
    showTooltip: false,
    hoverColor: '#000',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    selectedColor: '#000',
    selectedRegions: null,
    onRegionOver: function (element, code, region) {
      $('#jqvmap1_' + code).attr({
        stroke: '#fff',
        'stroke-opacity': '1',
      });
    },
    onRegionOut: function (element, code, region) {
      $('#jqvmap1_' + code).attr({
        stroke: '#818181',
        'stroke-opacity': '0.25',
      });
    },
  });
});
