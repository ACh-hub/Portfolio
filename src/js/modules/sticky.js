export default class Sticky {
  constructor () {
    this.element = document.querySelector('.main-nav')
    this.stuck = false
  }

  getDistance () {
    return this.element.offsetTop
  }
}
