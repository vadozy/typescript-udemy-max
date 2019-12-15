type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

interface Admin2 {
  name: string;
  privileges: string[];
}

interface Employee2 {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee2 extends Admin2, Employee2 {}

type Combinable = number | string;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

type AAA = Admin2 & Employee2;

const a: AAA = {
  name: '',
  startDate: new Date(),
  privileges: [],
};

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(emp.name);
  if ('startDate' in emp) {
    console.log(emp.startDate);
  }
}

// // //
// Discriminated union
// // //
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;

  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving with speed: ${speed}`);
}
// // //
// // //

// // //
// Type casting
// // //
const paragraph = document.querySelector('p');

const paragraph2 = document.getElementById(
  'message-output'
) as HTMLParagraphElement; // casting 1

const paragraph3 = <HTMLParagraphElement>(
  document.getElementById('message-output')
); // casting 2: may conflict with React
// // //
// // //

// // //
// Index Properties
// // //
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there';
}
interface ErrorContainer {
  id: string;
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  id: "id_1",
  email: "Not a valid email",
  userName: "Must start with a capital",
}
// // //
// // //

// // //
// Function Overloads
// // //
function add2(a: number, b: number): number
function add2(a: string, b: string): string
function add2(a: Combinable, b: Combinable): Combinable {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
// // //
// // //

// // //
// Conditional chaining
// // //
let o1: any;

console.log(o1?.a?.b); // prints undefined
// // //
// // //

// // //
// Nullish coalescing
// // //
const deepNumber = o1?.a?.b?.c ?? 0;
console.log(deepNumber); // prints 0
// // //
// // //