import './es-custom-modal.scss';

export default class EsModalWindow {
  constructor(opts) {
    this._body = document.body;
    this._scrollTop = 0;
    this.modalWindowsParameters = opts;
    this.modalWindowElements = {};
    this.init();
  }
  init(){

    this.modalWindowElements.modalWindowContainerElement = document.querySelector('.modal-container__' + this.modalWindowsParameters.windowName);
    this.modalWindowElements.modalWindowBackgroundElement = document.querySelector('.modal-background__' + this.modalWindowsParameters.windowName);
    this.modalWindowElements.modalWindowSectionElement = document.querySelector('.modal-section__' + this.modalWindowsParameters.windowName);
    this.modalWindowElements.buttonOpenElement = (this.modalWindowsParameters.buttonOpenClassName) ? document.querySelector(this.modalWindowsParameters.buttonOpenClassName) : undefined;
    this.modalWindowElements.buttonCloseElement = (this.modalWindowsParameters.buttonCloseClassName) ? document.querySelector(this.modalWindowsParameters.buttonCloseClassName) : undefined;
    this.modalWindowElements.additionalInitFunction = this.modalWindowsParameters.additionalInitFunction;

    this.addEventListenersForOpeningWindow();
    this.addEventListenersForClosingWindow();
  }

  modalsDisappearing() {
    if(this.modalWindowElements.modalWindowContainerElement.classList.contains('appearing')){
      this.modalWindowElements.modalWindowContainerElement.classList.add('disappearing');
    }
  }

  openModal() {
    this.modalsDisappearing();
    this.scaleModalWindow();

    this.modalWindowElements.modalWindowContainerElement.classList.add('before-appearing');
    this.alignWindowVertical();
    this.modalWindowElements.modalWindowContainerElement.classList.remove('disappearing');
    this.modalWindowElements.modalWindowContainerElement.classList.add('appearing');
    document.body.classList.add('modal-active');
    if (this.modalWindowElements.additionalInitFunction){
      this.modalWindowElements.additionalInitFunction();
    }

    if (window.outerWidth >= 576){
      this._hideScroll();
    }
  }

  closeModal() {

    this.modalWindowElements.buttonCloseElement.classList.add('close-animation');
    setTimeout(function () {
      this.modalWindowElements.buttonCloseElement.classList.remove('close-animation');
    }.bind(this), 1000);

    this.modalsDisappearing();
    //modalWindow.modalWindowContainerElement.classList.remove("appearing");
    document.body.classList.remove('modal-active');
    if (window.outerWidth >= 576){
      this._showScroll();
    }
    setTimeout(function () {
      this.modalWindowElements.modalWindowContainerElement.classList.remove('before-appearing');
    }.bind(this),1000);
  }

  addEventListenersForOpeningWindow(){

    if (!this.modalWindowElements.buttonOpenElement){
      return;
    }

    let modalOpenningWindow = (event) => {
      this.openModal();
    };

    this.modalWindowElements.buttonOpenElement.addEventListener('click', modalOpenningWindow);
  }

  addEventListenersForClosingWindow(){

    if (this.modalWindowElements.buttonCloseElement){
      this.modalWindowElements.buttonCloseElement.addEventListener('click', (event) => {
        this.closeModal();
      });
    }

    if (this.modalWindowElements.modalWindowBackgroundElement){
      this.modalWindowElements.modalWindowBackgroundElement.addEventListener('click', (event) => {
        this.closeModal();
      });
    }

    if (this.modalWindowElements.modalWindowSectionElement){
      this.modalWindowElements.modalWindowSectionElement.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

  }

  _hideScroll() {
    this._body.classList.add('no-scroll');
    this._scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
    this._body.style.position = 'fixed';
    if (this._hasScrollbar()) {
      // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
      this._body.style.width = `calc(100% - ${this._getScrollbarSize()}px)`;
    } else {
      this._body.style.width = '100%';
    }
    this._body.style.top = -this._scrollTop + 'px';
  }

  _getScrollbarSize() { // получение ширины скролла
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  _hasScrollbar() { // проверка на боковой скролл
    //return false;
    return document.body.scrollHeight > document.body.clientHeight;
  }
  _showScroll() {
    this._body.classList.remove('no-scroll');

    this._body.style.position = '';
    this._body.style.width = '';
    this._body.style.top = '';
    window.scroll(0, this._scrollTop);
  }

  scaleModalWindow(){
    if (window.outerWidth <= 576){
      let scaleValue = window.innerWidth/576;
      let scale = 'scale(' + scaleValue + ')';
      this.modalWindowElements.modalWindowContainerElement.style.transformOrigin = 'top left';
      this.modalWindowElements.modalWindowContainerElement.style.transform = scale;
      let modalWindowHeight = 100 * 1/scaleValue + '%';
      this.modalWindowElements.modalWindowContainerElement.style.height = modalWindowHeight;
    }
  }

  alignWindowVertical(){
    let modalSection = this.modalWindowElements.modalWindowSectionElement;
    let modalBackground = this.modalWindowElements.modalWindowBackgroundElement;
    if (modalSection.clientHeight+100 >= modalBackground.clientHeight){
      modalBackground.style.alignItems = 'flex-start';
    }
    else{
      modalBackground.style.alignItems = 'center';
    }
  }
}