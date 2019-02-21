export default class EsGamburgerButton{
    constructor(){
        this.buttonIsActive = false;
        this.gamburgerButton = document.querySelector(".es-gamburger-button");
        this.mobileMenu = document.querySelector(".main-menu");
        this.init();
    }
    init(){
        this.gamburgerButton.addEventListener("click", (event) => {
            event.preventDefault();
            if(this.buttonIsActive === true){
                this.gamburgerButton.classList.remove("is-active");
                this.buttonIsActive = false;
                this.mobileMenu.classList.remove("main-menu-show");
            }
            else{
                this.gamburgerButton.classList.add("is-active");
                this.buttonIsActive = true;
                this.mobileMenu.classList.add("main-menu-show");
            }
        });
        this.mobileMenu.addEventListener("click", (event) => {
            if(this.buttonIsActive === true){
                this.gamburgerButton.classList.remove("is-active");
                this.buttonIsActive = false;
                this.mobileMenu.classList.remove("main-menu-show");
            }
        });
    }
}