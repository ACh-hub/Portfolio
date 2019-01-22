window.onscroll = function() {toggleSticky()};

const navbar = document.querySelector(".main-header");
const sticky = navbar.offsetTop;

function toggleSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}