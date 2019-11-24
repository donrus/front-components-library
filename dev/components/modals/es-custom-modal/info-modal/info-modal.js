import './info-modal.scss';

import modalWindowComponent from '../es-custom-modal';

export default class InfoModal{
  constructor(){
    this.modalWindow = {};
    this.infoMessageElementDOM = document.querySelector('.info-modal__message');
    this.okButtonElement = document.querySelector('.info__ok-button');
  }
  init(){
    this.modalWindow = new modalWindowComponent(
      {
        windowName: 'info',
        buttonOpenClassName: '',
        //buttonOpenClassName: ".es-radio-player__button-container",
        buttonCloseClassName: '.modal-close-button__info',
      }
    );
    this.okButtonElement.addEventListener('click', (event) => {
      this.hide();
    });
  }

  setMessage(messageText) {
    this.infoMessageElementDOM.innerHTML = messageText;
  }

  show(){
    this.modalWindow.openModal();
  }

  hide(){
    this.modalWindow.closeModal();
  }
}