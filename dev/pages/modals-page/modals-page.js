import '../../common/scss/main.scss';
import './modals-page.scss';

import '../../elements/buttons/es-simple-button/es-simple-button.js';
import InfoModal from '../../components/modals/es-custom-modal/info-modal/info-modal';


window.onload = function() {
  let infoWindow = new InfoModal();
  infoWindow.init();

  document.querySelector('.es-custom-modal__button').addEventListener('click', () =>{
    infoWindow.show();
  });
};