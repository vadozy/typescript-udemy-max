let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') userName = userInput;

function generateError(message: string, code: number): never {
  throw {message, errorCode: code};
}

function daemon(): never {
  while(true) {
    
  }
}

generateError('An erroe occurred!', 500);