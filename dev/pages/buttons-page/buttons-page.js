import '../../common/scss/main.scss';
import './buttons-page.scss';

import '../../elements/buttons/es-simple-button/es-simple-button.js';
import '../../elements/buttons/es-icon-button/es-icon-button.js';
import '../../elements/buttons/es-gamburger-button/es-gamburger-button.js';
import '../../elements/buttons/es-close-button/es-close-button';
import EsGamburgerButton from '../../elements/buttons/es-gamburger-button/es-gamburger-button';


window.onload = function() {
  let esGamburgerButtonConfig = {
    onClickCallback: function (isOpen) {},
  };
  let esGamburgerButton = new EsGamburgerButton(esGamburgerButtonConfig);
  esGamburgerButton.init();
};