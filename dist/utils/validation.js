export const validate = (validatableInput) => {
    let isValid = true;
    const stringVal = validatableInput.value.toString().trim();
    if (validatableInput.required) {
        isValid = isValid && stringVal.length > 0;
    }
    if (typeof validatableInput.value === 'string') {
        if (validatableInput.minLength !== null) {
            isValid = isValid && stringVal.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength !== null) {
            isValid = isValid && stringVal.length <= validatableInput.maxLength;
        }
    }
    if (typeof validatableInput.value === 'number') {
        if (validatableInput.min !== null) {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max !== null) {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
    }
    return isValid;
};
//# sourceMappingURL=validation.js.map