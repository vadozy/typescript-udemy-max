console.log('Your code goes here...!');

class Department {
  constructor(private readonly name: string) {}

  describe(this: Department) {
    console.log(`The Department is: ${this.name}`);
  }
}

const accounting = new Department('Accounting');
accounting.describe();
