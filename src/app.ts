const names = ['Vadim', 'Igor'];

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve('Done'), 1000);
});

promise.then(data => data.toLowerCase());

// // //
//
function mergeNoGeneric(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const mergedNoGenericObj = mergeNoGeneric({ name: 'Vadim' }, { age: 52 });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Vadim' }, { age: 52 });

// merge(42, 43);

// // //
//
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
  let descr = 'Got no value';
  const n = element.length;
  if (n === 1) {
    descr = 'Got 1 element';
  } else if (n > 1) {
    descr = `Got ${n} elements`;
  }
  return [element, descr];
}

console.log(countAndDescribe('Hi, there'));

// // //
// keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

extractAndConvert({ name: 'Vadim' }, 'name');

// // //
// Generic classes
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Vadim');

// buggy code, removes -1 item from array
const objStorage = new DataStorage<object>();
objStorage.addItem({ name: 'Vadim' });
objStorage.addItem({ name: 'Igor' });
// ...
objStorage.removeItem({ name: 'Vadim' });
console.log(objStorage.getItems());
// end of buggy code

// // //
// Generic utility types [ builtin types ]

// Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  const courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// ReadOnly
type CourseGoalRO = Readonly<CourseGoal>;

const namesRO: Readonly<string[]> = ['Vadim', 'Igor'];
// namesRO[0] = '';
