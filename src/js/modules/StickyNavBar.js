import $ from "jquery";
import waypoints from "../../../node_modules/waypoints/lib/noframework.waypoints"

export default class StickyNavBar{
    constructor(){
        this.navBar = $(".main-nav");
        this.stopPoint = $("#about")[0];
        this.pageSections = $(".page-section");
        this.navLinks = $(".main-nav__link");
        this.createNavBarWaypoint();
        this.createPageSectionWaypoints();
    }

    createNavBarWaypoint(){
        const that = this;
        new Waypoint({
            element: that.stopPoint,
            handler: direction=>{
                that.navBar.toggleClass('sticky', direction=='down');
            }
        });
    }

    createPageSectionWaypoints(){
        this.pageSections.each((i, element)=>{
            new Waypoint({
                element: element,
                handler: ()=>{
                    let matchingLink = element.getAttribute("data-matching-link");
                    this.navLinks.removeClass("active");
                    $(matchingLink).addClass("active");
                },
                offset: 30
            });
        });
    }


}