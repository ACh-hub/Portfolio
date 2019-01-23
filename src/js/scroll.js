const navbar = document.querySelector(".main-header");
const sticky = navbar.offsetTop;

const spaiedDivs = Array.from(document.querySelectorAll(".content"));

window.onscroll = function () {
    toggleSticky();
    spaiedDivs.forEach(spaiedDiv=>{
        let spaiedLink = document.querySelector(`a[href*=${spaiedDiv.id}]`)
        console.log(spaiedLink);
        
        if(checkVisible(spaiedDiv))
        {
            spaiedLink.classList.add("active");
        }
        else
        {
            spaiedLink.classList.remove("active");
        }
    })

};

function checkVisible(el) {
    var rect = el.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function toggleSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}