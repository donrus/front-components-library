import {TweenLite} from "../../common/js/libs/TweenMax.min";

const  defaults = {
    accardionClass: 'es-custom-accordion',
    linkClass: 'es-accordion-link',
    contentClass: 'es-accordion-content',
    activeLinkClass: 'active',
    duration: .5,
}

export default class EsCustomAccordion {

    constructor( options = {} ){

        this.options = Object.assign(defaults, options);

        this.accardions = document.querySelectorAll('.' + this.options.accardionClass);

        this.animation = new TimelineLite({
            autoRemoveChildren: true,
        });
        this.animateShowTween = null;
        this.animateHideTween = null;

        this.activeElement = null;
        this.activeElementContent = null;

        this.addClickHandler(() => {
            for (var i = this.accardions.length - 1; i >= 0; i--) {
                this.accardions[i].addEventListener('click', this.clickHandler, true);
            }
        });
    }

    destroy() {
        for (var i = this.accardions.length - 1; i >= 0; i--) {
            this.accardions[i].removeEventListener('click', this.clickHandler);
        }
    }

    addClickHandler(afterAdd) {
        this.clickHandler = (event) => {

            if (event.target.classList.contains(this.options.linkClass)) {
                let clearAnimation = true;
                let activeElementContent = event.target.parentElement.querySelector('.' + this.options.contentClass);

                if (event.target.classList.contains(this.options.activeLinkClass)) {
                    this.animateHide(activeElementContent);
                    this.activeElement = null;
                    this.activeElementContent = null;
                } else {
                    if (this.activeElementContent && this.activeElementContent !== activeElementContent) {
                        this.animateHide(this.activeElementContent);
                        this.activeElement.classList.toggle(this.options.activeLinkClass);
                        clearAnimation = false;
                    }
                    this.activeElement = event.target;
                    this.activeElementContent = activeElementContent;
                    this.animateShow(activeElementContent, clearAnimation);
                    window.ga('send', 'event', 'Блок FAQ', 'Открытие вопроса');
                }
                event.target.classList.toggle(this.options.activeLinkClass);
                event.preventDefault();
            }
        };

        afterAdd();
    }

    animateShow(element, clear = true) {

        let delay = 0;
        let contentHeight = 0;

        let children = element.children;
        for (var i = children.length - 1; i >= 0; i--) {
            contentHeight += children[i].getBoundingClientRect().height;
        }

        if ( clear ) {
            this.animation.clear();
        }

        this.animation.to(element, this.options.duration, {height: contentHeight}, delay);

        this.animation.play();
    }

    animateHide(element, clear = true) {

        let delay = 0;

        if ( clear ) {
            this.animation.clear();
        }

        this.animation.to(element, this.options.duration, {height: 0}, delay);

        if ( clear ) {
            this.animation.play();
        }
    }

}
