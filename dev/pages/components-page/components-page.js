import '../../common/scss/main.scss';
import './components-page.scss';
import '../../components/datepickers/airdatepicker/css/datepicker.css';
import '../../components/form-components/inputs/es-custom-input/es-custom-input';

import AthorizationComponent from '../../components/es-autorization-block/es-authorization-block';
import RadioPlayerComponent from '../../components/es-radio-player/es-radio-player';

window.onload = function() {
  let authorizationBlock = new AthorizationComponent();
  authorizationBlock.init();

  let radioPlayer = new RadioPlayerComponent();
  radioPlayer.init();

  require('../../components/datepickers/airdatepicker/js/datepicker');
  $('#datetime').esdatepicker();
};