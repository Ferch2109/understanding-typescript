import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

class Product {
    @IsNotEmpty()
    private title: string;
    @IsNumber()
    @IsPositive()
    private price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }

    getInformation() {
        return [this.title, `$${this.price}`]
    }
}

export default Product;