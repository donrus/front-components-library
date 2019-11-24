import '../../common/scss/main.scss';
import './loaders-page.scss';

import '../../elements/buttons/es-simple-button/es-simple-button.js';
import EsRotateCubeLoaderComponent from '../../components/indicators/loaders/es-rotate-cube-loader/es-rotate-cube-loader';


window.onload = function() {
  let esRotateCubeLoaderComponent = new EsRotateCubeLoaderComponent();
  esRotateCubeLoaderComponent.init();

  document.querySelector('.es-rotate-cube-loader__button').addEventListener('click', () =>{
    esRotateCubeLoaderComponent.show();
    setTimeout(function () {
      esRotateCubeLoaderComponent.hide();
    }, 5000);
  });
};