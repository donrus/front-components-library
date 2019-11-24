import './es-gamburger-button.scss';

const defaultConfig = {
  onClickCallback: function (isOpen) {

  },
};

export default class EsGamburgerButton{
  constructor(config = defaultConfig){
    this.buttonIsActive = false;
    this.gamburgerButton = document.querySelector('.es-gamburger-button');
    this.additionalOnClickAction = config.onClickCallback;
  }

  init(){
    this.gamburgerButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.buttonIsActive === true){
        this.gamburgerButton.classList.remove('is-active');
        this.buttonIsActive = false;
        this.additionalOnClickAction(this.buttonIsActive);
      }
      else{
        this.gamburgerButton.classList.add('is-active');
        this.buttonIsActive = true;
        this.additionalOnClickAction(this.buttonIsActive);
      }
    });
    this.mobileMenu.addEventListener('click', (event) => {
      if(this.buttonIsActive === true){
        this.gamburgerButton.classList.remove('is-active');
        this.buttonIsActive = false;
        this.additionalOnClickAction(this.buttonIsActive);
      }
    });
  }
}