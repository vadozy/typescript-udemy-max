interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

type PersonType = {
  name: string;
  age: number;

  greet(phrase: string): void;
};

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet(phrase: string) {
    console.log(`Hello, ${phrase}. Name: ${this.name}, age: ${this.age}`);
  }
}

let user1: IPerson;

user1 = {
  name: 'Vadim',
  age: 51,
  greet(phrase) {
    console.log(phrase);
  },
};

user1.greet('Hi there');

const p1 = new Person('Vadim', 51);

console.log(p1);

type AddFn = (a: number, b: number) => number;

let add: AddFn = (a, b) => a + b;

// Interface as function type
interface AddFn2 {
  (a: number, b: number): number;
  (a: string, b: string): string;
}
