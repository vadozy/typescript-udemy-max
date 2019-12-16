function Logger_v1(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(`${logString}...`);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function<T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(args);
      }
    };
  };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Vadim';

  constructor() {
    console.log('Constructor...');
  }
}

const person = new Person();

console.log(person);

// // //
// // //
// // //

function Log(target: any, propertyName: string) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// // //
// Creating an "Autobind" Decorator
// // //
function Autobind(
  _1: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Bind decorator!');
  const originalMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage(event: MouseEvent) {
    console.log(`this.message = ${this.message}`);
    console.log(`event = ${event}`);
  }

  showMessage2 = (event: MouseEvent) => {
    console.log(`this.message = ${this.message}`);
    console.log(`event = ${event}`);
  };
}

const printer = new Printer();
const button = document.getElementById('my-button');
button?.addEventListener('click', printer.showMessage);
// // //
// // //

// // //
// Validation with Decorators
// // //
interface ValidatorConfig {
  [property: string]: { // class name for which we register some validations
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  // too simplistic, overwrites
  const currentValidator = registeredValidators[target.constructor.name];
  registeredValidators[target.constructor.name] = {
    ...currentValidator,
    [propertyName]: ['required']
  };
}

function PositiveNumber(target: any, propertyName: string) {
  // too simplistic, overwrites
  const currentValidator = registeredValidators[target.constructor.name];
  registeredValidators[target.constructor.name] = {
    ...currentValidator,
    [propertyName]: ['positive']
  };
}

function validate(obj: any): boolean {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let valid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          valid = !!obj[prop] && valid;
          break;
        case 'positive':
          valid = obj[prop] > 0 && valid;
          break;
      }
    }
  }
  return valid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', ev => {
  ev.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse))  {
    alert('Invalid input, please try again!');
  }
  console.log(createdCourse);
});
// // //
// // //
