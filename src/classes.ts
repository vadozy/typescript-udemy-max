class Department {
  // private name: string;
  private employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department: ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
  }
}

const itDept = new Department('d1', 'IT');

itDept.describe();

// itDept.employees.push('');

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    for (const employee of admins) this.addEmployee(employee);
  }
}