import _ from 'lodash';
import Product from './product.model';
console.log(GLOBAL);
console.log(_.shuffle(['a', 'b', 'c']));
const products = [
    { title: 'Book', price: 200 },
    { title: 'Mouse', price: 450 }
];
const objProducts = products.map(p => new Product(p.title, p.price));
for (const product of objProducts) {
    console.log(product.getInformation());
}
//# sourceMappingURL=app.js.map