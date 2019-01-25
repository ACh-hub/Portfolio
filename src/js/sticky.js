"use strict";

const navbar = document.querySelector(".main-nav");
const sticky = navbar.offsetTop;

window.onscroll = function () {
    toggleSticky();
};

function toggleSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}