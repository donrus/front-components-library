import './es-autorization-block.scss';

export default class EsAuthorizationBlock{
  constructor(){
  }

  init(){
    document.querySelector('.es-autorization-block__login-link')
      .addEventListener('click', (event) => {
        appData.appUI.loginModalWindow.show();
      });

    document.querySelector('.es-autorization-block__registration-link')
      .addEventListener('click', (event) => {
        appData.appUI.registrationModalWindow.show();
      });

    document.querySelector('.es-autorization-block__exit-button')
      .addEventListener('click', (event) => {
        this.setLogoutState();
      });
    document.querySelector('.es-autorization-block__enter-button')
      .addEventListener('click', (event) => {
        this.setLogoutState();
      });
    document.querySelector('.es-autorization-block__user-link')
      .addEventListener('click', (event) => {
        //генерация контента личного кабинета
        appData.appUI.authorizationComponent.enterIntoPersonalCabinet();
        // event.stopPropagation();
        // event.preventDefault();
      });
  }

  setLoginState(userData) {
    appData.appData.auth.isLogined = true;
    document.querySelector('.es-autorization-block__register-login-block').style.display = 'none';
    document.querySelector('.es-autorization-block__avatar-icon').style.display = 'inline-block';
    //установить имя и фамилию пользователя
    document.querySelector('.es-autorization-block__user-link').textContent = userData;
    document.querySelector('.es-autorization-block__user-link').style.display = 'inline-block';
    document.querySelector('.winners__my-results-link').style.display = 'block';
    if (document.body.clientWidth < 768) {
      document.querySelector('.es-autorization-block__enter-button').style.display = 'inline-block';
    } else {
      document.querySelector('.es-autorization-block__exit-button').style.display = 'inline-block';
    }
    appData.appUI.askQuestionForm.formObject[1].value = userData;
    appData.appUI.askQuestionForm.formObject[2].value = appData.appData.auth.userData.email;
    appData.appUI.askQuestionForm.formObject[1].style.pointerEvents = 'none';
    appData.appUI.askQuestionForm.formObject[2].style.pointerEvents = 'none';
  }

  setLogoutState(){
    appData.appData.auth.isLogined = false;
    document.querySelector('.es-autorization-block__register-login-block').style.display = 'inline-block';
    document.querySelector('.es-autorization-block__avatar-icon').style.display = 'none';
    document.querySelector('.es-autorization-block__user-link').style.display = 'none';
    document.querySelector('.winners__my-results-link').style.display = 'none';
    document.querySelector('.es-autorization-block__exit-button').style.display = 'none';
    document.querySelector('.es-autorization-block__enter-button').style.display = 'none';
    appData.appData.auth.logout();
    document.querySelector('.main-menu__link[href=\'#main-page\']').click();
    appData.appUI.askQuestionForm.formObject[1].value = '';
    appData.appUI.askQuestionForm.formObject[2].value = '';
    appData.appUI.askQuestionForm.formObject[1].style.pointerEvents = 'auto';
    appData.appUI.askQuestionForm.formObject[2].style.pointerEvents = 'auto';
  }

  deactivateCabinetLink(){
    document.querySelector('.es-autorization-block__user-link').style.pointerEvents = 'none';
  }
  activateCabinetLink(){
    document.querySelector('.es-autorization-block__user-link').style.pointerEvents = 'auto';
  }

  enterIntoPersonalCabinet(){
    appData.appUI.personalCabinet.fillCabinetHeader();
    appData.appUI.personalCabinet.getPostsStatusListFromServer();
    appData.appUI.personalCabinet.getPostsListFromServer();
  }

}