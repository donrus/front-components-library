
export default class modalWindows {
    constructor(opts) {
        this._body = document.body;
        this._scrollTop = 0;
        this.modalWindowsParameters = opts;
        this.modalWindowsElementsArray = [];
        this.init();
    }
    init(){
        for (let i = 0; i < this.modalWindowsParameters.length; i++){
            let modalWindowElements = {};
            modalWindowElements.modalWindowContainerElement = document.querySelector(".modal-container__" + this.modalWindowsParameters[i].windowName);
            modalWindowElements.modalWindowBackgroundElement = document.querySelector(".modal-background__" + this.modalWindowsParameters[i].windowName);
            modalWindowElements.modalWindowSectionElement = document.querySelector(".modal-section__" + this.modalWindowsParameters[i].windowName);
            modalWindowElements.buttonOpenElement = (this.modalWindowsParameters[i].buttonOpenClassName) ? document.querySelectorAll(this.modalWindowsParameters[i].buttonOpenClassName) : undefined;
            modalWindowElements.buttonCloseElement = (this.modalWindowsParameters[i].buttonCloseClassName) ? document.querySelectorAll(this.modalWindowsParameters[i].buttonCloseClassName) : undefined;
            //modalWindowElements.buttonCloseElement = document.querySelector(".active-button.modal-close-button__" + this.modalWindowsParameters[i].windowName);
            modalWindowElements.advancedCloseElement = document.querySelectorAll(this.modalWindowsParameters[i].advancedCloseClassName);
            modalWindowElements.additionalInitFunction = this.modalWindowsParameters[i].additionalInitFunction;
            modalWindowElements.modalWindowContainerElement.querySelectorAll('.modal-close-button').forEach(function(element){
                element.classList.remove('active-button');
                modalWindowElements.buttonCloseElement.forEach(function(closeElement){
                    if (element === closeElement) {
                        element.classList.add('active-button');
                    }
                });
            });
            this.modalWindowsElementsArray.push(modalWindowElements);
        }
        this.addEventListenersForOpeningWindow();
        this.addEventListenersForClosingWindow();
    }

    modalsDisappearing() {
        for (let i = 0; i < this.modalWindowsElementsArray.length; i++){
            if(this.modalWindowsElementsArray[i].modalWindowContainerElement.classList.contains("appearing")){
                this.modalWindowsElementsArray[i].modalWindowContainerElement.classList.add("disappearing");
            }
        }
    };

    openModal(modalWindow) {
        this.modalsDisappearing();
        this.scaleModalWindow(modalWindow);

        modalWindow.modalWindowContainerElement.classList.add("before-appearing");
        this.alignWindowVertical(modalWindow);
        //document.body.scrollTop = document.documentElement.scrollTop = 0;
        modalWindow.modalWindowContainerElement.classList.remove("disappearing");
        modalWindow.modalWindowContainerElement.classList.add("appearing");
        document.body.classList.add("modal-active");
        if (modalWindow.additionalInitFunction){
            modalWindow.additionalInitFunction();
        }

        if (window.outerWidth >= 576){
            this._hideScroll();
        }
    }

    closeModal(modalWindow) {

        let self = this;
        modalWindow.buttonCloseElement.forEach(function(element){
            if(!modalWindow.buttonCloseElement[0].classList.contains("close-animation")) {
                modalWindow.buttonCloseElement[0].classList.add("close-animation");
                setTimeout(function () {
                    modalWindow.buttonCloseElement[0].classList.remove("close-animation");
                }.bind(self), 1000);
            }
        });
        this.modalsDisappearing();
        //modalWindow.modalWindowContainerElement.classList.remove("appearing");
        document.body.classList.remove("modal-active");
        if (window.outerWidth >= 576){
            this._showScroll();
        }
        setTimeout(function () {
            modalWindow.modalWindowContainerElement.classList.remove("before-appearing");
        },1000);
    }

    addEventListenersForOpeningWindow(){
        for (let i = 0; i < this.modalWindowsElementsArray.length; i++){

            if (!this.modalWindowsElementsArray[i].buttonOpenElement){
                continue;
            }

            let modalOpenningWindow = (event) => {
                this.openModal(this.modalWindowsElementsArray[i]);
            };

            this.modalWindowsElementsArray[i].buttonOpenElement.forEach(function(element){
                element.addEventListener("click", modalOpenningWindow);
            });
        }
    }

    addEventListenersForClosingWindow(){
        for (let i = 0; i < this.modalWindowsElementsArray.length; i++){

            let self = this;

            if (this.modalWindowsElementsArray[i].buttonCloseElement){
                this.modalWindowsElementsArray[i].buttonCloseElement.forEach(function(element){
                    element.addEventListener("click", (event) => {
                        self.closeModal(self.modalWindowsElementsArray[i]);
                    });
                });
            }

            if (this.modalWindowsElementsArray[i].modalWindowBackgroundElement) {
                this.modalWindowsElementsArray[i].modalWindowBackgroundElement.addEventListener("click", (event) => {
                    if (this.modalWindowsElementsArray[i].modalWindowBackgroundElement == event.target) {
                        self.closeModal(self.modalWindowsElementsArray[i]);
                    }
                })
            }

            if (this.modalWindowsElementsArray[i].advancedCloseElement) {
                this.modalWindowsElementsArray[i].advancedCloseElement.forEach(function(element){
                    element.addEventListener("click", (event) => {
                        if (element == event.target) {
                            self.closeModal(self.modalWindowsElementsArray[i]);
                        }
                    });
                });
            }
        }
    }

    show(windowName) {
        for (let i = 0; i < this.modalWindowsElementsArray.length; i++){
            if(this.modalWindowsParameters[i].windowName === windowName){
                this.openModal(this.modalWindowsElementsArray[i]);
            }
        }
    }

    hide(windowName) {
        for (let i = 0; i < this.modalWindowsElementsArray.length; i++){
            if(this.modalWindowsParameters[i].windowName === windowName){
                this.closeModal(this.modalWindowsElementsArray[i]);
            }
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

    scaleModalWindow(modalWindow){
        if (window.outerWidth <= 576){
            let scaleValue = window.innerWidth/576;
            let scale = 'scale(' + scaleValue + ')';
            modalWindow.modalWindowContainerElement.style.transformOrigin = "top left";
            modalWindow.modalWindowContainerElement.style.transform = scale;
            let modalWindowHeight = 100 * 1/scaleValue + "%";
            modalWindow.modalWindowContainerElement.style.height = modalWindowHeight;
        }
    }

    alignWindowVertical(modalWindow){
        let modalSection = modalWindow.modalWindowSectionElement;
        let modalBackground = modalWindow.modalWindowBackgroundElement;
        if (modalSection.clientHeight+100 >= modalBackground.clientHeight){
            modalBackground.style.alignItems = "flex-start";
        }
        else{
            modalBackground.style.alignItems = "center";
        }
    }
}