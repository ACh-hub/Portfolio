import $ from "jquery";
import waypoints from "../../../node_modules/waypoints/lib/noframework.waypoints"

export default class StickyNavBar{
    constructor(){
        this.navBar = $(".main-nav");
        this.createNavBarWaypoint();
    }

    createNavBarWaypoint(){
        const that = this;
        new Waypoint({
            element: document.getElementById('about'),
            handler: direction=>{
                that.navBar.toggleClass('sticky', direction=='down');
            }
        });
    }
}