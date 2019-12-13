interface Greetable {
  greet(phrase: string): void;
}

interface Named {
  readonly name: string;
  age: number;
}

class Person implements Greetable, Named {

  constructor(public name: string, private _age: number = 0) {
  }

  get age() {
    return this._age;
  }

  greet(s: string) {
    console.log(s);
  }
}

const user1 = {
  name: 'Vadim',
  age: 51,
  greet(s: string) {console.log(`s ${this.name}`)},
}

const p: Greetable & Named = new Person('Vadim', 51);

// p.name = '';