"use strict";

const navbar = document.querySelector(".main-header");
const sticky = navbar.offsetTop;
const spaiedDivs = Array.from(document.querySelectorAll(".content"));
const contactDiv = document.getElementById("section-contact");
const portfolioDiv = document.getElementById("section-portfolio");

window.onload= function () {
    contactDiv.addEventListener("mouseenter", toggleActive);
    portfolioDiv.addEventListener("mouseenter", toggleActive);
    };

    
    function toggleActive(e) {
        spaiedDivs.forEach(spaiedDiv=>{
            let spaiedLink = document.querySelector(`a[href*=${spaiedDiv.id}]`);
            if(spaiedDiv.id != e.target.id){
                spaiedLink.classList.remove("active");
            }
            else
            {
                spaiedLink.classList.add("active");
            }
        })
        
    }

window.onscroll = function () {
    toggleSticky();
    spaiedDivs.forEach(spaiedDiv=>{
        let spaiedLink = document.querySelector(`a[href*=${spaiedDiv.id}]`);
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
    return !(rect.bottom < 0 || rect.top >= 0);
}

function toggleSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}