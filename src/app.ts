function Logger_01<T extends new (...args: any[]) => {}>(constructor: T) {
  console.log('Logging...');
  console.log(constructor);
}

function Logger(logString: string) {
  return <T extends new (...args: any[]) => {}>(constructor: T) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  function f<T extends new (...args: any[]) => { name: string }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(...args);
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  }
  return f;
}

// tslint:disable-next-line: max-classes-per-file
@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Vadim';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
const person2 = new Person();
const person3 = new Person();

console.log(person);

// // //
// Another decorator example

// property decorator
function Log(target: any, propertyName: string | symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

// accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target, name, descriptor);
}

// method decorator
function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target, name, descriptor);
}

// parameter decorator
function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target, name, position);
}

// tslint:disable-next-line: max-classes-per-file
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
// Creating an auto-bind decorator

function AutoBind(
  target: any,
  methogName: string,
  propertyDescriptor: PropertyDescriptor
) {
  const originalMethod = propertyDescriptor.value;
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

// tslint:disable-next-line: max-classes-per-file
class Printer {
  message = 'This works!';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// // //
// Creating a validation decorator

interface ValidatorConfig {
  [className: string]: {
    [validatableProp: string]: string[]; // ['required', 'posetive', ...]
  };
}

const registeredValidators: ValidatorConfig = {};

function RequiredValue(target: any, propName: string) {
  addValidationValue(target, propName, 'required');
}

function PositiveNumber(target: any, propName: string) {
  addValidationValue(target, propName, 'positive');
}

function addValidationValue(target: any, propName: string, value: string) {
  const classNameProps = registeredValidators[target.constructor.name] ?? {};
  classNameProps[propName] = classNameProps[propName] ?? [];
  classNameProps[propName].push(value);
  registeredValidators[target.constructor.name] = classNameProps;
}

// function add

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  let isValid = true;
  if (!objValidatorConfig) {
    return isValid;
  }
  for (const prop in objValidatorConfig) {
    if (objValidatorConfig.hasOwnProperty(prop)) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case 'required':
            isValid = isValid && !!obj[prop];
            break;
          case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
  }
  return isValid;
}

// tslint:disable-next-line: max-classes-per-file
class Course {
  @RequiredValue
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, pr: number) {
    this.title = t;
    this.price = pr;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', ev => {
  ev.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input!');
  }
  console.log(createdCourse);
});
