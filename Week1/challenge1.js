const markMass = 78;
const markHeight = 1.75;
const johnMass = 92;
const johnHeight = 1.95;

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(`Mark's BMI: ${markBMI}`);
console.log(`John's BMI: ${johnBMI}`);
console.log(`Does Mark have a higher BMI than John? ${markHigherBMI}`);
