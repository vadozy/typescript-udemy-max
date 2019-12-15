// const names: Array<number> = []; // number[]

// names.push(42);

// const promise1: Promise<number> = new Promise((resolve, reject) => resolve(42));

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Done!');
//   }, 2000);

//   setTimeout(() => {
//     reject(404);
//   }, 1000);
// });

// promise1.then(num => console.log(num / 2));

// Creating a generic function
function merge1(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

console.log(merge1({ name: 'Vadim' }, { age: 51 }));

const mergedObj1a = merge1({ name: 'Vadim' }, { age: 51 });
const mergedObj1b = merge1({ name: 'Vadim' }, { age: 51 }) as {
  name: string;
  age: number;
};

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Vadim' }, { age: 51 });

// Constraints
// const mergedObj2 = merge({name: 'Vadim'}, 50);
// console.log(mergedObj2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let desc = 'Got no value.';
  if (element.length === 1) {
    desc = `Got 1 element.`;
  } else if (element.length > 1) {
    desc = `Got ${element.length} elements.`;
  }
  return [element, desc];
}

// The keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Vadim' }, 'name');

// // //
// Generic classes
// // //
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    const ind = this.data.indexOf(item);
    if (ind >= 0) {
      this.data.splice(ind, 1);
    }
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Vadim');

// problem
const objStorage = new DataStorage<object>();
objStorage.addItem({name: 'Vadim'});
objStorage.addItem({name: 'Paul'});
objStorage.removeItem({name: 'Paul'});
console.log(objStorage.getItems());
// // //
// // //


// // //
// Generic utility types Partial and Readonly
// // //
interface CourseGoal {
  title: string;
  description: string;
  completeBy: Date;
}

function createCourseGoal1(title: string, description: string, date: Date): CourseGoal {
  return {title, description, completeBy: date};
}


function createCourseGoal2(title: string, description: string, date: Date): CourseGoal {
  // let courseGoal = {} as CourseGoal;
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeBy = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();


// // //
// // //