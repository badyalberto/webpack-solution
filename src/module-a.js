
//arrow function
const example = () => {
  console.log("hello");
}
example();

//class structure
class Student {
  constructor(name, edad){
    this.name = name;
    this.edad = edad;
  }
}
let student1 = new Student("alberto", 30);
console.log(student1.name);

//template strings
let paragraph = document.createElement('p');
paragraph.textContent = `the name of the student is: ${student1.name}`;
paragraph.className = "font-large";
document.querySelector("#root").append(paragraph);

//let and const
const pi = 3.14;
let car = "bmw";

