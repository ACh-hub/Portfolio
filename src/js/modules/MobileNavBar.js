import $ from "jquery";

export default class MobileNavBar {
    constructor(){
        this.menuHamburger = $(".main-nav .main-nav__link");
        this.events();
    }

    events(){
        this.menuHamburger.click(this.toggleHamburger.bind(this));
    }

    toggleHamburger(){
        this.menuHamburger.toggleClass("responsive");
    }
}
