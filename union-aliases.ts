type MyType = number | string;

function combine(input1: MyType, input2: MyType) {
  let result: MyType;

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else if (typeof input1 === 'string' && typeof input2 === 'string') {
    result = input1 + input2;
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Vadim', 'Tatiana');
console.log(combinedNames);

// Literal types
function combine2(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') {
  let result: number | string;
  
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else if (typeof input1 === 'string' && typeof input2 === 'string') {
    result = input1 + input2;
  }
  
  if (resultConversion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }
}


// Literal types 2
function f3(o: {a: 42} | {b: 43}) {
  console.log(f3);
}

console.log(f3({a: 42}));

// Literal types 3
type oo = {b: 43};

function f4(o: {a: 42} | oo) {
  console.log(f4);
}

console.log(f4({b: 43}));
