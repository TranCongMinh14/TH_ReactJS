const markWeight = 78;
const markHeight = 1.69;
const johnWeight = 92;
const johnHeight = 1.95;

function calculateBMI(weight, height) {
  return weight / (height * height);
}
// Calculate BMIs
const markBMI = calculateBMI(markWeight, markHeight);
const johnBMI = calculateBMI(johnWeight, johnHeight);

if (markBMI > johnBMI) {
  console.log(
    `Mark's BMI (${markBMI.toFixed(
      1
    )}) is higher than John's (${johnBMI.toFixed(1)})!`
  );
} else if (johnBMI > markBMI) {
  console.log(
    `John's BMI (${johnBMI.toFixed(
      1
    )}) is higher than Mark's (${markBMI.toFixed(1)})!`
  );
} else {
  console.log(`Mark and John have the same BMI (${markBMI.toFixed(1)})!`);
}
