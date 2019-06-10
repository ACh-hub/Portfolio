import 'core-js/stable'
import 'regenerator-runtime/runtime'

import '../scss/styles.scss'

import Sticky from '../js/modules/sticky'
import VanillaScrollspy from 'vanillajs-scrollspy'
import Chart from '../js/modules/chart'

/// /////// Hero art ////////

/// /////// Chart ///////////
const chartContainer = document.querySelector('.chart-container')
const chart = new Chart(chartContainer, 'skillsSvg')
chart.init()

/// /////// Sticky //////////
const stickyHeader = new Sticky()
const scrollspy = new VanillaScrollspy(stickyHeader.element, 4000)
scrollspy.init()

window.onscroll = function (e) {
  let offset = window.pageYOffset
  let distance = stickyHeader.getDistance() - offset

  if ((distance <= 0) && !stickyHeader.stuck) {
    stickyHeader.element.style.position = 'fixed'
    stickyHeader.element.style.top = '0px'
    stickyHeader.stuck = true
  } else if (stickyHeader.stuck && (offset <= stickyHeader.getDistance())) {
    stickyHeader.element.style.position = 'static'
    stickyHeader.stuck = false
  }
}
