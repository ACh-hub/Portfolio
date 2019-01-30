import $ from "jquery";

export default class MobileNavBar {
    constructor(){
        this.menuHamburger = $(".menu-toggle");
        this.events();
    }

    events(){
        this.menuHamburger.click(this.toggleHamburger.bind(this));
    }

    toggleHamburger(){
        $('ul').toggleClass('opening');
        $(this).toggleClass('open');
    }
}
