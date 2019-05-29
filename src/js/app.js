import "core-js/stable";
import "regenerator-runtime/runtime";

import "../scss/styles.scss";

import Sticky from "../js/modules/sticky";

"use strict";

const stickyHeader = new Sticky();

window.onscroll = function (e) {
    let offset = window.pageYOffset;
    let distance = stickyHeader.getDistance() - offset;

    if ((distance <= 0) && !stickyHeader.stuck) {
        stickyHeader.element.style.position = 'fixed';
        stickyHeader.element.style.top = '0px';
        stickyHeader.stuck = true;
    } else if (stickyHeader.stuck && (offset <= stickyHeader.getDistance())) {
        stickyHeader.element.style.position = 'static';
        stickyHeader.stuck = false;
    }

}