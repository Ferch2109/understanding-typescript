class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getInformation() {
        return [this.title, `$${this.price}`];
    }
}
export default Product;
//# sourceMappingURL=product.model.js.map