function add(n1: number, n2:  number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log(`Result: ${num}`);
}

function printResult2(num: number): undefined {
  console.log(`Result: ${num}`);
  return;
}

let combineValues: (a: number, b: number) => number;
combineValues = add;

let combineValues2: Function;

console.log(combineValues(3, 3));

function sendRequest(data: string, cb: (res: any) => void) {
  return cb({data: 'Hi'});
}

sendRequest('Send this', (res) => {
  console.log(res);
  return true;
})

function f1(): void {
  return undefined;
}