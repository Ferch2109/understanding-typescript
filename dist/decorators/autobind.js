const Binded = (_, _2, descriptor) => {
    const originalM = descriptor.value;
    const bindedM = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalM.bind(this);
            return boundFn;
        }
    };
    return bindedM;
};
export default Binded;
//# sourceMappingURL=autobind.js.map