import './es-custom-animated-input.scss';

const  defaults = {
  inputContainerClassNameSelector: '.es-custom-animated-input__container',
};

export default class EsCustomAnimatedInput {

  constructor (options) {
    this.options = Object.assign(defaults, options);
    this.inputContainerElement = document.querySelector(this.options.inputContainerClassNameSelector);
  }

  init () {
    this.inputElement = this.inputContainerElement.querySelector('.es-custom-animated-input__field');
    this.inputElement.value = '';

    this.inputElement.addEventListener('focusout', (event)=>{
      if(this.inputElement.value !== ''){
        this.inputElement.classList.add('input-has-content');
      }
      else {
        this.inputElement.classList.remove('input-has-content');
      }
    });
  }
}