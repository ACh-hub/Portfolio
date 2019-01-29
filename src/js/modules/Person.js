export default class Person{
    constructor(name){
        this.name=name;
    }
    
    greet() {
        console.log(`Hi ${this.name}.`);
    }
}