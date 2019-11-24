import './es-rotate-cube-loader.scss';
export default class EsRotateCubeLoader{
  constructor(){
    this.loaderContainer = document.querySelector('.es-rotate-cube-loader__container');
  }

  init(){
    this.hide();
  }

  hide(){
    this.loaderContainer.classList.add('es-rotate-cube-loader__container--hide');
  }

  show(){
    this.loaderContainer.classList.remove('es-rotate-cube-loader__container--hide');
  }
}