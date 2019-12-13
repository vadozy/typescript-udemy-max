class Department1 {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department1) {
    console.log(`Department: ${this.name}`);
  }
  
  describe2 = () => {
    console.log(`Department: ${this.name}`);
  }
}

const itDept1 = new Department1('IT');

itDept1.describe();
itDept1.describe2();

const itCopy1 = {name: 'Vadim', describe: itDept1.describe, describe2: itDept1.describe2};
itCopy1.describe();
itCopy1.describe2();

