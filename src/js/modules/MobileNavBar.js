import $ from "jquery";

export default class MobileNavBar {
    constructor(){
        this.menuHamburger =$("#hamburger");
        this.menuElements = $(".main-nav .main-nav__link");
        this.events();
    }

    events(){
        this.menuHamburger.click(this.toggleHamburger.bind(this));
    }

    toggleHamburger(){
        this.menuElements.toggleClass("responsive");
    }
}
