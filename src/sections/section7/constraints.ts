// Expects two arguments that can be of diferent types. 
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max' }, { age: 30 });
// const mergedObj2 = merge(345, { age: 30 });
const mergedObj3 = merge(['a','2'], { age: 30 });

console.log(mergedObj3);