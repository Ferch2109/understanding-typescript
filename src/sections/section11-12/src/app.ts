import _ from 'lodash';
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import Product from './product.model';

// Declare tells typescript that the variable will exists
// in case it is declared in other place (like in a script
// on the index file).
declare var GLOBAL: any;
console.log(GLOBAL);
console.log(_.shuffle(['a','b','c']))

const products = [
    { title: 'Book', price: 200 },
    { title: 'Mouse', price: 450 }
];

// const objProducts = products.map(p => new Product(p.title, p.price));

// - plainToClass - helps us to transform each plain obj of the
// array into an object of type Product.
const objProducts = plainToInstance(Product, products);

for (const product of objProducts) {
    console.log(product.getInformation());
}

const prod = new Product('',-1);
validate(prod).then( errors => {
    if (errors.length > 0) {
        console.log('Error' + errors);
    } else {
        console.log(prod.getInformation());
    }
})
// import ProjectList from './components/project-list';
// import ProjectInput from './components/project-input';
// import { ProjectStatus } from './models/project';

// /** INTANCES */
// new ProjectInput();
// new ProjectList(ProjectStatus.ACTIVE);
// new ProjectList(ProjectStatus.FINISHED);