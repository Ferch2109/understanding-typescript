const Binded = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalM = descriptor.value;
    const bindedM: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(): string {
            const boundFn = originalM.bind(this);
            return boundFn; 
        }
    };

    return bindedM;
};

export default Binded;