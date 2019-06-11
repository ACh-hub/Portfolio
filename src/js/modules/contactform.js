export default class ContactForm {
  constructor () {
    this.name = document.querySelector('#name')
    this.name.addEventListener('blur', e => this.validateName(e))
  }

  validateName (e) {
    console.log('Blur on name')
  }
}
