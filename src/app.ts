// Intersection types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Vadim',
  privileges: ['admin'],
  startDate: new Date(),
};

// // //
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// type guards
function addOriginal(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
}

class Car {
  drive() {
    console.log('Driving...');
  }
}

// tslint:disable-next-line: max-classes-per-file
class Truck {
  drive() {
    console.log('Driving a trucks...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
  v.drive();
  if (v instanceof Truck) {
    v.loadCargo(10);
  }
}

useVehicle(v1);
useVehicle(v2);

// // //
// Discriminated Union

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
  let speed;
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

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// // //
// Type casting
const paragraph = document.querySelector('p');
const paragraph2 = document.getElementById(
  'message-output'
) as HTMLParagraphElement;

const userInput = document.getElementById('user-input') as HTMLInputElement;
userInput.value = 'assigned user input';

/* possible, but discouraged, because messes up with JSX
const userInput2 = <HTMLInputElement>document.getElementById('user-input');
userInput2.value = 'assigned user input 2';
*/

// // //
// Index properties
interface ErrorContainer {
  id: string;
  [prop: string]: string;
}

// // //
// Function overloads
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add(1, 5);
const result2 = add('1', '5');
const result3 = add(1, '5');

// // //
// Optional chaining operator
const fetchUserData = {
  id: 'u1',
  name: 'Vadim',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchUserData.job && fetchUserData.job.title);
console.log(fetchUserData?.job?.title);

// // //
// Nullish coalescing
let userInput2;

const storedData = userInput2 ?? 'DEFAULT'; // if null or undefined, set to DEFAULT
