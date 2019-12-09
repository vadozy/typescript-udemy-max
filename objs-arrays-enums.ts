// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Vadim',
//   age: 50,
// };

enum Role{ADMIN = 5, READ_ONLY, AUTHOR = 200}

const person: {
  name?: string,
  age?: number,
  hobbies: string[],
  someTuple: [number, string], // tuple
  role: Role,
} = {
  name: 'Vadim',
  age: 50,
  hobbies: ['Sports', 'Cooking'],
  someTuple: [2, 'author'],
  role: Role.ADMIN,
};

let favoriteActivities: (string | number)[];

favoriteActivities = ['Sports', 1];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log('The person is ADMIN');
}

console.log(Role[6]);