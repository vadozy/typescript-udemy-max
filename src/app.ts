import _ from 'lodash';

console.log(_.shuffle([1, 2, 3]));

declare var MY_GLOBAL: string;
console.log(MY_GLOBAL);

// lecture 163
import { Product } from './product.model';
const p1 = new Product('A Book', 12.99);
console.log(p1.getInformation());

// manual conversion json to typed objects
const productsFromJson = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
];
const loadedProducts = productsFromJson.map(p => new Product(p.title, p.price));
console.log(loadedProducts);

// using class-transformer
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

const loadedProducts2 = plainToClass(Product, productsFromJson);
console.log(loadedProducts2);

// lecture 164 [ class-validator ]
import { validate } from 'class-validator';
const newProd = new Product('', -3);
console.log(newProd);
console.log(newProd.getInformation());

validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS');
    console.log(errors);
  }
});
